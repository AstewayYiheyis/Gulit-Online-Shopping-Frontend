import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { APIConfig } from "src/store/Api-Config";

// utils
import { mockImgProduct } from "../utils/mockImages";

import { useFormik } from "formik";
// material
import { Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from "../components/_dashboard/products";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const APIs = useContext(APIConfig);
  const productAPI = APIs.ProductAPI;


  const [productList, setProductList] = useState([
    {
      name: "Nike Zoom 12",
      cover: mockImgProduct(1),
      price: 142.2,
      status: "",
      description: "Nike Summer shoes confrtable",
      priceSale: 123,
      id: 1,
      isActive: true,
      quantity: 15,
    },
  ]);
  function fetchProductsHandler() {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };

    console.log("inside get request");
    console.log(productAPI);
    axios(productAPI, { headers })
      .then((res) => {
        const response = res.data;

        console.log(response);
        setProductList(response);

        // {
        //   id: response.id,
        //   cover: mockImgProduct(1),
        //   name: response.name,
        //   price: response.price,
        //   priceSale: response.price,
        //   colors: ["#00AB55"],
        //   status: response.isActive === true ? null : "Not Available",
        // }

        return productList;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  useEffect(fetchProductsHandler, []); // This will be fetched when mounted

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={productList} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
