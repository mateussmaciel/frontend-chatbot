import styled, {css} from 'styled-components';
import {shade} from 'polished';

export const Container = styled.div`
  height: 95vh;
  flex-direction: column;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
  max-width: 1700px;
`;



export const Form = styled.form`
margin-top:20px;
  max-width: 650px;  
  display:flex;
  align-self: flex-end;

  input{
    flex:1;
    height: 66px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3A3A3A;
    border: 2px solid #ADADAD;
    border-right: 0;
    width: 550px;

    ${(props) => props.hasError && css`
      border-color: #c53030;
    `}

    &::placeholder{
      color: #a8a8b3;
    }
  }

  button{
    width: 210px;
    height: 70px;
    background: #04D361;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #FFF;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover{
      background: ${shade(0.2,'#04D361' )}
    }
  }

`;

export const Messages = styled.div`

  margin-top:10px;
  
  flex:1;
  margin-left: 21px;
  height: auto;
  width:550px;
  border-radius: 5px 5px 5px 5px;
  color: #3A3A3A;
  padding: 24px 24px;
`;

export const User = styled(Messages)`
  background: #04D361;
  color: #000;
  text-align: end;
  
`;

export const Watson = styled(Messages)`
  background: #056CF2;
  color: #000;
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;