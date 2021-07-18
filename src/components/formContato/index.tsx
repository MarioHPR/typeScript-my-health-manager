import React from 'react';
import '../../pages/login/login.css';
import Lista from '../lista';
import {  Form } from 'antd';
import InputMask from 'react-input-mask';

const FormularioContato: React.FC = () => {

  const linha = ( item: any, i: any ) => {
    return (
      <>
        <label className="cor-branco">Contato {i+1}:<span className="cor-vermelho">*</span></label>
        <Form.Item className="" name={ item.name } label={ "" }
          rules={ [ { required: true, message: `Contato é Obrigatório!` } ] }
        >
          <InputMask mask="(99) 9 9999-9999" key={ i } className={ item.classe } type={ item.tipo } placeholder="Insira seu telefone" />
        </Form.Item>
      </>
    )
  }

  return (
      <>
        <h2 className="titulo">Contato:</h2>
        <Lista
          className="container-inputs"
          dados={[
            { titulo: 'Tipo:', name: 'contatoUm', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: '' },
            { titulo: 'Valor:', name: 'contatoDois', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: '' },
          ] }
          funcao={ ( item: any, i: any ) => linha( item, i ) }
        />
      </>
  )
}

export default FormularioContato;