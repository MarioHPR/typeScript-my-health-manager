import { Drawer, Button, Avatar, Col, Row } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UsuarioApi from '../../models/usuarioApi';
import './style.css';
import { UsuarioResponse } from '../../interfaces/Usuario';
import { AuthContext } from '../../contexts/auth';
import { useTranslation  } from 'react-i18next';
import FormUsuarioEdit from '../formUsuarioEdit';

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
          <FormUsuarioEdit flgEdit={false} usuario={usuario} />
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
          <FormUsuarioEdit flgEdit={true} usuario={usuario} onFinish={onFinish} />
        }
        </Drawer>
      </Drawer>
    </>
  );
}