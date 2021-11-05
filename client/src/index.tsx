import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { configureStore } from './redux';
import { createAxiosInstance } from './config/axios';
import { ChakraProvider } from "@chakra-ui/react"
import EntriesSeedData from './config/seed-data/store-seed.json'
import { BrowserRouter } from "react-router-dom";
import theme from './utils/theme';

createAxiosInstance({
  baseURL: process.env.REACT_APP_API_URL as string,
  userToken: process.env.REACT_APP_USER_TOKEN as string
})

const store = configureStore({
  entries: EntriesSeedData
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
