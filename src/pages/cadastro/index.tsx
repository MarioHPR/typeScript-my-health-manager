import React, { useContext, useState } from 'react';
import { Layout } from 'antd';
import { Row, Col, Form } from 'antd';
import  Header  from '../../components/header';
import  Footer  from '../../components/footer';
import './style.css';
import FormularioDadosPessoais from '../../components/formularioDadosPessoais';
import FormularioLocalidade from '../../components/formLocalidade';
import FormularioContato from '../../components/formContato';
import StepsUsuario from '../../components/steps';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { INITIAL_REQUEST, UsuarioRequest } from '../../interfaces/Usuario';
import { AuthContext } from '../../contexts/auth';


const { Content } = Layout;

const Cadastro: React.FC = () => {
  const { t } = useTranslation();
  const { cadastrarUsuario } = useContext(AuthContext);

  const [form] = Form.useForm();
  const [ step, setStep ] = useState<number>(0);
  const [ request ] =  useState<UsuarioRequest>(INITIAL_REQUEST);

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  const handleSubmit = useCallback(() => {
    cadastrarUsuario(request)
  },[cadastrarUsuario,request]);

  const mudarStep = (value: number) => {
      setStep(value);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <StepsUsuario step={step} />
            <h2 className='titulo-principal'>{t('perfil.cadastro')}</h2>
            <Form form={form} name="control-hooks" onFinish={()=>{}}>
              <Row>
                <Col xs={{span:24}}>
                { step === 0 &&
                  <Col xs={{span:24}}>
                    <FormularioDadosPessoais mudarStep={mudarStep} request={request}/>
                  </Col>
                }
                { step === 1 &&
                  <Col xs={{span:24}}>
                  <div className="pagina-login">
                    <div className="container-form margin-top container-form-infos">
                      <FormularioLocalidade mudarStep={mudarStep} request={request}/>
                    </div>
                  </div>
                  </Col>
                }
                { step === 2 &&
                  <Col xs={{span:24}}>
                    <FormularioContato mudarStep={mudarStep} request={request} handleSubmit={handleSubmit}/> 
                  </Col>
                }
                </Col>
              </Row>
              </Form>
          </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default Cadastro;
