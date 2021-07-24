import React, { useEffect, useState, useCallback } from 'react';
import { Col, Layout } from 'antd';
import { toast } from 'react-toastify';
import { useTranslation  } from 'react-i18next';
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
  const { t } = useTranslation();
  
  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const notifySucess = useCallback((texto:string) => {
      toast.success(texto);
  },[])

  const [ aux, setAux ] = useState<TableInstituicao[]>([]);

  const getInstituicoes = useCallback(async () => {
    try{
      const response = await buscarInstituicoes();
      setInstituicoes(response)
    } catch(error){
      notifyError(t('errors.instituicoes'))
    }
  },[notifyError, t]);

  const handleDelete = useCallback(async (evt) => {
    try{
      await deletarInstituicao(evt);
      setAux(aux.filter( (item) => item.key !== evt ) );
      notifySucess(t('instituicoes.msg.remove'))
    } catch(error){
      notifyError(t('errors.removeInstituicao'))
    }
  },[aux, setAux, notifySucess, notifyError, t]);

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  useEffect(()=>{
    getInstituicoes();
    // eslint-disable-next-line
  },[setInstituicoes, atualizaTela]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>{t('instituicoes.title')}</h2>
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