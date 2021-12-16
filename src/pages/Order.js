import * as Yup from "yup";
import { useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate, Link } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { APIConfig } from "src/store/Api-Config";
import './Order.css'

// ----------------------------------------------------------------------

export default function AddressForm() {
    const APIs = useContext(APIConfig);
    const productAPI = APIs.productAPI;
    const [products, setProducts] = useState([]);

    console.log(productAPI);

    function GetProduct() {
        axios(productAPI)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err.message));
    }

    useEffect(GetProduct, []);
    console.log(products);

    const rproduct = products.map(product => {
        return (<Stack spacing={3} className="orderbox">
            <Stack direction={{ xs: "column", sm: "row" }} spacing={10} className="eachorderbox">
                <img src={`/static/mock-images/products/product_${product.id}.jpg`} alt={product.name} />
                <p>Quantity:{product.quantity} </p>
                <p>Product Name:{product.name} </p>
                <div className="orders-list-options">
                    <div>
                        <Link to="/checkout">
                            <Button variant="contained">Order Again</Button>
                        </Link>
                    </div>

                    <div><Link to="/product-review:product.id"><Button variant="contained"> Write a product review </Button></Link></div>
                    <div><Link to="/"><Button variant="contained"> Return or replace item </Button></Link></div>
                </div>
            </Stack>
        </Stack>)
    })




    return (
        <div>
            <h1>Orders List</h1>
            {rproduct}
        </div>
    );
}
