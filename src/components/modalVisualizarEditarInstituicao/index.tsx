import { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Divider, Col, Row, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import './style.css';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { buscarInstituicaoPorId, editarInstituicao } from '../../controllers/instituicaoApi';

interface Iprops{
  visibleEdit:boolean;
  setVisibleEdit:Function;
  atualizaTela:number;
  setAtualizaTela:Function;
  idInstituicao?:number;
  flgEdit:number;
}

export default function ModalVisualizarEditarInstituicao({visibleEdit, setVisibleEdit, setAtualizaTela, atualizaTela, idInstituicao, flgEdit}:Iprops) {
  const [form] = Form.useForm();
  const [ flg, setFlg ] = useState(false);
  const [ instituicao, setInstituicao ] = useState<InstituicaoResponse | null>();
  const [ atualizaInterna, setAtualizaInterna ] = useState(0);

  const notifyError = useCallback((texto:string) => {
    toast.error((`Erro ao ${texto}!`));
  },[])

  const notifySucess = useCallback((texto:string) => {
      toast.success((`${texto} com sucesso!`));
  },[])

  const getInstituicao = useCallback(async () => {
    try{
      const response =idInstituicao && await buscarInstituicaoPorId(idInstituicao);
      response && setInstituicao(response);
    } catch(error){
      notifyError("buscar instituição não encontrada!");
    }
  },[idInstituicao, notifyError, setInstituicao]);

  const onReset = useCallback(() => {
    form.resetFields();
    setInstituicao(null);
  },[form]);

  const onFinish = useCallback(async () => {
    try{
      idInstituicao && instituicao && await editarInstituicao(idInstituicao, instituicao);
      let aux = atualizaTela + 1;
      setAtualizaTela(aux);
      setVisibleEdit(false);
      setAtualizaInterna(atualizaInterna + 1);
      flg && setFlg(!flg);
      onReset();
      notifySucess('Instituição editada com sucesso!');
    } catch(error){
      notifyError("editar instituição!");
    }
  }, [idInstituicao, onReset, instituicao, notifySucess, notifyError, atualizaInterna, atualizaTela, flg, setAtualizaTela, setVisibleEdit]);

  useEffect(()=>{
    getInstituicao();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idInstituicao, flgEdit] );
  
  return (
    <> { instituicao &&
      <Modal title={flgEdit === 1 ? "Dados atuais para edição da instituição" : "Visualização dos dados atuais da instituição"} visible={visibleEdit} onOk={() => {setVisibleEdit(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleEdit(false);onReset(); flg && setFlg(!flg)}} className='container-modal-editar' okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: flgEdit === 1 ? true : false }} >
          <>{ instituicao && 
            <Form form={ form } name="validate_other" onFinish={onFinish} >
            <div className="dados-instituicao">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="nome" label="Nome"
                    rules={ [ { required: instituicao.nome.length > 0 ? false : true, message: `Nome da instituição é obrigatório!` } ] }
                  >
                    <Input placeholder="Nome instituição" defaultValue={instituicao.nome} onChange={vt => instituicao.nome = vt.target.value} readOnly={flgEdit === 1 ? false : true}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="cidade" label="Cidade"
                    rules={ [ { required: instituicao.enderecoDTO.cidade.length > 0 ? false : true, message: `Cidade é obrigatório!` } ] }
                  >
                    <Input placeholder="Cidade" defaultValue={instituicao.enderecoDTO.cidade} onChange={vt => instituicao.enderecoDTO.cidade = vt.target.value} readOnly={flgEdit === 1 ? false : true}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="cep" label="Cep"
                    rules={ [ { required: instituicao.enderecoDTO.cep.length > 0 ? false : true, message: `Cep é obrigatório!` } ] }
                  >     
                    <InputMask className="input-com-mascara" mask="99999-999"
                              type='text' placeholder="Insira Cep" defaultValue={instituicao.enderecoDTO.cep}
                              onChange={vt => instituicao.enderecoDTO.cep = vt.target.value} readOnly={flgEdit === 1 ? false : true}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="bairro" label="Bairro"
                    rules={ [ { required: instituicao.enderecoDTO.bairro.length > 0 ? false : true, message: `Bairro é obrigatório!` } ] }
                  >     
                    <Input placeholder="Bairro" defaultValue={instituicao.enderecoDTO.bairro} onChange={vt => instituicao.enderecoDTO.bairro = vt.target.value} readOnly={flgEdit === 1 ? false : true}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="rua" label="Rua"
                    rules={ [ { required: instituicao.enderecoDTO.rua.length > 0 ? false : true, message: `Rua é obrigatório!` } ] }
                  >
                    <Input placeholder="Rua" defaultValue={instituicao.enderecoDTO.rua} onChange={vt => instituicao.enderecoDTO.rua = vt.target.value} readOnly={flgEdit === 1 ? false : true}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="numero" label="Numero"
                    rules={ [ { required: instituicao.enderecoDTO.numero > 0 ? false : true, message: `Numero é obrigatório!` } ] }
                  >     
                    <InputMask className="input-com-mascara" mask="9999"
                      type='text' placeholder="Numero" defaultValue={instituicao.enderecoDTO.numero}
                      onChange={vt => instituicao.enderecoDTO.numero = parseInt(vt.target.value)} readOnly={flgEdit === 1 ? false : true}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <p className="site-description-item-profile-p">Contatos</p>
              <Row>
                <Col span={12}>
                  <Form.Item name="contatoUm" label="Contato primário"
                    rules={ [ { required: instituicao.contatoDTO.contatoUm.length > 0 ? false : true, message: `Contato primário é obrigatório!` } ] }
                  >
                    <InputMask
                      className="input-com-mascara"
                      mask="(99) 9 9999-9999"
                      type='text'
                      placeholder="Insira seu contato primário"
                      defaultValue={instituicao.contatoDTO.contatoUm}
                      onChange={vt => instituicao.contatoDTO.contatoUm = vt.target.value}
                      readOnly={flgEdit === 1 ? false : true}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="contatoDois" label="Contato secundário"
                    rules={ [ { required: instituicao.contatoDTO.contatoDois.length > 0 ? false : true, message: `Contato secundário é obrigatório!` } ] }
                  >
                    <InputMask
                      className="input-com-mascara"
                      mask="(99) 9 9999-9999"
                      type='text'
                      placeholder="Insira seu contato secundário"
                      defaultValue={instituicao.contatoDTO.contatoDois}
                      onChange={vt => instituicao.contatoDTO.contatoDois = vt.target.value}
                      readOnly={flgEdit === 1 ? false : true}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              { flgEdit === 1 &&
                <Row>
                  <Col xs={{span:24}}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                        <span className='color-white'>Inserir instituição</span>
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              }
            </div>
          </Form>
          }</>
      </Modal>}
    </>
  );
};