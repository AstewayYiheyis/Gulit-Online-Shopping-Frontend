import React, { useState } from 'react';

// scroll bar
import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

//
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import { APIConfig } from "./store/Api-Config";

 

// ----------------------------------------------------------------------

const base = "http://172.19.143.222:8080/";
 



ReactDOM.render(




    <HelmetProvider>
      <BrowserRouter> 
     <APIConfig.Provider   value={
         {
      ProductAPI: base + "products/",
      CardAPI: base + "cart/",
      orderAPI: base + "order/",
    }
    }
  >

        <App />
         </APIConfig.Provider>
       
      </BrowserRouter>
    </HelmetProvider>,
 
     
   
  document.getElementById("root")
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
