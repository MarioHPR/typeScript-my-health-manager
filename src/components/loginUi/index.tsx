import { useState, useContext, useCallback } from 'react';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { useTranslation  } from 'react-i18next';
import { ParametrosLogin } from '../../interfaces/Usuario';

const LoginUi: React.FC = () => {

  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const { signIn } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleSubmit = useCallback(() => { 
    if( email !== '' && senha !== '' ) {
      let parametros:ParametrosLogin = {
        email: email.toLowerCase(),
        senha: senha,
      };
      signIn(parametros);
    }
    
  }, [signIn, email, senha]);

  return (
    <>
      <section className="container-form">
        <h2>{t('login.title')}</h2>
        <div>
          <input className="btn-login input-login" onBlur={ evt => setEmail( evt.target.value )} placeholder={t('login.dicaEmail')} id="email" type="text" name="email" required />
          <Input.Password
            required
            className="btn-login"
            id="senha" name="senha"
            placeholder={t('login.dicaSenha')}
            onBlur={ evt => setSenha( evt.target.value )}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <Button className="btn-cadastrar fundo-azul" onClick={ handleSubmit } >{t('login.btEntrar')}</Button>
        </div>
        <Link to='/cadastro' className="btn-cadastrar-usuario">
          {t('login.btCadastrar')}
        </Link>
      </section>
    </>
  )
}

export default LoginUi;
