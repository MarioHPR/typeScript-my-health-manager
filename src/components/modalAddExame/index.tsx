import { useEffect, useState, useCallback, ChangeEvent, useMemo} from 'react';
import { Modal, Row, Form, Button, Col, Space, Select } from 'antd';
import { MinusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { WarningOutlined } from '@material-ui/icons';
import { Input, Tooltip } from '@material-ui/core';
import { toast } from 'react-toastify';
import InputBasicoModal from '../inputBasicoModal';
import SelectTipoExameEspecial from '../selectTipoExameEspecial';
import FormularioDadosBasicos from '../formDadosBasicos';
import { criarTipoExame } from '../../controllers/tipoExameApi';
import { DadosExameRequest } from '../../interfaces/Exame';
import { uploadArquivo } from '../../controllers/arquivoApi';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { buscarInstituicoes } from '../../controllers/instituicaoApi';
import { DadosTipoExameResponse } from '../../interfaces/TipoExame';
import { Option } from 'antd/lib/mentions';

interface Iprops {
  visibleAdd: boolean;
  setVisibleAdd: Function;
  setAtualizaTela: Function;
  atualizaTela: number;
}

interface NovoCampo {
  id: number;
  campo: string;
  valor: string;
}

export default function ModalAddExame({visibleAdd, setVisibleAdd, setAtualizaTela, atualizaTela }:Iprops) {
  const [form] = Form.useForm();
  const [ flg, setFlg ] = useState(false);
  const [ itensExame, setItensExame ] = useState<DadosTipoExameResponse[]>([]);
  const [ itensDoExame, setItensDoExame ] = useState<NovoCampo[]>([]);
  const [ nomeExame, setNomeExame ] = useState<string>('');
  const [ doc, setDoc ] = useState<FileList| null>(null);
  const [ instituicao, setInstituicao ] = useState<InstituicaoResponse>();
  const [ instituicoes, setInstituicoes ] = useState<InstituicaoResponse[]>([]);
  const [ nomeCampoContatoUm ] = useState<string>("contatoUmInstituicao");
  const [ nomeCampoContatoDois ] = useState<string>("contatoDoisInstituicao");

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[]);

  const notifySuccess = useCallback((texto:string) => {
    toast.success(texto);
  },[]);

  const executaAcao = ( aux: any ) => {
    if( parseInt(aux) === 0 ){
      setFlg(!flg);
    } else {
      let auxInstituicao = instituicoes.find( inst => inst.id === parseInt(aux) );
      setInstituicao(auxInstituicao);
    } 
  }

  const onReset = useCallback(() => {
    form.resetFields();
  },[form]);

  const file = useMemo(() => {
    if (!doc?.length) return null;
    return doc[0];
  }, [doc]);

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    setDoc(files);
  };

  const getInstituicoes = useCallback(async () => {
    try{
      const response = await buscarInstituicoes();
      setInstituicoes(response);
    } catch(error) {
      notifyError("Erro ao carregar as instituições cadastradas!");
    }
  }, [setInstituicoes, notifyError]);

  const cadastrarExame = useCallback(async (valores) => {
    try{
      await criarTipoExame(valores);
      let aux = atualizaTela + 1;
      setAtualizaTela(aux);
      setVisibleAdd(false);
      flg && setFlg(!flg);
      onReset();
      notifySuccess("Exame cadastro com sucesso!");
    } catch(error){
      notifyError("Dados inválidos para cadastro!");
    }
  },[atualizaTela, setAtualizaTela, setVisibleAdd, flg, onReset, notifySuccess, notifyError]);

  const uploadDoc = useCallback(async (request: DadosExameRequest) => {
    try{
      const resp = await uploadArquivo(file);
      request.idArquivo = resp;
      cadastrarExame(request)
    } catch(error){
      notifyError("Erro ao salvar documento!");
    }
  }, [cadastrarExame, file, notifyError]);

  const onFinish = (values: any) => {
    console.log("exame ",itensDoExame)
    console.log("veio isso ", values)
    // values.tipoExame = nomeExame;
    // values.parametros = itensDoExame ? itensDoExame : [];
    // const auth = localStorage.getItem("token-gerenciador-security");
    // if(values.numero && values.numero.includes('_')){
    //   values.numero = values.numero.replaceAll("_", "");
    // }
    // const arquivoApi = new ArquivoApi();
    // doc ? arquivoApi.uploadArquivo(doc, auth).then( resp =>{
    //   if(resp.status === 200){
    //     setDoc(resp.data);
    //     values.idArquivo = resp.data;
    //     cadastrarExame(values, auth);
    //   }
    // }) : cadastrarExame(values, auth);
    
    // itensDoExame.map( i => i.valor = '');
    // removeOuAtualiza(null);
  }

  const adicionar = () => {
    let arrayAux:any = itensDoExame !== undefined ? itensDoExame : []; 
    let campoNovo = { id: 0, campo: '', valor: ''};
    let aux = atualizaTela + 1;
    setAtualizaTela(aux);
    arrayAux.push(campoNovo);
    setItensDoExame(arrayAux);
  };

  const removeOuAtualiza = useCallback((campo, valor) => {
    const arrayAux:NovoCampo[] = itensDoExame.filter( item => (item.campo !== campo || item.valor !== valor) );
    setItensDoExame(arrayAux);
  },[itensDoExame]);

  useEffect(() => {
    onReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[visibleAdd]);

  useEffect(()=>{
    getInstituicoes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela, visibleAdd]);

  return (
    <> 
      <Modal title="Insira os dados referente ao exame" visible={visibleAdd} onOk={() => {setVisibleAdd(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleAdd(false); onReset(); flg && setFlg(!flg)}}
        className='container-modal-editar' okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}>
          <>
            <Form form={ form } name="validate_other" onFinish={onFinish} >
              <div className="dados-instituicao">
                <div className='espacamento-top separador-elemento' >
                  <div className='div-comum-esquerda'>
                    <SelectTipoExameEspecial atualizaTela={atualizaTela} itensExame={itensExame} setItensDoExame={setItensDoExame} setItensExame={setItensExame} setNomeExame={setNomeExame} />
                  </div>
                  <div className='div-comum-direita'>
                    <InputBasicoModal tipo='date' span={24} label='Data do exame' name={'dataExame'} />
                  </div>
                </div>
                <select className='select-instituicoes' disabled={flg} onChange={evt => executaAcao(evt.target.value)}>
                  <option key={`odefault${1}`} value={0}>+ adicionar nova instituição</option>
                  {
                    instituicoes.map( inst => <option key={`op${inst.id}`} value={inst.id}>{inst.nome}</option>)
                  }
                </select>
                <div id="" className={!flg ? 'mostrar-form' : 'esconder-form'}>
                  <h3>Dados da Instituição</h3>
                  { instituicao &&
                    <Row>
                      <Col span={12} className='dados-parte-um'>
                        <p>Instituição: {instituicao.nome}</p>
                        <p>Contato 1: {instituicao.contatoDTO.contatoUm}</p>
                      </Col>
                      <Col span={12} className='dados-parte-dois'>
                        <p>Cidade: {instituicao.enderecoDTO.cidade}</p>
                        <p>Contato 2: {instituicao.contatoDTO.contatoDois}</p>
                      </Col>
                    </Row>
                  }
                </div>  
                <div id="form-basic" className={flg ? 'mostrar-form' : 'esconder-form'}>
                  <FormularioDadosBasicos flg={flg} setFlg={setFlg} contatoUm={nomeCampoContatoUm} contatoDois={nomeCampoContatoDois}/>
                </div>
                <h3>Dados do exame</h3>
              { itensDoExame !== undefined ?
                <Row>
                  <Col span={24} className='dados-parte-um'>
                  <Form.List name="parametros">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(field => (
                          <Space key={field.key} align="baseline">
                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  name={[field.name, 'campo']}
                                  fieldKey={[field.fieldKey, 'campo']}
                                  rules={[{ required: false, message: '' }]}
                                >
                                  <Input placeholder="Atributo"/>
                                </Form.Item>
                              )}
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, 'valor']}
                              fieldKey={[field.fieldKey, 'valor']}
                              rules={[{ required: false, message: '' }]}
                            >
                              <Input placeholder="Atributo"/>
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block >
                          + Adicionar mais campos
                          </Button>
                        </Form.Item>
                      </>
                    )}
                    </Form.List>
                  {/* {
                    itensDoExame.length > 0 && itensDoExame.map( exame => (
                      exame.id !== undefined &&
                      <div className='div-cedula-campo' itemID={`linha${exame.campo}`}>
                        <Tooltip className='tooltip' title={`Atributo ${exame.campo}`}>
                          <InfoCircleOutlined className='icon'/>
                        </Tooltip>
                        { exame.id !== 0 ?
                          <input className='input-modal' placeholder="Campo atributo" value={exame.campo} readOnly/> :
                          <input className='input-modal' placeholder="Campo atributo" onChange={evt => exame.campo = evt.target.value} />
                        }
                      </div>
                    ) )
                  } */}
                  </Col>
                  {/* <Col span={12} className='dados-parte-dois'>
                  {
                    itensDoExame.length > 0 && itensDoExame.map( exame => (
                      exame.id !== undefined &&
                      <div className='div-cedula-campo' itemID={`linha${exame.campo}`}>
                        <Tooltip className='tooltip' title={`Digite o Valor referente ao atributo ${exame.campo}!`}>
                          <InfoCircleOutlined className='icon'/>
                        </Tooltip>
                        <input className='input-modal' placeholder="Valor atributo" onChange={evt => exame.valor = evt.target.value} />
                        <Tooltip className='tooltip' title={`Remover valor e atributo ${exame.campo}!`}>                               
                          <MinusCircleOutlined  className='icon icon-remover' onClick={()=>removeOuAtualiza(exame.campo, exame.valor)}/>
                        </Tooltip>
                        </div>
                      ) )
                    }
                    </Col> */}
                </Row>
                : <span><WarningOutlined />Não há dados registrados neste exame!</span>
              }
              {/* <Button type="dashed" onClick={() => adicionar()} block >
                + Adicionar mais campos
              </Button> */}
              <input type='file' onChange={handleInputFileChange} />
              <Row>
                <Col xs={{span:24}} md={{span:12}}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                      <span className='color-white'>Adicionar</span>
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={{span:24}} md={{span:12}}>
                  <Form.Item>
                    <Button htmlType="button" onClick={ onReset } className='botao-form-itens tamanho-total'>
                      Limpar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </>
      </Modal>
    </>
  );
};