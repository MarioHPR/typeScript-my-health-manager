import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import FormularioDadosBasicos from '../formDadosBasicos';
import { downloadArquivo, uploadArquivo } from '../../controllers/arquivoApi';
import { buscarConsultaPorId, editarConsulta } from '../../controllers/consultaApi';
import { buscarInstituicoes } from '../../controllers/instituicaoApi';
import { ConsultaRequest, ConsultaResponse } from '../../interfaces/Consulta';
import TextArea from 'antd/lib/input/TextArea';
import './style.css';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

interface Iprops {
  visibleEdit: boolean;
  setVisibleEdit: Function;
  setAtualizaTela: Function;
  atualizaTela:number;
  idConsulta: number;
  flgEdit: number;
}

export default function ModalVisualizarEditarConsulta({visibleEdit, setVisibleEdit, setAtualizaTela, atualizaTela, idConsulta, flgEdit}:Iprops) {
  const [form] = Form.useForm();
  const [ flg, setFlg ] = useState<boolean>(false);
  const [ consulta, setConsulta ] = useState<ConsultaResponse>();
  const [ instituicao, setInstituicao ] = useState<InstituicaoResponse>();
  const [ instituicoes, setInstituicoes ] = useState<InstituicaoResponse[]>([]);
  const [ atualizaInterna, setAtualizaInterna ] = useState<number>(0);
  const [ doc, setDoc ] = useState<FileList | null>();

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const notifySucess = useCallback((texto:string) => {
      toast.success(texto);
  },[])

  const onReset = useCallback(() => {
    form.resetFields();
  },[form]);

  const getInstituicoes = useCallback(async () => {
    try{
      const response = await buscarInstituicoes();
      setInstituicoes(response);
    } catch(error) {
      notifyError("Erro ao listar instituições cadastradas!");
    }
  }, [notifyError]);

  const getConsulta = useCallback(async () => {
    try{
      const response = await buscarConsultaPorId(idConsulta);
      setConsulta(response);
      setInstituicao(response.dadosInstituicao);
      onReset();
    } catch(error) {
      notifyError("Erro ao carregar a consulta selecionada!")
    }

  }, [idConsulta, notifyError, onReset]);

  const editarConsultaSelecionada = useCallback(async (request: ConsultaRequest) => {
    try{
      await editarConsulta(idConsulta, request);
      let aux = atualizaTela + 1;
      setAtualizaTela(aux);
      setVisibleEdit(false);
      setAtualizaInterna(atualizaInterna + 1);
      flg && setFlg(!flg);
      onReset();
      notifySucess("consulta editada com sucesso!");
    }catch(error){
      notifyError("Erro ao editar consulta!");
    }
  },[idConsulta, atualizaInterna, atualizaTela, flg, onReset, setAtualizaTela, setVisibleEdit, notifySucess, notifyError]);

  const file = useMemo(() => {
    if (!doc?.length) return null;
    return doc[0];
  }, [doc]);

  const uploadDoc = useCallback(async (request: ConsultaRequest) => {
    try{
      const resp = await uploadArquivo(file);
      request.idArquivo = resp;
      editarConsultaSelecionada(request)
    } catch(error){
      notifyError("Erro ao salvar documento!");
    }
  }, [file, editarConsultaSelecionada, notifyError]);

  const downloadArquivoConsulta = useCallback(async (idArquivo) => {
    try{
      await downloadArquivo(idArquivo); 
      notifySucess("Download realizado com sucesso!");
    } catch(error) {
      notifyError("Erro ao realizar o download do arquivo!");
    }
  },[notifySucess, notifyError]);

  const onFinish = (values:any) => {
    values.nomeInstituicao = values.nomeInstituicao !== undefined ? values.nomeInstituicao : instituicao?.nome;
    values.bairro = values.bairro !== undefined ? values.bairro : instituicao?.enderecoDTO.bairro;
    values.cidade = values.cidade !== undefined ? values.cidade : instituicao?.enderecoDTO.cidade;
    values.cep = values.cep !== undefined ? values.cep : instituicao?.enderecoDTO.cep;
    values.rua = values.rua !== undefined ? values.rua : instituicao?.enderecoDTO.rua;
    values.numero = values.numero !== undefined ? ( values.numero.includes('_') ? values.numero.replaceAll("_", "") : values.numero) : instituicao?.enderecoDTO.numero;
    values.contatoUmInstituicao = values.contatoUmInstituicao !== undefined ? values.contatoUmInstituicao : instituicao?.contatoDTO.contatoUm;
    values.contatoDoisInstituicao = values.contatoDoisInstituicao !== undefined ? values.contatoDoisInstituicao : instituicao?.contatoDTO.contatoDois;
    values.idInstituicao = flg ? 0 : instituicao?.id;
    values.dataConsulta = values.dataConsulta !== undefined ? values.dataConsulta : consulta?.dataConsulta;
    values.diagnostico = values.diagnostico !== undefined ? values.diagnostico : consulta?.diagnostico;
    values.nomeMedico = values.nomeMedico !== undefined ? values.nomeMedico : consulta?.nomeMedico;
    values.prescricao = values.prescricao !== undefined ? values.prescricao : consulta?.prescricao;
    values.idArquivo = consulta?.idArquivo !== null ? consulta?.idArquivo : 0;

    (doc !== null && doc !== undefined) ? uploadDoc(values) : editarConsultaSelecionada(values);
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
  },[atualizaTela, idConsulta] );

  useEffect(()=>{
    getConsulta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela, idConsulta, atualizaInterna]);
  
  return (
    <> 
      <Modal title="Dados atuais da consulta" visible={visibleEdit} onOk={() => {setVisibleEdit(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleEdit(false);onReset(); flg && setFlg(!flg)}} className='container-modal-editar' okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: flgEdit === 1 ? true : false }} >
          <>{ consulta && 
            <Form form={ form } name="validate_other" onFinish={onFinish} >
              <>{consulta &&
                <div className="dados-instituicao">
                  <div className='espacamento-top separador-elemento' >
                    <div className='div-comum-esquerda'>
                      <Form.Item name='nomeMedico' label='Médico:'
                        rules={ [ { required: consulta.nomeMedico.length > 0 ? false : true, message: `Diagnóstico é Obrigatório!` } ] }
                      >
                        <input className='input-modal margin-bottom ajuste-input-responsivo' type='text' onChange={evt => consulta.nomeMedico = evt.target.value} defaultValue={consulta.nomeMedico} readOnly={flgEdit === 1 ? false : true}/>
                      </Form.Item> 
                    </div>
                    <div className='div-comum-direita'>
                      <Form.Item name='dataConsulta' label='Data Consulta:'
                        rules={ [ { required: consulta.dataConsulta.length > 0 ? false : true, message: `Data da consulta é Obrigatório!` } ] }
                      >
                        {
                          <input className='input-modal margin-bottom ajuste-input-responsivo' type='date' defaultValue={consulta.dataConsulta} onChange={ evt => consulta.dataConsulta = evt.target.value} readOnly={flgEdit === 1 ? false : true}/>
                        }
                      </Form.Item>
                    </div>
                  </div>
                  { flgEdit === 1 &&
                    <select className='select-instituicoes' placeholder="Selecione uma instituição!" disabled={flg} onChange={evt => executaAcao(evt.target.value)} defaultValue={consulta.dadosInstituicao.id} >
                      <option key={`odefault${1}`} value={0}>+ adicionar nova instituição</option>
                      {
                        instituicoes.map( inst => <option key={`op${inst.id}`} value={inst.id}>{inst.nome}</option>)
                      }
                    </select>
                  }
                  <div id="" className={flgEdit >= 0 ? 'mostrar-form' : 'esconder-form'}>
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
                    <FormularioDadosBasicos flg={flg} setFlg={setFlg} contatoUm="contatoUmInstituicao" contatoDois="contatoDoisInstituicao" />
                  </div>
                  
                  <Form.Item name='diagnostico' label='Diagnóstico:'
                    rules={ [ { required: consulta.diagnostico.length === 0 ? true : false, message: `Diagnóstico é Obrigatório!` } ] }
                  >
                    <input className='input-modal align-center' onChange={evt => consulta.diagnostico = evt.target.value} defaultValue={consulta.diagnostico} readOnly={flgEdit === 1 ? false : true}/>
                  </Form.Item>
                  <Form.Item name='prescricao' label='Prescrição médica:'
                    rules={ [ { required: consulta.prescricao.length === 0 ? true : false, message: `Prescrição médica: Obrigatório!` } ] }
                  >
                    <TextArea rows={5}  onChange={evt => consulta.prescricao = evt.target.value} defaultValue={consulta.prescricao} readOnly={flgEdit === 1 ? false : true} />
                  </Form.Item>
                  <input type='file' hidden={flgEdit === 0} onChange={handleInputFileChange} />
                  {consulta.idArquivo !== 0 && <a href='#/' onClick={()=>downloadArquivoConsulta(consulta.idArquivo)} >Download do arquivo</a>}
                  <>{ flgEdit === 1 &&
                    <Row>
                      <Col xs={{span:24}} md={{span:12}}>
                        <Form.Item>
                          <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                            <span className='color-white'>Editar Consulta</span>
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
                  }</>
                </div>
              }</>
            </Form>
          }</>
      </Modal>
    </>
  );
};