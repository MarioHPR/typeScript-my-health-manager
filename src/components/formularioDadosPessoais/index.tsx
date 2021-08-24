import React, { useEffect, useMemo, useState } from 'react';
import { Input, Form, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './stilo.css';
import '../../pages/login/login.css';
import InputMask from 'react-input-mask';
import Lista from '../lista';
import { useTranslation } from 'react-i18next';
import { IpropStep } from '../../interfaces/PropsSteps';
import { localeDateToISO } from '../../utils/Validador';
import { Link } from 'react-router-dom';

const FormularioDadosPessoais: React.FC<IpropStep> = ({ mudarStep, request }) => {
  const { t } = useTranslation();
  const [ nome, setNome ] = useState<string>(request?.nome ? request.nome : "" );
  const [ cpf, setCpf ] = useState<string>(request?.cpf ? request.cpf : "");
  const [ dataNascimento, setDataNascimento ] =useState<string>(request?.dataNascimento ? request.dataNascimento : "");
  const [ email, setEmail ] = useState<string>(request?.email ? request.email : "");
  const [ senha, setSenha ] = useState<string>(request?.senha ? request.senha : "");
  
  const linha = ( item: any, i: any ) => {
    return (
      <div key={item.name + i}>
        <label className="cor-branco">{item.titulo}<span className="cor-vermelho">*</span></label>
        <Form.Item name={ item.name }
            rules={ [ { required: true, message: `${ item.titulo } Obrigatório!` } ] }
        >
          { item.mask ?
            <InputMask mask="999.999.999-99" key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } defaultValue={item.value} onChange={(v) => item.funcao(v.target.value)}/>
            : <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } defaultValue={item.value} onChange={(v) => item.funcao(v.target.value)}/>
          }
        </Form.Item>
      </div>
    )
  }

  const validaCampos = useMemo(() => {
    if(cpf !== "" && nome !== "" && email !== "" && 
    senha !== "" &&  dataNascimento !== "") {
        return true;
    }
    return false;
  }, [cpf, nome, email, senha, dataNascimento]);

  useEffect(() => {  
    if(cpf !== "" && nome !== "" && email !== "" && 
    senha !== "" &&  dataNascimento !== "") {
        request.nome = nome;
        request.cpf = cpf;
        request.dataNascimento = localeDateToISO(dataNascimento);
        request.email = email.toLowerCase();
        request.senha = senha;
    }
  // eslint-disable-next-line
  }, [cpf, nome, email, senha, dataNascimento]);

  return (
    <div className="container-form margin-top container-form-infos">
      <h2 className="titulo">{t('steps.titulos.step1')}</h2>
      <Lista
        className="container-inputs"
        dados={[
          { name: 'nome', titulo: t('perfil.nome'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.nome'), value: nome, funcao: setNome },
          { name: 'cpf', mask: true, titulo: t('perfil.cpf'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.cpf'), value: cpf, funcao: setCpf },
          { name: 'dataNascimento', titulo: t('perfil.dataNasc'), classe: 'input-padrao', tipo:'date', dica: '01/01/2020', value: dataNascimento, funcao: setDataNascimento},
          { name: 'email', titulo: t('perfil.email'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.email'), value: email, funcao: setEmail }
        ] }
        funcao={ ( item: any, i: any ) => linha( item, i ) }
      />
      <label className="cor-branco">Senha:<span className="cor-vermelho">*</span></label>
      <Form.Item className="" name={ "senha" } label={ "" }
          rules={ [ { required: true, message: `Senha é Obrigatório!` } ] }
      >
        <Input.Password
          className="input-padrao tag-tamanho-total senha-cadastro-input"     
          id="senha" name="senha"
          placeholder={t('perfil.placeholder.senha')}
          defaultValue={senha}
          onChange={(v) => setSenha(v.target.value)}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <div className='container-botoes-navegacao'>
        <Link to='/' className='botao-proxima-etapa botao-ir-login'>{t('steps.btLogin')}</Link>
        <Button type="primary" onClick={() => validaCampos && mudarStep(1)} htmlType="submit"  className="botao-proxima-etapa">{t('steps.btProxima')}</Button>
      </div>
    </div>
  )
}

export default FormularioDadosPessoais;