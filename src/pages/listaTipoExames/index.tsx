import React, { useEffect, useState } from 'react';
import { Col, Layout } from 'antd';
import Header  from '../../components/header';
import Footer  from '../../components/footer';
import TableListaTipoExame from '../../components/tableListaTipoExame';
import MenuAtual from '../../components/menu';
import { useCallback } from 'react';
import { buscarTodosTipoExames, removerTipoExame } from '../../controllers/tipoExameApi';
import { TipoExameResponse } from '../../interfaces/TipoExame';
import { toast } from 'react-toastify';

const { Content } = Layout;

const ListaTipoExames: React.FC = () => {

  const [ tipoExames, setTipoExames ] = useState<TipoExameResponse[]>([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  const [ collapsed2, setCollapsed2 ] = useState(true);

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const notifySucess = useCallback((texto:string) => {
      toast.success(texto);
  },[])

  const getTodosTiposExames = useCallback(async () => {
    try{
      const response = await buscarTodosTipoExames();
      setTipoExames(response)
    }catch(error){
      notifyError('Erro ao listar os tipos de exames existentes!')
    }
  }, [notifyError]);

  const handleDelete = useCallback(async (evt) => {
    try{
      await removerTipoExame(evt.key);
      setAtualizaTela(atualizaTela + 1);
      notifySucess('Todos os exames do Tipo exame selecionado, foram excluídos com sucesso!');
    } catch {
      notifyError('Não foi possivel realizar a exclusão!');
    }
  }, [notifyError,notifySucess, atualizaTela]);

  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };
  
  useEffect(()=>{
    getTodosTiposExames();
    // eslint-disable-next-line
  },[atualizaTela, setAtualizaTela]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>Listagem tipo exames:</h2>
            </Col>
            <Col xs={{span:24}}>
                {tipoExames !== [] && <TableListaTipoExame handleDelete={handleDelete}  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} tipoExames={tipoExames}/>}
            </Col>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  )
}

export default ListaTipoExames;
