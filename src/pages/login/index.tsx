import React, { useState } from 'react';
import { Layout, Row} from 'antd';
import  Header  from '../../components/header';
import  Footer  from '../../components/footer';
import  LoginUi  from '../../components/loginUi';
import './login.css';
import { Col } from 'antd';
import logo from '../../img/logo.png';

const { Content } = Layout;
// export default function Login() {
const Login: React.FC = () => {
  const [flg, setFlg ] = useState(true);
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
                <h3>Porque utilizar o gerenciador de exames?</h3>
                <p>Nosso sistema ajudará você a manter seus exames e consultas organizadas em um só lugar.</p>
                <p>Nosso sistema tem como objetivo disponibilizar uma alternativa para você organizar seus arquivos de midia digital e fisica de forma     totalmente digital.</p>
                <p>Disponibilizando acesso de qualquer lugar para você, seja em sua casa, consultório, hospital entre outros lugares.</p>
                <p className='espaco-botton'>Com nosso sistema você levará sempre todos os seus exames e consultas cadastradas, facilitando o acompanhamento médico e até mesmo ajudando você a ter um controle sobre seus dados de saúde.</p>
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