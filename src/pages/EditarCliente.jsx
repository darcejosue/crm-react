import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom";

export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteId);
    if(Object.values(cliente).length === 0){
        throw new Response('',{
            status:404,
            statusText: 'No hay resultados'
        })
    }
    return cliente
}

export async function action({request, params}){

    const formData = await  request.formData();
    const datos = Object.fromEntries(formData);
    const errores = [];
    const email = formData.get('email');
  
    //validaciones
    if(Object.values(datos).includes('')){
      errores.push('Todos los campos son obligatorios')
    }
  
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)){
      errores.push('El email no es valido');
    }
  
    //Retornar si hay errores
    if(Object.keys(errores).length){
      return errores
    }
    //console.log(formData.get('nombre'));
    //actualizar el cliete
    await actualizarCliente(params.clienteId, datos);
    return redirect('/');

  }

export const EditarCliente = () => {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();
    return (
        <>
          <h1 className="font-black text-4xl text-blue-900 ">Editar Cliente</h1>
          <p className="mt-3">
            A continuación, modifique los datos que desea realizar
          </p>
    
          <div className="flex justify-end">
            <button
              className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
              onClick={() => navigate(-1)}
            >
              volver
            </button>
          </div>
          <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
            {errores?.length && 
            errores.map((error, i)=> (<p className="bg-red-600 uppercase text-center font-bold text-lg text-white mb-5 p-4" key={i}>{error}</p>))}
            <Form 
            method='post'
            noValidate>
              <Formulario 
              cliente={cliente}/>
              <input
                type="submit"
                className="mt-5 w-full bg-blue-800 uppercase font-bold text-white text-lg"
                value="Registrar Cliente"
              />
            </Form>
          </div>
        </>
      );
}
