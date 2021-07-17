import { Layout, Menu, Divider} from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PieChartOutlined,
  FileOutlined
} from '@ant-design/icons';

export default function MenuAtual() {
  const { Sider } = Layout;
  const [ collapsed, setCollapsed ] = useState();
  const onCollapse = (collapsed:any) => {
    setCollapsed( collapsed );
  };

  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Gerenciador
          </Menu.Item>
          <Divider />
          <Menu.Item key="9" icon={<FileOutlined />}>
              <Link className='' to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
              <Link className='' to='/tipoExames'>Exame</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
              <Link className='' to='/consultas'>Consulta</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
              <Link className='' to='/instituicoes'>Instituições</Link>
          </Menu.Item>      
          <Menu.Item key="9" icon={<FileOutlined />}>
              <Link className='' to='/listaTipoExames'>Tipo de exames</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}