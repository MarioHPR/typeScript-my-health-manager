import { useCallback, useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import './style.css';
import ModalAddConsulta from '../modalAddConsulta';
import ModalVisualizarEditarConsulta from '../modalVisualizarEditarConsulta';

import { DeleteOutlined, EditOutlined ,EyeOutlined } from '@ant-design/icons';
import { ConsultaResponse } from '../../interfaces/Consulta';
import { removerConsulta } from '../../controllers/consultaApi';
import { toast } from 'react-toastify';

interface Iprops {
  consultas: ConsultaResponse[];
  atualizaTela: number;
  setAtualizaTela: Function;
}

interface TableConsulta {
  key: number;
  diagnostico: string;
  nomeMedico: string;
  dataConsulta: string;
}

export default function TableDados( { consultas, atualizaTela, setAtualizaTela }: Iprops ) {

  const [ aux, setAux ] = useState<TableConsulta[]>([]);
  const [ visibleEdit, setVisibleEdit ] = useState<boolean>(false);
  const [ visibleAdd, setVisibleAdd ] = useState<boolean>(false);
  const [ idConsulta, setIdConsulta ] = useState<number>(0);
  const [ flgEdit, setFlgEdit ] = useState<number>(0);

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const notifySuccess = useCallback((texto:string) => {
    toast.success(texto);
  },[])

  const columns = [
    { title: "Id", dataIndex: "key" }, 
    {
      title: "Diagnostico",
      dataIndex: "diagnostico"
    },
    {
      title: "Medico",
      dataIndex: "nomeMedico"
    },
    {
      title: "Data",
      dataIndex: "dataConsulta"
    },
    {
      title: 'Operações',
      dataIndex: 'operation',
      render: (text:any, record:any) =>
        true ? (
          <div className="container-operacoes">
            <Popconfirm title="Tem certeza que deseja deletar?" onConfirm={() => handleDelete(record.key)}>
              <a href='#/' className="bt-operacao" title="deletar"><DeleteOutlined /></a>
            </Popconfirm>
            <a href='#/' title="editar" onClick={() => {setVisibleEdit(true); setIdConsulta(record.key); setFlgEdit(1);}} className="bt-operacao"><EditOutlined /></a>
            <a href='#/' title="visualizar" onClick={() => {setVisibleEdit(true); setIdConsulta(record.key); setFlgEdit(0);}} className="bt-operacao"><EyeOutlined /></a>
          </div>
        ) : null,
    },
  ];

  const handleDelete = useCallback(async (evt) => {
    try{
      await removerConsulta(evt);
      setAux(aux.filter( (item) => item.key !== evt ) );
      notifySuccess('Consulta excluída com sucesso!');
    } catch(error){
      notifyError('Não foi possivel realizar a exclusão da consulta!')
    }
  },[notifySuccess, notifyError, aux]);

  useEffect(() => {
    let a = [] as any;
    consultas.map( consulta => 
      a.push({
        "key": consulta.id,
        "diagnostico": `${consulta.diagnostico}`,
        "nomeMedico": `${consulta.nomeMedico}`,
        "dataConsulta": `${new Date(consulta.dataConsulta).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}`|| '--'
      })
    );
    setAux(a);
  },[consultas, atualizaTela]);
  
  return (
      <div className='container-lista-consulta'>
        <a  href='#/' onClick={() => {setVisibleAdd(true)}} className='bt-geral bt-cadastro-consulta' >
          Adicionar Consulta
        </a>
        {aux !== [] && <Table columns={columns} dataSource={aux} pagination={{ pageSize: 7 }}/>}
        <ModalAddConsulta atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />
        <ModalVisualizarEditarConsulta atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} idConsulta={idConsulta} visibleEdit={visibleEdit} setVisibleEdit={setVisibleEdit} flgEdit={flgEdit} />
      </div>
  )
}