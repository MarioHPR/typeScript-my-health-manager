import { Col } from 'antd';
import InputFormItem from '../inputFormInput';
import './style.css';

interface Iprops {
  name?: string;
  tipo?: any;
  label?: string;
  conteudo?: string;
  span?: number;
  placeholder?: string;
  editarVisualizar?:any;
  md?: number;
  lg?: number;
}

export default function InputBasicoModal( { name, tipo, label, conteudo, span, placeholder, editarVisualizar,  md, lg }:Iprops ) {
    return (
      <>
        <Col xs={{span:span}} md={{span:md || span}} lg={{span:lg || md || span}} className='campoModal'>
          <InputFormItem
            name={name ? name : ""}
            nome={''} 
            mask={''}
            titulo={label ? label : ""}
            key={name ? name : ""}
            classe={'input-modal margin-bottom'}
            classContainer={''}
            tipo={ tipo }
            dica={ placeholder ? placeholder : "" }
            value= { conteudo ? conteudo : ""}
            flgRequired={true}
            editarVisualizar={editarVisualizar}
          />
        </Col>
        
      </>
    )
  }
