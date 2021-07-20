import React, { useState } from 'react';
import { Layout } from 'antd';
import { useHistory } from 'react-router-dom';
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
import { UsuarioRequest } from '../../interfaces/Usuario';
import UsuarioApi from '../../models/usuarioApi';


const { Content } = Layout;

const Cadastro: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [ step, setStep ] = useState<number>(0);
  const [ request ] =  useState<UsuarioRequest>({
    nome: "",
    dataNascimento: "",
    cpf: "",
    email: "",
    senha: "",
    contatoUm: "",
    contatoDois: "",
    cidade: "",
    cep: "",
    bairro: "",
    rua: "",
    numero: 0
});

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  const handleSubmit = useCallback(() => {
    const usuarioApi = new UsuarioApi();
    usuarioApi.criarUsuario(request).then( resposta => {
        if( resposta.status === 200 )
          history.push('/login');
      })
    console.log(request)
  },[history]);

  const mudarStep = (value: number) => {
      setStep(value);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <StepsUsuario step={step} />
            <h2 className='titulo-principal'>Cadastro Usuário:</h2>
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
