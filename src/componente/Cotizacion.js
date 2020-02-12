import React from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const ResultadoDiv= styled.div `
color: #fff;
font-family: Arial, Helvetica, sans-serif;
border-radius: 100%;
background-color:#0c7b93;
`;

const Info = styled.p `
font-size: 25px;

span {
  font-weight: bold;
}

`;

const Precio = styled.p `
font-size: 40px;
span {
  font-weight: bold;
  background-color: #fff;
  color: #000;
  
}

`


const Cotizacion = ({resultado} ) => {
 //si llega vacio no ejecuta nada , pero en caso contrario muestra el return
if (Object.keys(resultado).length === 0) return null;

console.log(resultado)

  return (
   <ResultadoDiv>
     <Precio>precio <span>{resultado.PRICE} </span></Precio>
     <Info>Precio mas alto del dia:<span>{resultado.HIGHDAY} </span></Info>
     <Info>Precio mas bajo del dia:<span>{resultado.LOWDAY} </span></Info>
     <Info>Variacion ultimas 24 horas:<span>{resultado.CHANGEPCT24HOUR} </span></Info>
     <Info>Ultima Actualizacio:<span>{resultado.LASTUPDATE} </span></Info>
   </ResultadoDiv>
      
    );
}
Cotizacion.propTypes = {
  resultado: PropTypes.object.isRequired,
}
export default Cotizacion;