import { useState, useEffect } from 'react';
import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.css';
import { Link } from '@material-ui/core';
import {Form} from 'antd';
import { DadosTipoExameResponse } from '../../interfaces/TipoExame';
import { useCallback } from 'react';
import { buscarTipoExame } from '../../controllers/tipoExameApi';
import { toast } from 'react-toastify';

interface Iprops {
  atualizaTela: number;
  setItensExame: Function;
  itensExame: DadosTipoExameResponse[];
  setItensDoExame: Function;
}

interface NovoCampo {
  id: number;
  campo: string;
  valor?: string;
}

export default function SelectTipoExameEspecial ( { atualizaTela, setItensExame, itensExame, setItensDoExame }:Iprops ) {

  const { Option } = Select;
  const [ tipoExame, setTipoExame ] = useState<string[]>([]);
  const [name, setName] = useState('');

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[]);

  const getTiposExames = useCallback(async () => {
    try{
      let aux:string[] = [];
      const response = await buscarTipoExame();
      response.map( tipo => aux.push(tipo.nomeExame) );
      setTipoExame(aux);
      setItensExame(response);
    }catch(error){
      notifyError("Erro ao carregar os tipo de exames cadastrados!");
    }
  }, [setTipoExame, setItensExame, notifyError]);

  const onNameChange = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const addItem = () => {
    if(name !== '') {
      let aux = tipoExame;
      aux.push(name);
      setTipoExame( aux );
      setName('');
    }
  };

  useEffect( () => {
    getTiposExames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela] );

  return (
    <div className='centralizador-div espacamento-left'>
      <label>Tipo: </label>
      <Form.Item name="nomeExame" hasFeedback
            rules={ [ { required: true, message: 'Selecione uma tipo de exame!' } ] }
      >
        <Select
          className='select-tipo-exame'
          placeholder="Exemplo: Raio X, Hemograma..."
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div className='div-add-item'>
                <Input className='input-add-item' value={ name } placeholder='Exemplo: Raio X, Hemograma...' onChange={onNameChange} />
                <Link
                  className='link-add-item'
                  onClick={addItem}
                >
                  <PlusOutlined /> Add novo
                </Link>
              </div>
            </div>
          )}
          onSelect={(evt)=>{
            let auxItens:NovoCampo[] = [];
            itensExame.find(item => {
              if(item.nomeExame === evt){
                auxItens = item.itensCampo.filter( i => i.campo !== '');
              }
              return 0;
            });
            setItensDoExame(auxItens || undefined);
          }
        }
        >
          { tipoExame && tipoExame.map( item => ( <Option value={item} key={item}>{item}</Option> ) ) }
        </Select>
      </Form.Item>
    </div>
  );
}