import React from 'react';
import '../formularioDadosPessoais/stilo.css';
import '../../pages/login/login.css';
import { Form, Button } from 'antd';
import './style.css';
import InputMask from 'react-input-mask';
import Lista from '../lista';
import { useTranslation } from 'react-i18next';

interface Iprops {
  etapaAnterior: Function;
}

const FormularioLocalidade: React.FC<Iprops> = ({ etapaAnterior }:Iprops) => {
  const { t } = useTranslation();
  
  const linha = ( item: any, i: any ) => {
    return (
      <>
        <label className="cor-branco">{item.titulo}<span className="cor-vermelho">*</span></label>
        <Form.Item className={ "" } name={ item.name } label={ "" }
          rules={ [ { required: true, message: `${ item.titulo } Obrigatório!` } ] }
        >
          { item.mask ?
            <InputMask mask="99999-999" key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } />
            : <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } />
          }
        </Form.Item>
        
      </>
    )
  }

  return (
    <React.Fragment>    
          <h2 className="titulo">{t('steps.titulos.step2')}</h2>
          <Lista
            className="container-inputs"
            dados={[
              { name: 'cidade', titulo: t('perfil.cidade'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.cidade') },
              { name: 'cep', mask: true, titulo: t('perfil.cep'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.cep') },
              { name: 'bairro', titulo: t('perfil.bairro'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.bairro') },
              { name: 'rua', titulo: t('perfil.rua'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.rua') },
              { name: 'numero', titulo: t('perfil.numero'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.numero') }
            ] }
            funcao={ ( item: any, i: any ) => linha( item, i ) }
          />
          <div className='container-botoes-navegacao'>
            <Button onClick={etapaAnterior()} className="botao-etapa-anterior">{t('steps.btAnterior')}</Button>
            <Button type="primary" htmlType="submit" className="botao-proxima-etapa">{t('steps.btProxima')}</Button>
          </div>
    </React.Fragment>
  )
}

export default FormularioLocalidade;