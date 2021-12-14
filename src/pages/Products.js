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
      name: "",
      cover: mockImgProduct(1),
      price: 0,
      status: "",
      description: "",
      priceSale: 0,
      id: 0,
      isActive: true,
      quantity: 0,
    },
  ]);
  function fetchProductsHandler() {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };

    console.log("inside products get request");
    console.log(productAPI);
    axios(productAPI, { headers })
      .then((res) => {
        const response = res.data;

        console.log(response);
        setProductList(response);
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
