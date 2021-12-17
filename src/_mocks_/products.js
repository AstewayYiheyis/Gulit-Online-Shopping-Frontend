import React, { useContext, useState } from "react";
import axios from "axios";
import { APIConfig } from "src/store/Api-Config";
// utils
import { mockImgProduct } from "../utils/mockImages";
import { TokenService } from "src/storage.service";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const Products = () => {
  const APIs = useContext(APIConfig);
  const productAPI = APIs.productAPI;

  const [productList, setProductList] = useState([
    {
      id: 1,
      cover: mockImgProduct(0),
      name: "",
      price: 0,
      priceSale: 0,
      colors: ["#00AB55"],
      status: "",
    },
  ]);

  const headers = TokenService.getHeaderwithToken();

  axios(productAPI, { headers })
    .then((response) => {
      setProductList(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });

  //  console.log(productList);

  const productArray = Object.values(productList);

  return {
    productArray,
  };
};

export default Products;
