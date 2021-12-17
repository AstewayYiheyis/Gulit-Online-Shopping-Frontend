import * as Yup from "yup";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// material
import { Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { APIConfig } from "src/store/Api-Config";
import { TokenService } from "src/storage.service";
import "./Order.css";
import { mockImgAvatar } from "src/utils/mockImages";
import _ from "lodash";
// ----------------------------------------------------------------------

export default function Order() {
  const navigate = useNavigate();

  const APIs = useContext(APIConfig);
  const orderAPI = APIs.orderAPI;

  const cartAPI = APIs.cartAPI;
  const cartItemUpdateAPI = APIs.cartItemUpdateAPI;
  const [products, setProducts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const headers = TokenService.getHeaderwithToken();
  function getOrders() {
    axios(cartAPI, { headers })
      .then((res) => {
        let updated = _.map(res.data, (data) => {
          return {
            id: data.cartItemId,
            avatarUrl: mockImgAvatar(data.product.id),
            name: data.product.name,
            quantity: data.quantity,
          };
        });

        setProducts(updated);
        console.log("carts");
        console.log(updated);
        console.log(res.data);
      })

      .catch((err) => console.log(err));
  }
  useEffect(getOrders, [updated]);

  //   function CancelOrderHandler() {
  //     axios
  //       .delete(cartItemUpdateAPI + product.id, { headers })
  //       .then((res) => navigate("../orders"))
  //       .catch((err) => console.log(err));
  //   }

  const rproduct = products.map((product) => {
    return (
      <Stack spacing={3} className="orderbox">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={10}
          className="eachorderbox"
        >
          <img
            src={`/static/mock-images/products/product_${product.id}.jpg`}
            alt={product.name}
          />
          <p>Quantity:{product.quantity} </p>
          <p>Product Name:{product.name} </p>
          <div className="orders-list-options">
            <div>
              <Link to={`../products/${product.id}/reviews`}>
                <Button variant="contained"> Write a product review </Button>
              </Link>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  console.log(
                    "trying to delete " + cartItemUpdateAPI + product.id
                  );
                  axios
                    .delete(cartItemUpdateAPI + product.id, { headers })
                    .then((res) => {
                      alert("Product " + product.name + " removed succesully");
                      return setUpdated(!updated);
                    })
                    .catch((err) => console.log(err.message));
                }}
              >
                {" "}
                Cancel Order{" "}
              </Button>
            </div>
          </div>
        </Stack>
      </Stack>
    );
  });

  return (
    <div>
      <h1>Orders List</h1>
      {rproduct}
    </div>
  );
}
