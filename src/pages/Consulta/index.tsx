import React, { useEffect, useState } from 'react';
import { Col, Layout } from 'antd';
import Header from '../../components/header';
import Footer from '../../components/footer';
import MenuAtual from '../../components/menu';
import TableDados from '../../components/tableDados';
import { ConsultaResponse } from '../../interfaces/Consulta';
import { buscarConsultas } from '../../controllers/consultaApi';
import './style.css';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const { Content } = Layout;

const Consulta: React.FC = () => {
  const [ consultas, setConsultas ] = useState<ConsultaResponse[]>([]);
  const [ atualizaTela, setAtualizaTela ] = useState<number>(0);

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const getConsultas = useCallback(async () => {
    try{
      const response = await buscarConsultas();
      setConsultas(response);
    } catch(error) {
      notifyError("Erro ao listar as consultas!");
    }
  }, [setConsultas, notifyError]);

  useEffect(()=>{
    getConsultas();
    // eslint-disable-next-line
  },[setConsultas, atualizaTela]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>Consultas:</h2>
            </Col>
            <Col xs={{span:24}}>
                {consultas !== [] && <TableDados  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} consultas={consultas}/>}
            </Col>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  )
}

export default Consulta;
