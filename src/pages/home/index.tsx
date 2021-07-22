import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Col} from 'antd';
import  Header  from '../../components/header';
import  Footer  from '../../components/footer';
import MenuAtual from '../../components/menu';
import TableListaRestricoes from '../../components/tableListaRestricoes';
import { useTranslation  } from 'react-i18next';
import { listar } from '../../services/alergiaRestricaoApi';
import { AlergiaRestricao } from '../../interfaces/AlergiaRestricao';
import {toast} from "react-toastify";

const { Content } = Layout;

const Home: React.FC = () => {
  const [ collapsed2, setCollapsed2 ] = useState(true);
  const [ restricoes, setRestricoes ] = useState<AlergiaRestricao[]>([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  const { t } = useTranslation();

  const notify = useCallback(() => {
    toast.error(t('errors.login'));
  },[t])

  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };
  const [ aux, setAux ] = useState([]);

  const listagemRestricoes = useCallback(async () => {
    try {
      const respo: AlergiaRestricao[] = await listar();
      setRestricoes(respo);
    } catch (error) {        
        notify();
    }
 },[notify]);

  useEffect( () => {
    listagemRestricoes();
    // eslint-disable-next-line
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
              <h2 className='titulo-consulta'>{t('restricoes.title')}</h2>
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