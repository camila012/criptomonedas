import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from  './componente/ Formulario';
import axios from 'axios';
import Cotizacion from './componente/Cotizacion';
import Spinner from './componente/Spinner';

const Contenedor = styled.div `
max-width: 900px;
margin: 0 auto;
@media (min-width:992px) {
  display: grid;
  grid-template-columns: repeat( 2, 1fr);
  column-gap: 2rem;
}

`;
const Imagen = styled.img`
max-width: 100%;
margin-top: 5rem;
`;

const Heading = styled.h1`
font-family: 'bebas neve', cursive;
color: #fff;
text-align:left;
font-size: 50px;
margin-bottom: 50px;
margin-top: 80px;

&::after {
  content:'';
  width:100px;
  height: 6px;
  background-color: #66A2FE;
  display:block;
}

`;

function App() {
  
  const [moneda, guardarMoneda]= useState('');
  const [criptomoneda,guardarCriptoMoneda]= useState('')
  const [resultado, guardarResultado]=useState({});
  const [cargando, guardarCargando]=useState(false)
  
  useEffect(() => {
    
    const cotizarCriptomoneda= async () => {
      //evitamos la ejecucion la primera vez
      if(moneda === '') return;
      
      //consultar la api para obtener la cotizacion
      const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda} `;
      
      const resultado = await axios.get(url);
      
      //mostrar el spinner
      guardarCargando(true);
      
      //ocultar el spinner y mostrar el resultado
      setTimeout(() =>{
        
        //cambiar el estado de carga
        guardarCargando(false)
        
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        
      }, 3000);
      
      
      
      
    }
    
    cotizarCriptomoneda();
  },[moneda,criptomoneda]);
  
  //mostrar spinner o resultado
  const componente = (cargando) ? <Spinner/> : <Cotizacion
  resultado = {resultado}
  />
  
  return (
    <Contenedor>
    <div>
    <Imagen
    src={imagen}
    alt="imagen cripto"
    />
    </div>
    <div>
    <Heading>Cotiza Criptomonedas al Instante</Heading>
    
    <Formulario
    guardarMoneda={guardarMoneda}
    guardarCriptoMoneda={guardarCriptoMoneda}
    />
    
    {componente}
    
    
    
    </div>
    
    
    </Contenedor>
    );
  }
  
  export default App;
  