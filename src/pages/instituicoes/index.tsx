import React, { useEffect, useState, useCallback } from 'react';
import { Col, Layout } from 'antd';
import { toast } from 'react-toastify';
import  Header  from '../../components/header';
import  Footer  from '../../components/footer';
import MenuAtual from '../../components/menu';
import TableInstituicaoDados from '../../components/tableInstituicaoDados';
import { buscarInstituicoes, deletarInstituicao } from '../../controllers/instituicaoApi';
import { InstituicaoResponse, TableInstituicao } from '../../interfaces/Instituicao';

const { Content } = Layout;

const Instituicoes: React.FC = () => {
  const [ instituicoes, setInstituicoes ] = useState<InstituicaoResponse[]>([]);
  const [ atualizaTela, setAtualizaTela ] = useState<number>(0);
  
  const notifyError = useCallback((texto:string) => {
    toast.error((`Erro operação ${texto}!`));
  },[])

  const notifySucess = useCallback((texto:string) => {
      toast.success((`${texto} com sucesso!`));
  },[])

  const [ aux, setAux ] = useState<TableInstituicao[]>([]);

  const getInstituicoes = useCallback(async () => {
    try{
      const response = await buscarInstituicoes();
      setInstituicoes(response)
    } catch(error){
      notifyError("listagem de instituições")
    }
  },[notifyError]);

  useEffect(()=>{
    getInstituicoes();
    // eslint-disable-next-line
  },[setInstituicoes, atualizaTela]);

  const handleDelete = useCallback(async (evt) => {
    try{
      await deletarInstituicao(evt);
      setAux(aux.filter( (item) => item.key !== evt ) );
      notifySucess("Instituição excluída")
    } catch(error){
      notifyError("Não foi possivel', 'Não foi possivel realizar a exclusão!")
    }
  },[aux, setAux, notifySucess, notifyError]);

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>Instituições:</h2>
            </Col>
            <Col xs={{span:24}}>
                {instituicoes !== [] && <TableInstituicaoDados aux={aux} setAux={setAux} handleDelete={handleDelete}  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} instituicoes={instituicoes}/>}
            </Col>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  )
}

export default Instituicoes;