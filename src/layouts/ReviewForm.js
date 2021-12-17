import * as Yup from "yup";
import { useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment, TextareaAutosize } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { APIConfig } from "src/store/Api-Config";
import { useParams } from "react-router-dom";
import { TokenService } from "src/storage.service";
import ProductDetail from "src/pages/ProductDetail";
// ----------------------------------------------------------------------

export default function ReviewForm(props) {
    const APIs = useContext(APIConfig);
    const productAPI = APIs.productAPI;
    const param = useParams();
    const reviewAPI = productAPI + param.id + "/" + APIs.reviewAPI;

    const [product, setProduct] = useState(null);

    console.log(reviewAPI);
    const navigate = useNavigate();
    console.log(reviewAPI + "add");

    const RegisterSchema = Yup.object().shape({
        title: Yup.string()
            .required("Title is required"),
        description: Yup.string()
            .min(10, "Too Short!")
            .required("Description is required"),
    });

    const headers = TokenService.getHeaderwithToken();

    // function GetProduct() {
    //     axios(productAPI + param.id)
    //         .then(res => {
    //             console.log("INSIDE RESPONSEEE")
    //             setProduct(res.data)
    //         })
    //         .catch(err => console.log(err.message));
    // }

    // useEffect(GetProduct, []);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: RegisterSchema,

        onSubmit: () => {
            console.log("inside user registration-POST request");

                const data = {
                    title: formik.values.title,
                    description: formik.values.description,
                    product: product
                };

                console.log(data);
                axios.post(reviewAPI, data, { headers })
                    .then((res) => {
                        const response = res.data;
                        if (
                            response == null ||
                            response == "") {
                            alert("error happened when Adding Review. try again ");
                        } else {
                            alert("Review Accepted successfully!.");
                            console.log(res.data);
                            navigate("/products", { replace: true });

                            return response;
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                        alert("error happened Address registration. Check your data first");
                    });
        }
    });

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <div><ProductDetail /></div>
                    <TextField
                        fullWidth
                        label="Title*"
                        {...getFieldProps("title")}
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                    />

                    <TextareaAutosize
                        fullWidth
                        label="Description*"
                        {...getFieldProps("description")}
                        aria-label="minimum height"
                        minRows={3}
                        style={{ width: 480, height: 300 }}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                    />

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Post Review
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
