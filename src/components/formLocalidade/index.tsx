import React, { useEffect, useMemo, useState } from 'react';
import '../formularioDadosPessoais/stilo.css';
import '../../pages/login/login.css';
import { Form, Button } from 'antd';
import './style.css';
import InputMask from 'react-input-mask';
import Lista from '../lista';
import { useTranslation } from 'react-i18next';
import { IpropStep } from '../../interfaces/PropsSteps';
import { Link } from 'react-router-dom';



const FormularioLocalidade: React.FC<IpropStep> = ({ mudarStep, request }) => {
  const { t } = useTranslation();
  const [ cidade, setCidade ] = useState<string>(request.cidade ? request.cidade : "");
  const [ cep, setCep ] = useState<string>(request.cep ? request.cep : "");
  const [ bairro, setBairro ] = useState<string>(request.bairro ? request.bairro : "");
  const [ rua, setRua ] = useState<string>(request.rua ? request.rua : "");
  const [ numero, setNumero ] = useState<number>(request.numero ? request.numero : 0);

  const validaCampos = useMemo(() => {
      return (cidade !== "" && cep !== "" &&
          bairro !== "" && rua !== "" && numero !== 0);
  }, [cidade, cep, bairro, rua, numero]);
  
  const linha = ( item: any, i: any ) => {
    return (
      <>
        <label className="cor-branco">{item.titulo}<span className="cor-vermelho">*</span></label>
        <Form.Item className={ "" } name={ item.name } label={ "" }
          rules={ [ { required: true, message: `${ item.titulo } Obrigatório!` } ] }
        >
          { item.mask ?
            <InputMask mask="99999-999" key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } defaultValue={item.value} onChange={(v) => item.funcao(v.target.value)}/>
            : <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } defaultValue={item.value} onChange={(v) => item.funcao(v.target.value)}/>
          }
        </Form.Item>
        
      </>
    )
  }

  useEffect(() => {  
    if(validaCampos) {
        request.cidade = cidade;
        request.cep = cep;
        request.bairro = bairro;
        request.rua = rua;
        request.numero = numero;
    }
  // eslint-disable-next-line
  }, [cidade, cep, bairro, rua, numero]);

  return (
    <React.Fragment>    
          <h2 className="titulo">{t('steps.titulos.step2')}</h2>
          <Lista
            className="container-inputs"
            dados={[
              { name: 'cidade', titulo: t('perfil.cidade'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.cidade'), value: cidade, funcao: setCidade  },
              { name: 'cep', mask: true, titulo: t('perfil.cep'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.cep'), value: cep, funcao: setCep  },
              { name: 'bairro', titulo: t('perfil.bairro'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.bairro'), value: bairro, funcao: setBairro  },
              { name: 'rua', titulo: t('perfil.rua'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.rua'), value: rua, funcao: setRua  },
              { name: 'numero', titulo: t('perfil.numero'), classe: 'input-padrao', tipo:'text', dica: t('perfil.placeholder.numero'), value: numero, funcao: setNumero  }
            ] }
            funcao={ ( item: any, i: any ) => linha( item, i ) }
          />
          <div className='container-botoes-navegacao'>
            <Link to='/' className='botao-proxima-etapa botao-ir-login'>{t('steps.btLogin')}</Link>
            <Button onClick={() => mudarStep(0)} className="botao-etapa-anterior">{t('steps.btAnterior')}</Button>
            <Button type="primary" onClick={() => validaCampos && mudarStep(2)}  htmlType="submit" className="botao-proxima-etapa">{t('steps.btProxima')}</Button>
          </div>
    </React.Fragment>
  )
}

export default FormularioLocalidade;