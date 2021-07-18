import { Drawer, Button, Avatar, Divider, Col, Row, Form, Input } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UsuarioApi from '../../models/usuarioApi';
import InputMask from 'react-input-mask';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './style.css';
import { UsuarioResponse } from '../../interfaces/Usuario';
import { AuthContext } from '../../contexts/auth';
import { useTranslation  } from 'react-i18next';

const DescriptionItem = ({ title, content }:any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

export default function PerfilUsuario() {
  const [ visible, setVisible ] = useState(false);
  const [ childrenDrawer, setChildrenDrawer ] = useState(false);
  const [ usuario, setUsuario ] = useState<UsuarioResponse>();
  const { t } = useTranslation();

  const { signOut } = useContext(AuthContext);

  const deslogar = () => {
    signOut();
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const onFinish = () => {
    const auth = localStorage.getItem("token-gerenciador-security");
    const usuarioApi = new UsuarioApi();
    usuarioApi.editarUsuario(usuario, auth).then( resp => console.log(resp));
    onChildrenDrawerClose();
  }

  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const usuarioApi = new UsuarioApi();
    usuarioApi.buscarDadosDoUsuario(auth).then( resp => setUsuario(resp.data) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    

  return (
    <>
      {usuario &&
        <a onClick={showDrawer} key={`a-${usuario?.nome}`} >
              <div>
                  <Avatar style={{ backgroundColor: '#f56a00' }}>{usuario.nome[0]}</Avatar>
                  <span className='link-bt-perfil espaco-left' >{usuario.nome}</span>
              </div>
            </a>
      }
      <Drawer
        width={"600"}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
        {t('perfil.title')}
        </p>
        { usuario && 
          <>
            <Row>
              <Col span={12}>
                <DescriptionItem title={t('perfil.nome')} content={usuario.nome}/>
              </Col>
              <Col span={12}>
                <DescriptionItem title={t('perfil.email')} content={usuario.email} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title={t('perfil.cpf')} content={usuario.cpf} />
              </Col>
              <Col span={12}>
                <DescriptionItem title={t('perfil.pais')} content="Brasil 🇧🇷" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title={t('perfil.dataNasc')} content={new Date(usuario.dataNascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">{t('perfil.subTitles.endereco')}</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title={t('perfil.cidade')} content={usuario.cidade} />
              </Col>
              <Col span={12}>
                <DescriptionItem title={t('perfil.cep')} content={usuario.cep} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title={t('perfil.bairro')} content={usuario.bairro} />
              </Col>
              <Col span={12}>
                <DescriptionItem title={t('perfil.rua')} content={usuario.rua} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title={t('perfil.numero')}
                  content={usuario.numero}
                />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">{t('perfil.subTitles.contatos')}</p>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title={t('perfil.contatoUm')}
                  content={usuario.contatoUm}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title={t('perfil.contatoDois')}
                  content={usuario.contatoDois}
                />
              </Col>
            </Row>
          </>
        }
          <Row>
            <Col span={12}>
              <Link to='/#' onClick={deslogar} className='bt-logout-modal'>
                {t('perfil.btSair')}
              </Link>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={showChildrenDrawer}>
                {t('perfil.btEditar')}
              </Button>
            </Col>
          </Row>
          <Drawer
            title={t('perfil.titleEdit')}
            width={"auto"}
            closable={false}
            onClose={onChildrenDrawerClose}
            visible={childrenDrawer}
          >{ usuario &&
            <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
              <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                {t('perfil.title')}
              </p>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="name" label={t('perfil.nome')}
                    rules={ [ { required: usuario.nome.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <Input onChange={evt => usuario.nome = evt.target.value} defaultValue={usuario.nome} placeholder={t('perfil.placeholder.nome')} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="email" label={t('perfil.email')}
                    rules={ [ { required: usuario.email.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <Input onChange={evt => usuario.email = evt.target.value} defaultValue={usuario.email} placeholder={t('perfil.placeholder.email')} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="cpf" label={t('perfil.cpf')}
                    rules={ [ { required: usuario.cpf.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >     
                    <InputMask
                      className="input-com-mascara"
                      onChange={evt => usuario.cpf = evt.target.value}
                      mask="999.999.999-99"
                      key={ `bt${ usuario.cpf }` }
                      type='text'
                      placeholder={t('perfil.placeholder.cpf')}
                      defaultValue={usuario.cpf}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t('perfil.pais')}>
                    <Input defaultValue="Brasil 🇧🇷" readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="dataNasc" label={t('perfil.dataNasc')}
                    rules={ [ { required: usuario.dataNascimento.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <Input onChange={evt => usuario.dataNascimento = evt.target.value} type='date' defaultValue={usuario.dataNascimento} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item className="" name={ "senha" } label={t('perfil.novaSenha')}
                    rules={ [ { required: usuario.senha.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <Input.Password
                      className="input-com-mascara"
                      onChange={evt => usuario.senha = evt.target.value}
                      id="senha" name="senha"
                      placeholder={t('perfil.placeholder.senha')}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p">{t('perfil.subTitles.endereco')}</p>
              <Row>
                <Col span={12}>
                  <Form.Item name="cidade" label={t('perfil.cidade')}
                    rules={ [ { required: usuario.cidade.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <Input onChange={evt => usuario.cidade = evt.target.value} defaultValue={usuario.cidade} placeholder={t('perfil.placeholder.cidade')} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="cep" label={t('perfil.cep')}
                    rules={ [ { required: usuario.cep.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <InputMask
                      className="input-com-mascara"
                      onChange={evt => usuario.cep = evt.target.value}
                      mask="99999-999"
                      key={ `bt${ usuario.cep }` }
                      type='text'
                      placeholder={t('perfil.placeholder.cep')}
                      defaultValue={usuario.cep}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="bairro" label={t('perfil.bairro')}
                    rules={ [ { required: usuario.bairro.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <Input onChange={evt => usuario.bairro = evt.target.value} defaultValue={usuario.bairro} placeholder={t('perfil.placeholder.bairro')} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="rua" label={t('perfil.rua')}
                    rules={ [ { required: usuario.rua.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <Input onChange={evt => usuario.rua = evt.target.value} defaultValue={usuario.rua} placeholder={t('perfil.placeholder.rua')} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="numero" label={t('perfil.numero')}
                    rules={ [ { required: usuario.numero > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <Input onChange={evt => usuario.numero = parseInt(evt.target.value)} defaultValue={usuario.numero} placeholder={t('perfil.placeholder.nmero')} />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p">{t('perfil.subTitles.contatos')}</p>
              <Row>
                <Col span={12}>
                  <Form.Item name="contatoUm" label={t('perfil.contatoUm')}
                    rules={ [ { required: usuario.contatoUm.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <InputMask
                      className="input-com-mascara"
                      onChange={evt => usuario.contatoUm = evt.target.value}
                      mask="(99) 9 9999-9999"
                      key={ `contato1${ usuario.contatoUm }` }
                      type='text'
                      placeholder={t('perfil.placeholder.contatoUm')}
                      defaultValue={usuario.contatoUm}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="contatoDois" label={t('perfil.contatoDois')}
                    rules={ [ { required: usuario.contatoDois.length > 0 ? false : true, message: t('errors.obrigatorio') } ] }
                  >
                    <InputMask
                      className="input-com-mascara"
                      onChange={evt => usuario.contatoDois = evt.target.value}
                      mask="(99) 9 9999-9999"
                      key={ `contato2${ usuario.contatoDois }` }
                      type='text'
                      placeholder={t('perfil.placeholder.contatoDois')}
                      defaultValue={usuario.contatoDois}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col xs={{span:24}}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                      <span className='color-white'>{t('perfil.btEnviar')}</span>
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>}
          </Drawer>
      </Drawer>
    </>
  );
}