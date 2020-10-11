import styled, {css} from 'styled-components';
import {shade} from 'polished';

export const Title = styled.h1`
  font-size: 48px;
  color: #3A3A3A;
  max-width: 450px;
  line-height: 56px;
  margin-top:80px;
`;

export const Form = styled.form`
  margin-top:40px;
  max-width: 700px;

  display:flex;

  input{
    flex:1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3A3A3A;
    border: 2px solid #ADADAD;
    border-right: 0;

    ${(props) => props.hasError && css`
      border-color: #c53030;
    `}

    &::placeholder{
      color: #a8a8b3;
    }
  }

  button{
    width: 210px;
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
  max-width: 700px;
  flex:1;
  height: 70px;
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