import { useState, useEffect, useCallback, useMemo } from 'react';
import { Modal, Row, Form, Button, Col, notification } from 'antd';
import FormularioDadosBasicos from '../formDadosBasicos';
import './style.css';
import { WarningOutlined } from '@material-ui/icons';
import { MinusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from '@material-ui/core';
import { buscarExamePorId, editarExame } from '../../controllers/exameApi';
import { buscarInstituicoes } from '../../controllers/instituicaoApi';
import { downloadArquivo, uploadArquivo } from '../../controllers/arquivoApi';
import { toast } from 'react-toastify';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { DadosExameResponse } from '../../interfaces/Exame';
import { ItemValorExameRequest } from '../../interfaces/ItemValorExame';

interface Iprops {
  visibleModal: boolean;
  setVisibleModal: Function;
  idExame?: number;
  editarVisualizar: number;
  setAtualizaTela: Function;
  atualizaTela: number;
}

export default function ModalExame({visibleModal, setVisibleModal, idExame, editarVisualizar, setAtualizaTela, atualizaTela}:Iprops) {
  const [form] = Form.useForm();
  const [ flg, setFlg ] = useState(false);
  const [ exame, setExame ] = useState<DadosExameResponse>();
  const [ tipoExame, setTipoExame ] = useState('');
  const [ dataExame, setDataExame ] = useState<string>();
  const [ instituicao, setInstituicao ] = useState<InstituicaoResponse>();
  const [ parametros, setParametros ] = useState<ItemValorExameRequest[]>([]);
  const [ instituicoes, setInstituicoes ] = useState<InstituicaoResponse[]>([]);
  const [ interacao, setInteracao ] = useState(0);
  const [ doc, setDoc ] = useState<FileList| null>(null);
  
  const [ nomeCampoContatoUm ] = useState<string>("contatoUmInstituicao");
  const [ nomeCampoContatoDois ] = useState<string>("contatoDoisInstituicao");

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const notifySucess = useCallback((texto:string) => {
      toast.success(texto);
  },[])

  const onReset = useCallback(() => {form.resetFields()},[form]);

  const getInstituicoes = useCallback(async () => {
    try{
      const response = await buscarInstituicoes();
      setInstituicoes(response);
    } catch(error) {
      notifyError("Erro ao listar instituições cadastradas!");
    }
  }, [notifyError]);

  const handlebuscarExamePorId = useCallback(async (evt:number) => {
    try{
      const response = await buscarExamePorId(evt);
      setExame(response);
      setTipoExame(response.nomeExame);
      setDataExame(response.dataExame);
      setInstituicao(response.dadosInstituicao);
      let filtrado = response.parametros.filter( exame => exame.campo !== '' && exame.campo !== null);
      setParametros(filtrado);    
      onReset();
    } catch(error){
      notifyError("Consulta não encontrada!")
    }
    
  },[notifyError, setExame, setTipoExame, setDataExame, setInstituicao, setParametros, onReset]);


  useEffect(()=>{
    getInstituicoes();
    idExame && handlebuscarExamePorId(idExame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ idExame, atualizaTela ] );

  const adicionar = () => {
    let arrayAux =  parametros;
    let campoNovo = { id: 0, campo: '', valor: '', idItemCampoExame: 0, idItemValorExame: 0};
    setInteracao(interacao + 1);
    arrayAux.push(campoNovo);
    setParametros(arrayAux);
    removeOuAtualiza(null);
  };

  const downloadArquivoConsulta = useCallback(async (idArquivo) => {
    try{
      await downloadArquivo(idArquivo); 
      notifySucess("Download realizado com sucesso!");
    } catch(error) {
      notifyError("Erro ao realizar o download do arquivo!");
    }
  },[notifySucess, notifyError]);

  const removeOuAtualiza = (value:any) => {
    let arrayAux = parametros.filter( exame => exame.campo !== value);
    setParametros(arrayAux)
  };

  const file = useMemo(() => {
    if (!doc?.length) return null;
    return doc[0];
  }, [doc]);

  const handleEditarExame = useCallback(async (idExame: number, request:any) => {
    try{
      await editarExame( idExame, request);
      let aux = atualizaTela + 1;
      setAtualizaTela(aux);
      setVisibleModal(false)
      flg && setFlg(!flg);
      onReset();
      notifySucess("Exame editado com sucesso!");
    } catch(error){
      notifyError("Não foi possível salvar as alterações no exame!")
    }

  }, [atualizaTela, setAtualizaTela, setVisibleModal, flg, onReset, notifySucess, notifyError]);

  const uploadDoc = useCallback(async (idExame: number, request: any) => {
    try{
      const resp = await uploadArquivo(file);
      request.idArquivo = resp;
      handleEditarExame(idExame, request);
    } catch(error){
      notifyError("Erro ao salvar documento!");
    }
  }, [file, notifyError]);

  const onFinish = (values:any) => {
    values.nomeInstituicao = values.nomeInstituicao !== undefined ? values.nomeInstituicao : instituicao?.nome;
    values.bairro = values.bairro !== undefined ? values.bairro : instituicao?.enderecoDTO.bairro;
    values.cidade = values.cidade !== undefined ? values.cidade : instituicao?.enderecoDTO.cidade;
    values.cep = values.cep !== undefined ? values.cep : instituicao?.enderecoDTO.cep;
    values.rua = values.rua !== undefined ? values.rua : instituicao?.enderecoDTO.rua;
    values.numero = values.numero !== undefined ? ( values.numero.includes('_') ? values.numero.replaceAll("_", "") : values.numero) : instituicao?.enderecoDTO.numero;
    values.contatoUmInstituicao = values.contatoUmInstituicao !== undefined ? values.contatoUmInstituicao : instituicao?.contatoDTO.contatoUm;
    values.contatoDoisInstituicao = values.contatoDoisInstituicao !== undefined ? values.contatoDoisInstituicao : instituicao?.contatoDTO.contatoDois;
    values.idInstituicao = instituicao?.id !== undefined && !flg ? instituicao?.id : 0;
    values.idArquivo = 0;
    values.tipoExame = exame?.nomeExame;
    values.dataExame = dataExame;
    values.parametros = parametros;
    
    doc !== null && idExame ? uploadDoc(idExame, values) : idExame && handleEditarExame(idExame, values);
    console.log(values)

    //   const { bairro, cep, cidade, rua, contatoDois, contatoUm, nomeinstituicao } = values;
    //   const auth = localStorage.getItem("token-gerenciador-security");

    //   doc && arquivsoApi.uploadArquivo(doc, auth).then( resp =>{
    //     if(resp.status === 200){
    //       setDoc(resp.data);
    //     }
    //   });

    //   if(values.numero && values.numero.includes('_')){
    //     values.numero = values.numero.replaceAll("_", "");
    //   }

    //   const request = {
    //   "dadosInstituicao": {
    //     "contatoDTO": {
    //       "contatoDois": contatoDois || '',
    //       "contatoUm": contatoUm || '',
    //       "id": 0
    //     },
    //     "enderecoDTO": {
    //       "bairro": bairro || '',
    //       "cep": cep || '',
    //       "cidade": cidade || '',
    //       "email": '',
    //       "emeail": '',
    //       "id": 0,
    //       "numero": values.numero || 0,
    //       "rua": rua || ''
    //     },
    //     "id": (bairro && flg) ? 0 : instituicao.id || 0,
    //     "nome": nomeinstituicao || ''
    //   },
    //   "dataExame": dataExame || '',
    //   "idArquivo": doc || 0,
    //   "parametros": parametros,
    //   "tipoExame": tipoExame || ''
    // };
    
    // examseApi.editarExame( idExame, request, auth).then( resp => { 
    //     if(resp.status === 200){
    //       let aux = atualizaTela + 1;
    //       setAtualizaTela(aux);
    //       setVisibleModal(false)
    //       flg && setFlg(!flg);
    //       onReset();
    //       openNotificationWithIcon("success", 'Edição', 'Exame editado com sucesso!');
    //     } } );
  }

  const executaAcao = ( aux:any ) => {
    if( parseInt(aux) === 0 ){
      setFlg(!flg);
    } else {
      let auxInstituicao = instituicoes.find( inst => inst.id === parseInt(aux) );
      setInstituicao(auxInstituicao);
    } 
  }
  
  
  return (
    <> 
      <Modal title="Visualização dos dados do exame" visible={visibleModal} onOk={() => {setVisibleModal(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleModal(false);onReset(); flg && setFlg(!flg)}} className='container-modal-editar'
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}>
          <>{ exame && 
            <Form form={ form } name="validate_other" onFinish={onFinish} >
              <div className="dados-instituicao">
                <div className='espacamento-top separador-elemento' >
                  <div className='div-comum-esquerda'>
                    <label>Exame: </label>
                    <input className='input-modal margin-bottom' type='text' value={tipoExame} readOnly />
                  </div>
                  <div className='div-comum-direita'>
                    <label>Data: </label>
                    {
                      editarVisualizar === 1 ? <input className='input-modal margin-bottom' type='date' value={dataExame} onChange={ evt => setDataExame(evt.target.value)}/> 
                      : <input className='input-modal margin-bottom' type='date' value={dataExame} readOnly/>
                    }
                  </div>
                </div>
              </div>
              {
                instituicao && editarVisualizar === 1 ?
                  <>
                    <div className="dados-instituicao">
                      <select className='select-instituicoes' disabled={flg} onChange={evt => executaAcao(evt.target.value)}>
                        <option key={`odefault${1}`} value={0}>+ adicionar nova instituição</option>
                        {
                          instituicoes.length > 0 && instituicoes.map( inst => {
                            return inst.nome === instituicao.nome ? <option key={`op${inst.id}`} selected value={inst.id}>{inst.nome}</option> : <option key={`op${inst.id}`} value={inst.id}>{inst.nome}</option>
                          })
                        }
                      </select>
                      <div id="" className={!flg ? 'mostrar-form' : 'esconder-form'}>
                        <h3>Dados da Instituição</h3>
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
                      </div>
                    
                      <div id="" className={flg ? 'mostrar-form' : 'esconder-form'}>
                        <FormularioDadosBasicos flg={flg} setFlg={setFlg}  contatoUm={nomeCampoContatoUm} contatoDois={nomeCampoContatoDois}/>
                      </div>
                      <h3>Dados do exame</h3>
                      { parametros.length > 0 ?
                        <Row>
                          <Col span={12} className='dados-parte-um'>
                          {
                            parametros.map( exame => (
                              <div className='div-cedula-campo'>
                                <Tooltip className='tooltip' title={`Atributo ${exame.campo}`}>
                                  <InfoCircleOutlined className='icon' />
                                </Tooltip>
                                { exame.id !== 0 ?
                                  <input className='input-modal' placeholder="Campo atributo" value={exame.campo} readOnly/> :
                                  <input className='input-modal' placeholder="Campo atributo" onChange={evt => {exame.campo = evt.target.value;removeOuAtualiza(null)}} value={exame.campo} />
                                }
                                </div>
                            ) )
                          }
                          </Col>
                          <Col span={12} className='dados-parte-dois'>
                          {
                            parametros.map( exame => (
                              <div className='div-cedula-campo' itemID={`linha${exame.campo}`}>
                                <Tooltip className='tooltip' title={`Digite o Valor referente ao atributo ${exame.campo}!`}>
                                  <InfoCircleOutlined className='icon'/>
                                </Tooltip>
                                <input className='input-modal' placeholder="Valor atributo" onChange={evt => {exame.valor = evt.target.value;removeOuAtualiza(null)}} value={exame.valor} />
                                <Tooltip className='tooltip' title={`Remover valor e atributo ${exame.campo}!`}>                               
                                  <MinusCircleOutlined  className='icon icon-remover' onClick={()=>removeOuAtualiza(exame.campo)}/>
                                </Tooltip>
                              </div>
                            ) )
                          }
                          </Col>
                        </Row>
                        : <span><WarningOutlined />Não há dados registrados neste exame!</span>
                        
                      }
                      <Button type="dashed" onClick={() => adicionar()} block >
                       + Adicionar mais campos
                      </Button>
                      <input type='file' onChange={evt => setDoc(evt.target.files)} />
                      <Row>
                        <Col xs={{span:24}} md={{span:12}}>
                          <Form.Item wrapperCol={{ span: 24 }}>
                            <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                            <span className='color-white'>Inserir Tipo Exame</span>
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
                  </>
                :
                  <div className="dados-instituicao">
                    <h3>Dados da Instituição</h3>
                    <Row>
                      <Col span={12} className='dados-parte-um'>
                        <p>Instituição: {exame.dadosInstituicao.nome}</p>
                        <p>Contato 1: {exame.dadosInstituicao.contatoDTO.contatoUm}</p>
                      </Col>
                      <Col span={12} className='dados-parte-dois'>
                        <p>Cidade: {exame.dadosInstituicao.enderecoDTO.cidade}</p>
                        <p>Contato 2: {exame.dadosInstituicao.contatoDTO.contatoDois}</p>
                      </Col>
                    </Row>
                    <h3>Dados do exame</h3>
                    { parametros.length > 0 ?
                      <Row>
                        <Col span={12} className='dados-parte-um'>
                        {
                          parametros.map( exame => exame.campo !== '' ? <p>Campo: {exame.campo}</p> : '')
                        }
                        </Col>
                        <Col span={12} className='dados-parte-dois'>
                        {
                          parametros.map( exame => exame.valor !== '' ? <p>Valor: {exame.valor}</p> : '')
                        }
                        </Col>
                      </Row>
                      : <span><WarningOutlined />Não há dados registrados neste exame!</span>
                    }
                    {exame.idArquivo !== 0 && <a href='#/' onClick={()=>downloadArquivoConsulta(exame.idArquivo)} >Download do arquivo</a>}
                  </div>
              }
            </Form>
          }</>
      </Modal>
    </>
  );
};