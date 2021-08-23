import { Row, Col } from 'antd';
import './header.css';
import PerfilUsuario from '../perfil';
import { LoginOutlined } from '@ant-design/icons';
import { useTranslation  } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function Header (props: any) {
    const { mostrarLogin, btMostrarLogin } = props;
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    return (
      <>
        <header className='site-page-header'>
          <Row className='row-header' >
            <Row className='div-top-header'>
              <Col xs={{span:24}} md={{span:8}}>
              </Col>
              <Col xs={{span:24}} md={{span:16}}>
                <div className='bt-basico bt-logout'>
                {
                  btMostrarLogin ?
                    <p onClick={mostrarLogin} className='bt-login-abrir-caixa'>{t('header.btEntrar')} <LoginOutlined /></p> :
                    user && <PerfilUsuario />
                }
               </div>    
              </Col>
            </Row>           
          </Row>
        </header>
      </>
    )
  }