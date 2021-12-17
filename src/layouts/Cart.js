import { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Chip,
  DialogTitle,
  Alert,
} from "@mui/material";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import { useNavigate } from "react-router-dom";
import Page from "src/components/Page";
import { APIConfig } from "src/store/Api-Config";
import IconButton from "src/theme/overrides/IconButton";
import { TokenService } from "src/storage.service";
import axios from "axios";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartRemoveAllItemsRemoveHandler = () => {
    cartCtx.removeAllItems();
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const navigate = useNavigate();

  const closeHandler = (e) => {
    e.preventDefault();
    navigate("../products");
  };
  const headers = TokenService.getHeaderwithToken();

  const APIs = useContext(APIConfig);
  const orderAPI = APIs.orderAPI;

  const buyerShippingAddAPI = APIs.buyerShippingAddAPI;
  const buyerBillingAddAPI = APIs.buyerBillingAddAPI;

  const [obShippingAddress, setShippingAddress] = useState({
    id: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    zipCode: "",
    state: "",
  });
  const [obBillingAddress, setBillingAddress] = useState({
    id: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    zipCode: "",
    state: "",
  });
  function getAddresses() {
    axios(buyerShippingAddAPI, { headers })
      .then((response) => {
        setShippingAddress(response.data);
        console.log(
          "buyer Shipping Address retrieved successfully" + obShippingAddress
        );
      })
      .catch((err) => {
        console.log("Error in getting buyer Shipping Address" + err.message);
      });

    axios(buyerBillingAddAPI, { headers })
      .then((response) => {
        setBillingAddress(response.data);
        console.log("buyer Billing Address retrieved successfully");
        console.log(obShippingAddress);

        console.log(
          "buyer Billing Address retrieved successfully" + response.data
        );
      })
      .catch((err) => {
        console.log("Error in getting buyer Billing Address" + err.message);
      });
  }

  useEffect(getAddresses, []);

  const orderHandler = () => {
    console.log("inside order handler LITems ordered");

    const obCartItems = [
      {
        quantity: 8,
        product: {
          id: 1,
        },
      },
      {
        quantity: 12,
        product: {
          id: 2,
        },
      },
    ];
    const orderData = {
      orderDateTime: "2021-12-16T23:08:06.854Z",
      shippingAddress: obBillingAddress,
      orderStatus: "ORDERED",
      billingAddress: obShippingAddress,
      orderItems: obCartItems,
    };
    console.log("order data ready");
    console.log(orderData);
    /*
    axios
      .post(orderAPI, orderData, { headers })
      .then((response) => {
        console.log("saved successfully");
        alert("ordered successfully");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
    console.log("after Delete");
    cartRemoveAllItemsRemoveHandler();
    console.log(cartCtx.items);

    navigate("../products");

*/
  };

  return (
    <Page title="Checkout | Minimal-UI">
      <Container>
        {hasItems && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                sx={{
                  "&:hover": {
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Shipping Address
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {obShippingAddress.streetAddress1}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {obShippingAddress.streetAddress2}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {obShippingAddress.city}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {obShippingAddress.zipCode} , {obShippingAddress.state}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box
                sx={{
                  borderRadius: 1,
                  "&:hover": {
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Billing Address
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {obBillingAddress.streetAddress1}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {obBillingAddress.streetAddress2}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {obBillingAddress.city}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {obBillingAddress.zipCode} , {obBillingAddress.state}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  "&:hover": {
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <div class="container py-5">
                  <div class="row mb-4">
                    <div class="col-lg-8 mx-auto text-center">
                      <h1 class="display-6">Bootstrap Payment Forms</h1>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6 mx-auto">
                      <div class="card ">
                        <div class="card-header">
                          <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                            <ul
                              role="tablist"
                              class="nav bg-light nav-pills rounded nav-fill mb-3"
                            >
                              <li class="nav-item">
                                {" "}
                                <a
                                  data-toggle="pill"
                                  href="#credit-card"
                                  class="nav-link active "
                                >
                                  {" "}
                                  <i class="fas fa-credit-card mr-2"></i> Credit
                                  Card{" "}
                                </a>{" "}
                              </li>
                              <li class="nav-item">
                                {" "}
                                <a
                                  data-toggle="pill"
                                  href="#paypal"
                                  class="nav-link "
                                >
                                  {" "}
                                  <i class="fab fa-paypal mr-2"></i> Paypal{" "}
                                </a>{" "}
                              </li>
                              <li class="nav-item">
                                {" "}
                                <a
                                  data-toggle="pill"
                                  href="#net-banking"
                                  class="nav-link "
                                >
                                  {" "}
                                  <i class="fas fa-mobile-alt mr-2"></i> Net
                                  Banking{" "}
                                </a>{" "}
                              </li>
                            </ul>
                          </div>

                          <div class="tab-content">
                            <div
                              id="credit-card"
                              class="tab-pane fade show active pt-3"
                            >
                              <div>
                                <div class="form-group">
                                  {" "}
                                  <label for="username">
                                    <h6>Card Owner</h6>
                                  </label>{" "}
                                  <input
                                    type="text"
                                    name="username"
                                    placeholder="Card Owner Name"
                                    required
                                    class="form-control "
                                  />{" "}
                                </div>
                                <div class="form-group">
                                  {" "}
                                  <label for="cardNumber">
                                    <h6>Card number</h6>
                                  </label>
                                  <div class="input-group">
                                    <input
                                      type="text"
                                      name="cardNumber"
                                      placeholder="Valid card number"
                                      class="form-control "
                                      required
                                    />
                                    <div class="input-group-append">
                                      {" "}
                                      <span class="input-group-text text-muted">
                                        {" "}
                                        <i class="fab fa-cc-visa mx-1"></i>{" "}
                                        <i class="fab fa-cc-mastercard mx-1"></i>{" "}
                                        <i class="fab fa-cc-amex mx-1"></i>{" "}
                                      </span>{" "}
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-sm-8">
                                    <div class="form-group">
                                      {" "}
                                      <label>
                                        <span class="hidden-xs">
                                          <h6>Expiration Date</h6>
                                        </span>
                                      </label>
                                      <div class="input-group">
                                        <input
                                          type="number"
                                          placeholder="MM"
                                          name=""
                                          class="form-control"
                                          required
                                        />{" "}
                                        <input
                                          type="number"
                                          placeholder="YY"
                                          name=""
                                          class="form-control"
                                          required
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-sm-4">
                                    <div class="form-group mb-4">
                                      {" "}
                                      <label
                                        data-toggle="tooltip"
                                        title="Three digit CV code on the back of your card"
                                      >
                                        <h6>
                                          CVV{" "}
                                          <i class="fa fa-question-circle d-inline"></i>
                                        </h6>
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        class="form-control"
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                                <div class="card-footer">
                                  {" "}
                                  <button
                                    type="button"
                                    class="subscribe btn btn-primary btn-block shadow-sm"
                                  >
                                    {" "}
                                    Confirm Payment{" "}
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div id="paypal" class="tab-pane fade pt-3">
                              <h6 class="pb-2">
                                Select your paypal account type
                              </h6>
                              <div class="form-group ">
                                {" "}
                                <label class="radio-inline">
                                  <input type="radio" name="optradio" checked />{" "}
                                  Domestic{" "}
                                </label>{" "}
                                <label class="radio-inline">
                                  <input
                                    type="radio"
                                    name="optradio"
                                    class="ml-5"
                                  />
                                  International{" "}
                                </label>
                              </div>
                              <p>
                                {" "}
                                <button type="button" class="btn btn-primary ">
                                  <i class="fab fa-paypal mr-2"></i> Log into my
                                  Paypal
                                </button>{" "}
                              </p>
                              <p class="text-muted">
                                {" "}
                                Note: After clicking on the button, you will be
                                directed to a secure gateway for payment. After
                                completing the payment process, you will be
                                redirected back to the website to view details
                                of your order.{" "}
                              </p>
                            </div>
                            <div id="net-banking" class="tab-pane fade pt-3">
                              <div class="form-group ">
                                {" "}
                                <label for="Select Your Bank">
                                  <h6>Select your Bank</h6>
                                </label>{" "}
                                <select class="form-control" id="ccmonth">
                                  <option value="" selected disabled>
                                    --Please select your Bank--
                                  </option>
                                  <option>Bank 1</option>
                                  <option>Bank 2</option>
                                  <option>Bank 3</option>
                                  <option>Bank 4</option>
                                  <option>Bank 5</option>
                                  <option>Bank 6</option>
                                  <option>Bank 7</option>
                                  <option>Bank 8</option>
                                  <option>Bank 9</option>
                                  <option>Bank 10</option>
                                </select>{" "}
                              </div>
                              <div class="form-group">
                                <p>
                                  {" "}
                                  <button
                                    type="button"
                                    class="btn btn-primary "
                                  >
                                    <i class="fas fa-mobile-alt mr-2"></i>{" "}
                                    Proceed Payment
                                  </button>{" "}
                                </p>
                              </div>
                              <p class="text-muted">
                                Note: After clicking on the button, you will be
                                directed to a secure gateway for payment. After
                                completing the payment process, you will be
                                redirected back to the website to view details
                                of your order.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        )}

        <Grid>
          <br />
          <Divider>
            <Chip variant="fullWidth" label="Order Summary" />
          </Divider>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={closeHandler}>
              continue Shopping
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                place your Order
              </button>
            )}
          </div>
        </Grid>
      </Container>
    </Page>
  );
};

export default Cart;
