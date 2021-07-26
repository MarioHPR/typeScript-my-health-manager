import { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import './style.css';
import { useCallback } from 'react';
import { buscarInstituicoes } from '../../controllers/instituicaoApi';
import { InstituicaoResponse } from '../../interfaces/Instituicao';
import { toast } from 'react-toastify';

interface Iprops {
  flg: boolean;
  setFlg: Function;
  atualizaTela: number;
}

export default function SelectInstituicao ( { flg, setFlg, atualizaTela }: Iprops ) {
  const { Option } = Select;
  const [ instituicoes, setInstituicoes ] = useState<InstituicaoResponse[]>();

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[]);

  const getInstituicoes = useCallback(async () => {
    try{
      const response = await buscarInstituicoes();
      setInstituicoes(response);
    } catch(error){
      notifyError("Erro ao listar instituições!");
    }
  }, []);

  useEffect( () => {
    getInstituicoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela, setFlg] );

  return (
    <>
      {instituicoes && 
        <Form.Item name="select" label="Instituição" hasFeedback
          rules={ [ { required: !flg, message: 'Selecione uma instituição!' } ] }
        >
          {/* <Select placeholder="Selecione uma instituição!" disabled={flg}>
            <Option key={`odefault${1}`} onClick={() => setFlg(!flg)}>+ adicionar nova instituição</Option>
            {
              instituicoes.map( instituicao => {
                return <Option key={`op${instituicao.id}`} value={instituicao.id}>{instituicao.nome}</Option>
              })
            }
          </Select> */}
        </Form.Item>
      }
    </>
  )
}
