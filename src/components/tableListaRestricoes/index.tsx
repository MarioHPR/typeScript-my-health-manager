import React, { useCallback, useEffect, useState } from 'react';
import { Table, Button, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslation  } from 'react-i18next';
import { addNovo, editar } from '../../controllers/alergiaRestricaoApi';
import { toast } from 'react-toastify';
interface Iprops {
  aux?:any;
  setAux?:any;
  handleDelete?:any;
  atualizaTela?:any;
  setAtualizaTela?:any;
  restricoes?:any;
  setRestricoes?:any;
}

const TableListaRestricoes: React.FC<Iprops> = ({atualizaTela, setAtualizaTela, restricoes, setRestricoes, handleDelete}:Iprops) => {
  const [ aux, setAux ] = useState();
  const originData = [] as any;
  const { t } = useTranslation();

  const notifySucess = useCallback((texto: string) => {
    toast.success(t(`${texto} com sucesso!`));
  },[t])

  const notifyError = useCallback((texto: string) => {
    toast.error(t(`Erro ao ${texto}!`));
  },[t])

  useEffect(()=>{
    let a = [] as any;
    restricoes !== [] && restricoes.map( (restricao:any) => {
      return a.push({
        "key": restricao.id,
        "tipo": `${restricao.tipo}`,
        "descricao": `${restricao.descricao}`
      })
    } );
    setAux(a);
  },[restricoes]);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: any) => record.key === editingKey;

  const handleAdd = () => {
    let newCampo = { "id" : '-', "tipo": " ", "descricao" : " " };
    let arrayAux = [ ...restricoes, newCampo ];
    setRestricoes(arrayAux);
    newRow('-')
  };

  const newRow = (record:any) => {
    form.setFieldsValue({
      tipo: '',
      descricao: '',
      ...record,
    });
    setEditingKey(record);
  };

  const edit = (record:any) => {
    form.setFieldsValue({
      nome: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key:any) => {
    const row = await form.validateFields();
    if(key.key === '-') {
      try{
        await addNovo(row);
        setAtualizaTela(atualizaTela + 1);
        setEditingKey('');
        notifySucess("Adicionado");
      }catch(error){
        notifyError("adicionar!")
      }
    }
    else {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      }
      setData(newData);
      setEditingKey('');
      try{
        await editar(key.key, row);
        setAtualizaTela(atualizaTela + 1);
        notifySucess("Editado");
      }catch (errInfo) {
        notifyError("editar!")
      }
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: '10%',
      editable: false,
    },
    {
      title: 'Tipo restrição',
      dataIndex: 'tipo',
      editable: true,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      editable: true,
    },
    {
      title: 'Operações',
      dataIndex: 'operation',
      render: (_:any, record:any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href='#/'
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title={t('restricoes.perguntaCancelar')} onConfirm={cancel}>
              <a href='/'>{t('restricoes.btCancelar')}</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditOutlined  className="bt-operacao"/>
            </Typography.Link>
            <Popconfirm title={t('restricoes.pergunta')} onConfirm={() => handleDelete(record)}>
            <Typography.Link title={t('restricoes.perguntaConfirmar')}>
              <DeleteOutlined />
            </Typography.Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record:any) => ({
        record,
        inputType: col.dataIndex === 'id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }:any) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Campo ${title} é obrigatorio!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div className='container-lista-consulta'>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        {t('restricoes.btAdd')}
      </Button>
      {
        aux &&
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={aux}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      }
    </div>
  );
}

export default TableListaRestricoes;