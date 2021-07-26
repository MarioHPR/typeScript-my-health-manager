import { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined ,EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ModalAddExame  from '../modalAddExame';
import ModalExame from '../modalVisualizarExame';
import { removerExame, buscarExamePorId } from '../../controllers/exameApi';
import { DadosExameResponse } from '../../interfaces/Exame';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

interface Iprops {
  exames: DadosExameResponse[];
  setAtualizaTela: Function;
  atualizaTela: number;
}

interface TableExames {
  key:number;
  tipoExame:string;
  dataExame:string;
  instituicao:string;
}

export default function TableTipoExame( { exames, setAtualizaTela, atualizaTela }: Iprops ) {

  const [ aux, setAux ] = useState<TableExames[]>([]);
  const [ idExame, setIdExame ] = useState<number>();
  const [ visible, setVisible ] = useState<boolean>(false);
  const [ visibleModalGeral, setVisibleModalGeral ] = useState<boolean>(false);
  const [flgEditarVisualizar, setFlgEditarVisualizar ] = useState<number>(0);

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[]);

  const notifySuccess = useCallback((texto:string) => {
    toast.success(texto);
  },[]);

  const columns = [
    { title: "Id", dataIndex: "key" }, 
    {
      title: "Exame",
      dataIndex: "tipoExame"
    },
    {
      title: "Data do exame",
      dataIndex: "dataExame"
    },
    {
      title: "Instituição",
      dataIndex: "instituicao"
    },
    {
      title: 'Operações',
      dataIndex: 'operation',
      render: (text:any, record:any
        ) =>
        true ? (
          <div className="container-operacoes">
            <Popconfirm title="Tem certeza que deseja deletar?" onConfirm={() => handleDelete(record.key)}>
              <a href='#/' className="bt-operacao" title="deletar"><DeleteOutlined /></a>
            </Popconfirm>
            <a href='#/' title="editar" onClick={() => handleEditarVisualizar(record.key, 1)} className="bt-operacao"><EditOutlined /></a>
            <Link to={`#/`} title="visualizar" onClick={() => handleEditarVisualizar(record.key, 0)} className="bt-operacao"><EyeOutlined /></Link>
          </div>
        ) : null,
    },
  ];

  const handleDelete = useCallback(async (evt) => {
    try{
      await removerExame(evt);
      setAux(aux.filter( (item) => item.key !== evt ) );
      notifySuccess("Exame excluído com sucesso!");
    } catch(error){
      notifyError("Não foi possivel realizar a exclusão!");
    }
  },[aux, notifySuccess, notifyError]);

  const handleEditarVisualizar = useCallback(async (evt, flg) => {
    try{
      const response = await buscarExamePorId(evt);
      setIdExame(response.id);
      setVisibleModalGeral(true);
      setFlgEditarVisualizar(flg);
    } catch(error){
      notifyError("Consulta não encontrada!")
    }
    
  },[notifyError, setIdExame, setVisibleModalGeral, setFlgEditarVisualizar]);

  useEffect(() => {
    let arrayAux:TableExames[] = [];
    exames.map( tipo => 
      arrayAux.push({
        "key": tipo.id,
        "tipoExame": `${tipo.nomeExame}` || '--',
        "dataExame": new Date(tipo.dataExame).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) || '--',
        "instituicao": `${tipo.dadosInstituicao.nome}` || '--'
      })
    );
    setAux(arrayAux);
  },[exames]);
  
  return (
    <div className='container-lista-consulta'>
      <a href='#/' onClick={() => {setVisible(true)}} className='bt-geral bt-cadastro-consulta' >
        Adicionar novo exame
      </a>
      {aux !== [] && <Table columns={columns} dataSource={aux} pagination={{ pageSize: 10 }}/>}
      <ModalAddExame atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} visibleAdd={visible} setVisibleAdd={setVisible}/>
      <ModalExame atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela}  idExame={idExame} visibleModal={visibleModalGeral} setVisibleModal={setVisibleModalGeral} editarVisualizar={flgEditarVisualizar} />
    </div>
  )
}