import { useCallback, useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { editarTipoExame } from '../../controllers/tipoExameApi';
import { toast } from 'react-toastify';
import { TipoExameResponse } from '../../interfaces/TipoExame';

interface Iprops {
  atualizaTela:number;
  setAtualizaTela:Function;
  tipoExames:TipoExameResponse[];
  handleDelete:(evt:any)=>void;
}

interface TableTipoExame {
  key: any;
  nome: any;
  quantidade: any;
}

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

export default function TableListaTipoExame( {atualizaTela, setAtualizaTela, tipoExames, handleDelete}:Iprops ) {
  const [ aux, setAux ] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState<TableTipoExame[]>([]);
  const [editingKey, setEditingKey] = useState('');

  const notifyError = useCallback((texto:string) => {
    toast.error(texto);
  },[])

  const notifySucess = useCallback((texto:string) => {
      toast.success(texto);
  },[])

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
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

  const save = async (key: any) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        setData(newData);
        setEditingKey('');
      }

      await editarTipoExame(key.key, row.nome);
      setAtualizaTela(atualizaTela + 1);
      notifySucess("Tipo de exame editado com sucesso!");
    } catch (errInfo) {
      notifyError("Não foi possível realizar a edição!");
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
      title: 'Nome Exame',
      dataIndex: 'nome',
      width: '50%',
      editable: true,
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      width: '10%',
      editable: false,
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
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href='/'>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditOutlined className="bt-operacao"/>
            </Typography.Link >
            <Popconfirm title="Deseja realmente excluir?" onConfirm={() => handleDelete(record)}>
            <Typography.Link title="Tem certeza que deseja deletar?">
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
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === 'id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
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

  useEffect(()=>{
    let a = [] as any;
    tipoExames !== [] && tipoExames.map( tipoExame => {
      return a.push({
        "key": tipoExame.id,
        "nome": `${tipoExame.nomeExame}`,
        "quantidade": `${tipoExame.quantidade}`
      })
    } );
    setAux(a);
  },[tipoExames]);

  return (
    <div className='container-lista-consulta'>
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