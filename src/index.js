import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F6F6F6' // silver-white, used for background
    },
    secondary: {
      main: "#29648A" // bluish-green
    },
    tertiary: {
      main: "#DDDDDF" // gray
    },
    quarternary: {
      main: "f7f7f7" // off-white
    },
    quinary: {
      main: "F1F1F1" // light gray
    },
    senary: {
      main: "#edbb3d" // Orange
    }
  }
})

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
