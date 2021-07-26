import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Col, Layout } from 'antd';
import Header from '../../components/header';
import Footer from '../../components/footer';
import MenuAtual from '../../components/menu';
import TableTipoExame from '../../components/tableTipoExame';
import { buscarTodosExames } from '../../controllers/exameApi';
import { DadosExameResponse } from '../../interfaces/Exame';

const { Content } = Layout;

const TipoExame: React.FC = () => {

  const [ exames, setExames ] = useState<DadosExameResponse[]>([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  const [ collapsed2, setCollapsed2 ] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const getExames = useCallback(async () => {
    try{
      const response = await buscarTodosExames();
      setExames(response);
    } catch(error) {
      notifyError("Erro ao carregar seus exames!")
    }
  },[notifyError]);

  useEffect(()=>{
    getExames();
    // eslint-disable-next-line
  },[atualizaTela]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>Exames cadastrados:</h2>
            </Col>
            <Col xs={{span:24}}>
                {exames !== [] && <TableTipoExame atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} exames={exames}/>}
            </Col>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  )
}

export default TipoExame;