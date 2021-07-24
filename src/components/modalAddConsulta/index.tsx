import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import { toast } from 'react-toastify';
import FormularioDadosBasicos from '../formDadosBasicos';
// import ConsultaApi from '../../models/consultaApi';
// import InstituicaoApi from '../../models/instituicaoApi';
// import ArquivoApi from '../../models/arquivoApi';
import './style.css';
import TextArea from 'antd/lib/input/TextArea';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { buscarInstituicoes } from '../../controllers/instituicaoApi';
import { uploadArquivo } from '../../controllers/arquivoApi';
import { criarConsulta } from '../../controllers/consultaApi';
import { ConsultaRequest } from '../../interfaces/Consulta';

interface Iprops {
  visibleAdd: boolean;
  setVisibleAdd: Function;
  setAtualizaTela: Function;
  atualizaTela: number;
}

export default function ModalAddConsulta({visibleAdd, setVisibleAdd, setAtualizaTela, atualizaTela}:Iprops) {
  const [form] = Form.useForm();
  const [ flg, setFlg ] = useState(false);
  const [ dataConsulta, setDataConsulta ] = useState<string>('');
  const [ instituicao, setInstituicao ] = useState<InstituicaoResponse>();
  const [ instituicoes, setInstituicoes ] = useState<InstituicaoResponse[]>([]);
  const [ doc, setDoc ] = useState<any| null>(0);

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const notifySuccess = useCallback((texto:string) => {
    toast.success(texto);
  },[])

  const getInstituicoes = useCallback(async () => {
    try{
      const response = await buscarInstituicoes();
      setInstituicoes(response);
    } catch(error) {
      notifyError("Erro ao carregar as instituições cadastradas!");
    }
  }, [setInstituicoes, notifyError]);

  const onReset = useCallback(() => {
    form.resetFields()
  },[form]);

  const cadastrarConsulta = useCallback(async (valores) => {
    try{
      await criarConsulta( valores );
      let aux = atualizaTela + 1;
      setAtualizaTela(aux);
      setVisibleAdd(false)
      flg && setFlg(!flg);
      onReset();
      notifySuccess('Consulta adicionada com sucesso!');
    } catch(error) {
      notifyError('Erro ao cadastrar consulta!');
    }
  }, [atualizaTela, setAtualizaTela, setVisibleAdd, flg, setFlg, onReset, notifySuccess, notifyError]);

  const uploadDoc = useCallback(async (request: ConsultaRequest) => {
    try{
      const resp = await uploadArquivo(doc);
      setDoc(resp);
      request.idArquivo = resp;
      cadastrarConsulta(request)
    } catch(error){

    }
  }, [doc, cadastrarConsulta]);

  const onFinish = (values: any) => {
    // const { bairro, cep, cidade, rua, contatoDois, contatoUm, nomeinstituicao } = values;
    // const { diagnostico, prescricaoMedica, nomeMedico } = values;
    // if(values.numero && values.numero.includes('_')){
    //   values.numero = values.numero.replaceAll("_", "");
    // }
    // const { numero } = values;
    // const request: ConsultaRequest = {
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
    //       "id": 0,
    //       "numero": numero !== undefined ? numero : 0,
    //       "rua": rua || ''
    //     },
    //     "id": (bairro && flg) ? 0 : instituicao.id || 0,
    //     "nome": nomeinstituicao || ''
    //   },
    //   "dataConsulta": dataConsulta || '',
    //   "diagnostico": diagnostico || '',
    //   "prescricao": prescricaoMedica || '',
    //   "nomeMedico": nomeMedico || '',
    //   "idArquivo": doc ? doc : 0
    // };

    // doc ? (
    //   uploadDoc(request)
    //  ) : cadastrarConsulta(request);
    
  }

  const executaAcao = ( aux: any ) => {
    if( parseInt(aux) === 0 ){
      setFlg(!flg);
    } else {
      let auxInstituicao = instituicoes.find( inst => inst.id === parseInt(aux) );
      setInstituicao(auxInstituicao);
    } 
  }

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    setDoc(files);
  };

  useEffect(()=>{
    getInstituicoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela] );
  
  return (
    <> 
      <Modal title="Adicionar dados da consulta" visible={visibleAdd} onOk={() => {setVisibleAdd(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleAdd(false);onReset(); flg && setFlg(!flg)}} className='container-modal-editar' okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }} >
          <>{ instituicoes && 
            <Form form={ form } name="validate_other" onFinish={onFinish}  >
              <>
                <div className="dados-instituicao">
                  <div className='espacamento-top separador-elemento' >
                    <div className='div-comum-esquerda'>
                      <Form.Item name='nomeMedico' label='Médico:'
                        rules={ [ { required: true, message: `Diagnóstico é Obrigatório!` } ] }
                      >
                        <input className='input-modal margin-bottom ajuste-input-responsivo' type='text' value={"Nome medico"} />
                      </Form.Item>
                    </div>
                    <div className='div-comum-direita'>
                      <Form.Item name='dataConsulta' label='Data Consulta:'
                        rules={ [ { required: true, message: `Data da consulta é Obrigatório!` } ] }
                      >
                        {
                          <input className='input-modal margin-bottom ajuste-input-responsivo' type='date' value={'dataExame'} onChange={ evt => setDataConsulta(evt.target.value)}/>
                        }
                      </Form.Item>
                    </div>
                  </div>
                  <select className='select-instituicoes' disabled={flg} onChange={evt => executaAcao(evt.target.value)}>
                    <option value=""disabled selected>Selecione uma instituição!</option>
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
                
                  <div id="" className={flg ? 'mostrar-form' : 'esconder-form'}>
                    <FormularioDadosBasicos flg={flg} setFlg={setFlg} />
                  </div>
                  
                  <Form.Item name='diagnostico' label='Diagnóstico:'
                    rules={ [ { required: true, message: `Diagnóstico é Obrigatório!` } ] }
                  >
                    <input className='input-modal align-center'/>
                  </Form.Item>
                  <Form.Item name='prescricaoMedica' label='Prescrição médica:'
                    rules={ [ { required: true, message: `Prescrição médica: Obrigatório!` } ] }
                  >
                    <TextArea rows={5} />
                  </Form.Item>

                  {/* <input type='file' onChange={evt => setDoc(evt.target.files[0] !== null)} /> */}
                  <input type='file' onChange={handleInputFileChange} />
                  <>
                    <Row>
                      <Col xs={{span:24}} md={{span:12}}>
                        <Form.Item>
                          <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                            <span className='color-white'>Adicionar Consulta</span>
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col xs={{span:24}} md={{span:12}}>
                        <Form.Item >
                          <Button htmlType="button" onClick={ onReset } className='botao-form-itens tamanho-total'>
                            Limpar
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                 </div>
              </>
            </Form>
          }</> 
      </Modal>
    </>
  );
};