import React, { useEffect, useMemo, useState } from 'react';
import '../../pages/login/login.css';
import Lista from '../lista';
import {  Button, Form } from 'antd';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { IpropStep } from '../../interfaces/PropsSteps';
import { useTranslation } from 'react-i18next';

const FormularioContato: React.FC<IpropStep> = ({ mudarStep, request, handleSubmit }:IpropStep) => {
  const { t } = useTranslation();
  const [ contatoUm, setContatoUm ] = useState<string>(request.contatoUm ? request.contatoUm : "");
  const [ contatoDois, setContatoDois ] = useState<string>(request.contatoDois ? request.contatoDois : "");

  const linha = ( item: any, i: any ) => {
    return (
      <>
        <label className="cor-branco">Contato {i+1}:<span className="cor-vermelho">*</span></label>
        <Form.Item className="" name={ item.name } label={ "" }
          rules={ [ { required: true, message: `Contato é Obrigatório!` } ] }
        >
          <InputMask mask="(99) 9 9999-9999" key={ i } className={ item.classe } type={ item.tipo } placeholder="Insira seu telefone" defaultValue={item.value} onChange={(v) => item.funcao(v.target.value)}/>
        </Form.Item>
      </>
    )
  }

  const validaCampos = useMemo(() => {
    return (contatoUm !== "" && contatoDois !== "");
  }, [contatoUm, contatoDois]);


  const enviarForm = () => {
    validaCampos && handleSubmit && handleSubmit();
  }

  useEffect(() => {
    if(validaCampos) {
        request.contatoUm = contatoUm;
        request.contatoDois = contatoDois;
    }
  // eslint-disable-next-line
  }, [contatoUm, contatoDois]);

  return (
    <div className="container-form margin-top container-form-infos">
      <h2 className="titulo">Contato:</h2>
      <Lista
        className="container-inputs"
        dados={[
          { titulo: 'Tipo:', name: 'contatoUm', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: '', value: contatoUm, funcao: setContatoUm },
          { titulo: 'Valor:', name: 'contatoDois', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: '', value: contatoDois, funcao: setContatoDois },
        ] }
        funcao={ ( item: any, i: any ) => linha( item, i ) }
      />

      <div className='container-botoes-navegacao'>
        <Link to='/' className='botao-proxima-etapa botao-ir-login'>{t('steps.btLogin')}</Link>
        <Button onClick={() => mudarStep(1)} className="botao-etapa-anterior">{t('steps.btAnterior')}</Button>
        <Button type="primary" onClick={enviarForm}  htmlType="submit"  className="botao-proxima-etapa">{t('steps.btCadastrar')}</Button>
      </div>
    </div>
  )
}

export default FormularioContato;