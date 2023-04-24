import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  Form,
  Input,
  DatePicker,
  Typography,
  Col,
  Row,
  Divider,
  Table,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useForm, useWatch } from "antd/lib/form/Form";
import dataJSON from "../../datos/municipios.json"
import dataJSONcont from "../../datos/contable.json";
const { Title } = Typography;



const Actividades = () => {
  const [form] = Form.useForm(); //REFERANCIOMS AL FORMULARIO
  const { Option } = Select; //desglosar componentes u objetos json
  const [arrayActividades, setarrayActividades] = useState([]);
  const [arrayActividadesEsp, setarrayActividadesEsp] = useState([]);

  const [actividad,setActividad] = useState("");
  const [tipoAct, setTipoAct] = useState("");
  const [actMun, setActMun] = useState("");
  

  
  const eliminar=(llave)=> {
    //const arrayAuxiliar = arrayActividades; 
    const resultado = arrayActividades.filter( actividad => actividad.key != llave)
    setarrayActividades (resultado)
    //console.log("llave entrante ",llave)
  }

  const Tipo_act = Form.useWatch("Tipo_act", form);
 // const [lista, setLista] = useState([])


  const onFinish = (values) => {
    const datos= {actividad:values.actividad,
                  tipo_act:values.Tipo_act,
                  tipo_act2:values.Tipo_act2,
                  key: Math.random(),
                  fecha:new Date().toLocaleDateString(),
    }
    setarrayActividades([...arrayActividades,datos])
    console.log("Success:", values);
  };

  const columns = [
    {
      title: 'Actividades Diarias',
      dataIndex: 'actividad',
      key: 'actividad',
    },
    {
      title: 'Age',
      dataIndex: 'tipo_act',
      key: 'tipo_act',
    },
    {
      title: 'Address',
      dataIndex: 'tipo_act2',
      key: 'tipo_act2',
    },
    {
      title: 'fechaOK',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Opciones',
      key: 'opciones',
      render: (_, record) => (
                  <Button onClick={()=>eliminar(record.key)}>Eliminar</Button>        
      )
    },
  ];

  const onChangeAct = (e) =>{
    setTipoAct(e)
    console.log(e)
    setarrayActividadesEsp([])
    if(e=="Municipio"){
        setarrayActividadesEsp(
          dataJSON
          .sort((mun1,mun2)=>(mun1.nombre>mun2.nombre))
          .filter((mun) => (
            mun.clave == "13" || 
            mun.clave == "17" ||
            mun.clave == "18" ||
            mun.clave == "77" ||
            mun.clave == "43" ||
            mun.clave == "46" ||
            mun.clave == "54" ||
            mun.clave == "62" ||
            mun.clave == "69" ||
            mun.clave == "72")))
    }else if(e=="Contable"){
      setarrayActividadesEsp(dataJSONcont.map((e)=>e))
    }else if(e=="Admon"){
      setarrayActividadesEsp([{"clave":1, "nombre":"Opciones Administrtivas"}])
    }else if(e=="Otros"){
      setarrayActividadesEsp([{"clave":1, "nombre":"Sin Opciones"}])
    }
    
      //<Select.Option>Opciones Administrtivas</Select.Option>
       // <Select.Option>Sin Opciones</Select.Option>
    
  }
  
  return (
    <>
      <Form
        form={form}
        name="formulario"
        layout="vertical"
        labelCol={{
          span: 10,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Title level={3} direction="horizontal" align="center">
          REPORTE DE ACTIVIDADES
        </Title>
        <Form.Item
          name="fecha"
          label="Fecha"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <DatePicker />
        </Form.Item>

        <div className="row">
          <div className="col-md-3 col-sm-12">
            <Form.Item
              name="Tipo_act"
              label="Tipo de Actividad"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Select onChange={(e) => onChangeAct(e)}>       
                
                <Option value="Admon">Administrativos</Option>
                <Option value="Contable">Contables</Option>
                <Option value="Municipio">Municipios</Option>
                <Option value="Otros">Otros</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="col-md-3 col-sm-12">
            <Form.Item name="Tipo_act2" label="Actividad" rules={[{}]}>

              <Select onChange={(e)=>setActMun(e)}>
                {
                    arrayActividadesEsp.map((data)=>{
                      return <Select.Option key={data.clave}> {data.nombre} </Select.Option>
                    })
                }
              </Select>
            </Form.Item >
           </div>

           { tipoAct === "Municipio" && <div className="col-md-3 col-sm-12">
            <Form.Item name="Tipo_act3" label="Descripción" rules={[{}]} >
                 
                <Select disabled = {actMun == ""} >                  
                <Option value="cuenta">Cuenta</Option>
                <Option value="informe">Informe</Option>
                <Option value="obra">Obra</Option>
                <Option value="Otros2">Otros</Option>
                </Select>
               
            </Form.Item>
            </div>}
        </div>

        <Form.Item
          name="actividad"
          label="Actividades"
          rules={[{ required: true, message: "Campo requerido" }]}
        >
          <Input.TextArea onChange={(e) => setActividad(e.target.value)} style={{ width: "90%" }} size="large" />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Agregar actividad
        </Button>
      </Form>

      <Table dataSource={arrayActividades} columns={columns} />;
    </>
  );
};

export default Actividades;
