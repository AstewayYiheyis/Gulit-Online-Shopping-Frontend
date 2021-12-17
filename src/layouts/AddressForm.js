import * as Yup from "yup";
import { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { APIConfig } from "src/store/Api-Config";
import { TokenService } from "src/storage.service";

// ----------------------------------------------------------------------

export default function AddressForm() {
  const APIs = useContext(APIConfig);
  const addressAPI = APIs.addressAPI;

  console.log(addressAPI);
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    streetAddress: Yup.string()
      .min(2, "Too Short!")
      .required("Street Name required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string()
      .min(5, "Zip Code must have 5 digits")
      .max(5, "Zip Code must have 5 digits")
      .required("Zip Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      zipCode: "",
      state: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const headers = TokenService.getHeaderwithToken();

      console.log("inside user registration-POST request");

      console.log(addressAPI);

      const data = {
        streetAddress1: formik.values.streetAddress,
        streetAddress2: formik.values.address2,
        city: formik.values.city,
        zipCode: formik.values.zipCode,
        state: formik.values.state,
      };

      axios
        .post(addressAPI, data, { headers })
        .then((res) => {
          const response = res.data;
          if (response == null || response == "") {
            alert("error happened during Address registry. try again ");

            navigate("/addresses", { replace: true });
          } else {
            alert("Address registration is successful.");
            navigate("/dashboard", { replace: true });

            return response;
          }
        })
        .catch((error) => {
          console.log(error.message);
          alert("error happened Address registration. Check your data first");
        });
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
              label="Street Address*"
              {...getFieldProps("streetAddress")}
              error={Boolean(touched.streetAddress && errors.streetAddress)}
              helperText={touched.streetAddress && errors.streetAddress}
            />

            <TextField
              fullWidth
              label="Address 2"
              {...getFieldProps("address2")}
              error={Boolean(touched.address2 && errors.address2)}
              helperText={touched.address2 && errors.address2}
            />
          </Stack>

          <TextField
            fullWidth
            label="City*"
            {...getFieldProps("city")}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />

          <TextField
            fullWidth
            label="Zip code*"
            {...getFieldProps("zipCode")}
            error={Boolean(touched.zipCode && errors.zipCode)}
            helperText={touched.zipCode && errors.zipCode}
          />

          <TextField
            fullWidth
            label="State*"
            {...getFieldProps("state")}
            error={Boolean(touched.state && errors.state)}
            helperText={touched.state && errors.state}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Add Address
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
