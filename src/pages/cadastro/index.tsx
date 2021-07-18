import React, { useState } from 'react';
import { Layout } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'antd';
import  Header  from '../../components/header';
import  Footer  from '../../components/footer';
import './style.css';
import UsuarioApi from '../../models/usuarioApi';
import FormularioDadosPessoais from '../../components/formularioDadosPessoais';
import FormularioLocalidade from '../../components/formLocalidade';
import FormularioContato from '../../components/formContato';
import StepsUsuario from '../../components/steps';
import { useTranslation } from 'react-i18next';


const { Content } = Layout;

const Cadastro: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [ step, setStep ] = useState(0);
  const [form]: any = Form.useForm();

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };


  const onFinish = (values: any) => {
    let proximaEtapa = true;
    if(values.email.indexOf('@gmail.com') === -1){
      // openNotificationWithIcon("error", 'Dados errados', 'Email teve conter sufixo "@gmail.com"!');
      proximaEtapa = false;
    }
    if(values.senha.length < 6){
      // openNotificationWithIcon("error", 'Dados errados', 'Senha deve conter no minimo 6 caracteres!');
      proximaEtapa = false;
    }
    
    if(step < 2 && proximaEtapa) {
      proximaEtapa = false;
      setStep(step + 1);
    }
    if(step === 2){
      handleSubmit(values)
    }
  }
  async function handleSubmit(event: any) {
    const usuarioApi = new UsuarioApi();
    usuarioApi.criarUsuario(event).then( resposta => {
        if( resposta.status === 200 )
          history.push('/login');
      })
  }

  const etapaAnterior = () => {
    console.log("entrou aqui ")
    if(step > 0){
      setStep(step - 1);
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <StepsUsuario step={step} />
            <h2 className='titulo-principal'>Cadastro Usuário:</h2>
            <Form form={form} name="validate_other" onFinish={onFinish} initialValues={undefined} autoComplete="on" >
              <Row>
                <Col xs={{span:24}}>
                { step === 0 &&
                  <Col xs={{span:24}}>
                    <FormularioDadosPessoais />
                  </Col>
                }
                { step === 1 &&
                  <Col xs={{span:24}}>
                  <div className="pagina-login">
                    <div className="container-form margin-top container-form-infos">
                      <FormularioLocalidade etapaAnterior={etapaAnterior}/>
                    </div>
                  </div>
                  </Col>
                }
                { step === 2 &&
                  <Col xs={{span:24}}>
                    <div className="container-form margin-top container-form-infos">
                      <FormularioContato /> 
                      <div className='container-botoes-navegacao'>
                        <Link to='/' className='botao-proxima-etapa botao-ir-login'>{t('steps.btLogin')}</Link>
                        <Button onClick={() => etapaAnterior} className="botao-etapa-anterior">{t('steps.btAnterior')}</Button>
                        <Button type="primary" htmlType="submit" className="botao-proxima-etapa">{t('steps.btCadastrar')}</Button>
                      </div>
                    </div>
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
