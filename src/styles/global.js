import {createGlobalStyle} from 'styled-components';
export default createGlobalStyle`

  body{
    -webkit-font-smoothing: antialiased;
  }
  body, input, button{
    font: 16px Roboto, sans-serif; 
  }
  button{
    cursor:pointer;
  }
`;