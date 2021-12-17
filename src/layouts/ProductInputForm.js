import * as Yup from "yup";
import { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, TextareaAutosize } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { APIConfig } from "src/store/Api-Config";
import { TokenService } from "src/storage.service";

// ----------------------------------------------------------------------

export default function ProductInputForm() {
  const APIs = useContext(APIConfig);
  const productAPI = APIs.productAPI;

  const headers = TokenService.getHeaderwithToken();

  console.log(productAPI);
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required"),
    stockAmount: Yup.string().required("Amount in Stock is required"),
    price: Yup.string().required("Price is required"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      stockAmount: 0,
      price: 0.0,
      brand: null,
      category: null,
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      // const headers = {
      //   "Access-Control-Allow-Origin": "*",
      // };

      console.log("token is \n" + TokenService.getToken());

      console.log("inside user registration-POST request");

      console.log(productAPI);

      const data = {
        name: formik.values.productName,
        description: formik.values.description,
        isActive: true,
        quantity: formik.values.stockAmount,
        price: formik.values.price,
        orderItems: [],
        category: formik.values.category,
        brand: formik.values.brand,
        images: [],
        cartItems: [],
      };

      axios
        .post(productAPI, data, { headers })
        .then((res) => {
          const response = res.data;
          if (response == null || response == "") {
            alert("error happened during Product registry. try again ");

            navigate("product", { replace: true });
          } else {
            alert("Product registration is successful.");
            navigate("../products", { replace: true });

            return response;
          }
        })
        .catch((error) => {
          console.log(error.message);
          alert("error happened Product registration. Check your data first");
        });
      console.log(data);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Product Name"
              {...getFieldProps("productName")}
              error={Boolean(touched.productName && errors.productName)}
              helperText={touched.productName && errors.productName}
            />

            <TextField
              fullWidth
              label="Price"
              {...getFieldProps("price")}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            />
          </Stack>

          <TextareaAutosize
            fullWidth
            placeholder="Product Description"
            area-label="Product Description"
            style={{ minHeight: 100 }}
            {...getFieldProps("description")}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <TextField
            fullWidth
            label="Stock Amount"
            {...getFieldProps("stockAmount")}
            error={Boolean(touched.stockAmount && errors.stockAmount)}
            helperText={touched.stockAmount && errors.stockAmount}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Add Product
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
