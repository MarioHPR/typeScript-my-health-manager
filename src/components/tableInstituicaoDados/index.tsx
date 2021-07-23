import { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { useTranslation  } from 'react-i18next';
import './style.css';
import ModalVisualizarEditarInstituicao  from '../modalVisualizarEditarInstituicao';
import ModalAddInstituicao from '../modalAddInstituicao';
import { DeleteOutlined, EditOutlined ,EyeOutlined } from '@ant-design/icons';
import { InstituicaoResponse, TableInstituicao } from '../../interfaces/Instituicao';

interface Iprops {
  instituicoes: InstituicaoResponse[];
  atualizaTela:number;
  setAtualizaTela:Function;
  handleDelete:(evt:any)=>void;
  aux:TableInstituicao[];
  setAux:Function;
}

export default function TableInstituicaoDados( {instituicoes, atualizaTela, setAtualizaTela, handleDelete, aux, setAux}:Iprops ) {

  const [ visibleEdit, setVisibleEdit ] = useState<boolean>(false);
  const [ visibleAdd, setVisibleAdd ] = useState<boolean>(false);
  const [ idInstituicao, setIdInstituicao ] = useState<number>();
  const [ flgEdit, setFlgEdit ] = useState<number>(0);
  const { t } = useTranslation();

  const columns = [
    { title: "Id", dataIndex: "key" }, 
    {
      title: "Nome Instituição",
      dataIndex: "nome"
    },
    {
      title: "Cidade",
      dataIndex: "cidade"
    },
    {
      title: "Contato principal",
      dataIndex: "contato"
    },
    {
      title: 'Operações',
      dataIndex: 'operation',
      render: (text:string, record:any) =>
        true ? (
          <div className="container-operacoes">
            <Popconfirm title="Tem certeza que deseja deletar?" onConfirm={() => handleDelete(record.key)}>
              <a href='#/' className="bt-operacao" title="deletar"><DeleteOutlined /></a>
            </Popconfirm>
            <a href='#/' key={`edit${record.key}`} title="editar" onClick={() => handleEditarVisualizar(record.key,1)} className="bt-operacao"><EditOutlined /></a>
            <a href='#/' key={`visu${record.key}`} title="visualizar" onClick={() => handleEditarVisualizar(record.key,0)} className="bt-operacao"><EyeOutlined /></a>
          </div>
        ) : null,
    },
  ];

  const handleEditarVisualizar = (evt:any, flg:any) => {
    setVisibleEdit(true);
    setIdInstituicao(evt);
    setFlgEdit(flg);  
  };
  

  useEffect(() => {
    let a:TableInstituicao[] = [];
    instituicoes.map( instituicoes => 
      a.push({
        "key": `${instituicoes.id}`,
        "nome": `${instituicoes.nome}`,
        "cidade": `${instituicoes.enderecoDTO.cidade}`,
        "contato": `${instituicoes.contatoDTO.contatoUm}`
      })
    );
    setAux(a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[instituicoes, atualizaTela]);
  
  return (
    <div className='container-lista-consulta'>
      <a key='add' href='#/' onClick={() => {setVisibleAdd(true)}} className='bt-geral bt-cadastro-consulta' >
        {t('instituicoes.btAdd')}
      </a>
      {aux !== [] && <Table columns={columns} dataSource={aux} pagination={{ pageSize: 7 }}/>}
      <ModalAddInstituicao atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />
      <ModalVisualizarEditarInstituicao atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} idInstituicao={idInstituicao} visibleEdit={visibleEdit} setVisibleEdit={setVisibleEdit} flgEdit={flgEdit} />
    </div>
  )
}