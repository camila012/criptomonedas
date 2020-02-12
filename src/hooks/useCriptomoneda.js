import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled';

const Label = styled.label `
font-family: 'Bebas Neve', cursive;
color: #fff;
text-transform: uppercase;
font-weight: 2.4rem;
margin-top: 2rem;
display: block;

`;


const Select = styled.select`
width: 100%;
display: block;
padding: 1rem;
-webkit-appearance: none;
border-radius: 10px;
border: none;
font-size: 1.2rem;


`;

const useCriptomoneda = (label,stateInicial,opciones) => {

  //console.log(opciones);
  
  //state de custom hook
  const[state, actualizarState]= useState(stateInicial);
  
  const SeletCripto= () => ( 
    <Fragment>
    <Label>{label} </Label>
    <br/>
    <Select
    onChange={ e => actualizarState( e.target.value)} value={state}
    >
    
    <option value="">Selecionar</option>
    {opciones.map(opcion => (
      <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
      
      ))}
      
      </Select>
      
      </Fragment>
      );
      
      //retomar state, interfaz y fin que modifica el state
      return [state,SeletCripto,actualizarState]
    }
    
    export default useCriptomoneda;

