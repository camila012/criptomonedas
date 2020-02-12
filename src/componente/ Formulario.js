import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import useMoneda from '../hooks/ useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';

const Boton = styled.input `
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
width: 100%;
color:#fff;
background-color: #0c7b93;
transition: background-color .3 ease;
border-radius:50px;

&:hover{
  background-color: #326AC0;
}

`;

const Formulario = ({guardarMoneda, guardarCriptoMoneda}) => {
  
  
  //error
  const[error, guardarError]=useState(false);
  
  
  //lisatdo de criptomonedas 
  const[listacripto, guardarCriptoMonedas]= useState ([])
  
  const MONEDAS=[
    {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
    {codigo: 'MXN', nombre: 'Peso Mexicano'},
    {codigo: 'EUR', nombre: 'Euro'},
    {codigo: 'GBP', nombre: 'Libra Esterlina'},
    {codigo: 'COD', nombre: 'Peso Colombiano'}
    
  ]
  
  //utilizar useMoneda
  const [ moneda, SelectMonedas] = useMoneda('Elige tu Moneda','',MONEDAS);
  //utilizar useCriptomoneda
  const [criptomoneda,SeletCripto] = useCriptomoneda ('Elige tu Criptomoneda', '' , listacripto);
  
  
  
  
  
  //ejecutar llamdo a la API
  useEffect (() => {
    
    const consultarAPI = async () => {
      
      
      const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      
      const resultado = await axios.get(url);
      
      guardarCriptoMonedas(resultado.data.Data);
    }
    consultarAPI();
  }, []);
  
  //cuando el usuario hace submit
  const cotizarMoneda = e => {
    e.preventDefault();
    
    //validar si ambos campos estan llenos 
    if (moneda===''||criptomoneda==='') {
      guardarError(true);
      return;
    }
    //pasa los datod al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptoMoneda(criptomoneda);
    
    
    
  }
  
  
  
  return ( 
    
    <form
    onSubmit={cotizarMoneda}
    > 
    {error ? <Error mensaje =" OOPS!"/> : null}
    <SelectMonedas/>
    
    <SeletCripto/>
    
    <Boton
    type="submit"
    value="Calcular"
    />
    </form>
    );
  }
  
  Formulario.propTypes = {
    guardarCriptoMoneda: PropTypes.func.isRequired,
    guardarMoneda: PropTypes.func.isRequired}
    
    export default Formulario;