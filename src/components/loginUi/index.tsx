import { useState, useContext, useCallback } from 'react';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

const LoginUi: React.FC = () => {
  const history = useHistory();
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const { signIn } = useContext(AuthContext);


  const handleSubmit = useCallback(() => { 
    if( email !== '' && senha !== '' ) {
      let parametros = {
        email: email.toLowerCase(),
        senha: senha,
      };
      signIn(parametros);
      // const usuarioApi = new UsuarioApi();
      // usuarioApi.realizarLogin(email, senha).then( resposta => {
      //   if(resposta.status === 200) {
      //     localStorage.setItem( "token-gerenciador-security", resposta.headers.authorization );
      //   }
      //   if(localStorage.getItem("token-gerenciador-security")){
      //     history.push('/')
      //   }
      // },(error) => { openNotificationWithIcon('error', 'Dados errados', 'Email ou Senha pode estar incorreto'); });
    }
    
  }, [signIn, email, senha]);

  return (
    <>
      <section className="container-form">
        <h2>Faça seu Login</h2>
        <div>
          <input className="btn-login input-login" onBlur={ evt => setEmail( evt.target.value )} placeholder="email@gmail.com" id="email" type="text" name="email" required />
          <Input.Password
            required
            className="btn-login"
            id="senha" name="senha"
            placeholder="insira sua senha"
            onBlur={ evt => setSenha( evt.target.value )}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <Button className="btn-cadastrar fundo-azul" onClick={ handleSubmit } >Entrar</Button>
        </div>
        <Link to='/cadastro' className="btn-cadastrar-usuario">
            Cadastrar
        </Link>
      </section>
    </>
  )
}

export default LoginUi;
