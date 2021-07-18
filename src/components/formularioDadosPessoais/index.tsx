import React from 'react';
import { Input, Form, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './stilo.css';
import '../../pages/login/login.css';
import InputMask from 'react-input-mask';
import Lista from '../lista';
import { useTranslation } from 'react-i18next';

const FormularioDadosPessoais: React.FC = () => {
  const { t } = useTranslation();
  
  const linha = ( item: any, i: any ) => {
    return (
      <>
      <label className="cor-branco">{item.titulo}<span className="cor-vermelho">*</span></label>
        <Form.Item name={ item.name }
            rules={ [ { required: true, message: `${ item.titulo } Obrigatório!` } ] }
        >
          { item.mask ?
            <InputMask mask="999.999.999-99" key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } />
            : <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } />
          }
        </Form.Item>
      </>
    )
  }

  return (
    <div className="container-form margin-top container-form-infos">
      <h2 className="titulo">{t('steps.titulos.step1')}</h2>
      <Lista
        className="container-inputs"
        dados={[
          { name: 'nome', titulo: t('perfil.nome'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.nome') },
          { name: 'cpf', mask: true, titulo: t('perfil.cpf'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.cpf') },
          { name: 'dataNascimento', titulo: t('perfil.dataNasc'), classe: 'input-padrao', tipo:'date', dica: '01/01/2020' },
          { name: 'email', titulo: t('perfil.email'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.email') }
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
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <div className='container-botoes-navegacao'>
        <Button type="primary" htmlType="submit" className="botao-proxima-etapa">{t('steps.btProxima')}</Button>
      </div>
    </div>
  )
}

export default FormularioDadosPessoais;