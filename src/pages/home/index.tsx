import React, { useEffect, useState } from 'react';
import { Layout, Col} from 'antd';
import  Header  from '../../components/header';
import  Footer  from '../../components/footer';
import MenuAtual from '../../components/menu';
import TableListaRestricoes from '../../components/tableListaRestricoes';
import AlergiaOuRestricoesApi from '../../models/alergiaOuRestricoesApi';

const restricoesApi = new AlergiaOuRestricoesApi();
const auth = localStorage.getItem("token-gerenciador-security");

const { Content } = Layout;

const Home: React.FC = () => {
  const [ collapsed2, setCollapsed2 ] = useState(true);
  const [ restricoes, setRestricoes ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);

  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };
  const [ aux, setAux ] = useState([]);

  useEffect(()=>{
    restricoesApi.buscarAlergiaOuRestricoes(auth)
      .then( resp => {
        setRestricoes(resp.data)} );
  },[setRestricoes, atualizaTela]);


  const handleDelete = (evt: any) => {
    // console.log(evt)
    // restricoesApi.removerConsulta(evt.key, auth).then( resp => {
    //   if( resp.status === 200 ){
    //     setAux(resp.data.filter( (item) => item.key !== evt ) );
    //     openNotificationWithIcon("success", 'Exclusão', 'Restrição excluída com sucesso!');
    //     let auxAtualiza = atualizaTela + 1;
    //     setAtualizaTela(auxAtualiza);
    //   }
    // },(error) => { openNotificationWithIcon('error', 'Não foi possivel', 'Não foi possivel realizar a exclusão!'); });
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>Anotações Importantes:</h2>
            </Col>
            <Col xs={{span:24}}>
                {restricoes !== [] && <TableListaRestricoes aux={aux} setAux={setAux} handleDelete={handleDelete}  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} restricoes={restricoes} setRestricoes={setRestricoes}/>}
            </Col>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  )
}

export default Home;