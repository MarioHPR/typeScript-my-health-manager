import React, { useState } from 'react';
import { Layout, Row} from 'antd';
import  Header  from '../../components/header';
import  Footer  from '../../components/footer';
import  LoginUi  from '../../components/loginUi';
import './login.css';
import { Col } from 'antd';
import logo from '../../img/logo.png';
import { useTranslation  } from 'react-i18next';

const { Content } = Layout;
const Login: React.FC = () => {
  const { t } = useTranslation();
  const [flg, setFlg ] = useState<boolean>(true);
  const [ collapsed2, setCollapsed2 ] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };
  
  const mostrarLogin = () => {
    let aux = !flg;
    setFlg(aux);
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } mostrarLogin={mostrarLogin} btMostrarLogin={true} />
        <Content className="pagina-padrao">
          <Row>
            <Col xs={{span:24}} md={{span:17}}>
              <div className='container-texto-apresentacao'>
                <h3>{t('telaLogin.title')}</h3>
                <p>{t('telaLogin.p1')}</p>
                <p>{t('telaLogin.p2')}</p>
                <p>{t('telaLogin.p3')}</p>
                <p className='espaco-botton'>{t('telaLogin.p4')}</p>
              </div>
            </Col>
            <Col xs={{span:24}} md={ { span: 7 } }>
              <div className="login">
                {
                  flg ?
                    <img src={logo} alt='Logo gerenciador de exames' className='logo-gerenciador'/> :
                    <div className="layout-login">
                      <LoginUi />
                    </div>
                }
              </div>
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
    
}

export default Login;