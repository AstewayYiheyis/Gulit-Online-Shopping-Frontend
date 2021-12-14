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
import './Order.css'

// ----------------------------------------------------------------------

export default function AddressForm() {
    const APIs = useContext(APIConfig);
    const addressAPI = APIs.orderAPI;

    //const userAPI = "http://172.19.143.222:8080/users/";
    console.log(addressAPI);
    const navigate = useNavigate();

    const RegisterSchema = Yup.object().shape({
        streetAddress: Yup.string()
            .min(2, "Too Short!")
            .required("Street Name required"),
        city: Yup.string()
            .required("City is required"),
        zipCode: Yup.string()
            .min(5, "Zip Code must have 5 digits")
            .max(5, "Zip Code must have 5 digits")
            .required("Zip Code is required"),
    });

    const formik = useFormik({
        initialValues: {
            streetAddress: "",
            address2: "",
            city: "",
            zipCode: "",
            state: ""
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            const headers = {
                "Access-Control-Allow-Origin": "*",
            };

            console.log("inside user registration-POST request");

            console.log(addressAPI);

            const data = {
                streetAddress: formik.values.streetAddress,
                address2: formik.values.address2,
                city: formik.values.city,
                zipCode: formik.values.zipCode,
                state: formik.values.state
            };

            axios
                .post(addressAPI, data, { headers })
                .then((res) => {
                    const response = res.data;
                    if (
                        response == null ||
                        response == "") {
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
    const link = "https://m.media-amazon.com/images/I/6192pstcX0L._AC_UY395_.jpg";


    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <img src={link} alt="order"></img>
                    
                    <div>
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
                    </div>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
