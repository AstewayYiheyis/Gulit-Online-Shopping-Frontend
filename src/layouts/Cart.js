import { useContext } from "react";
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

  const APIs = useContext(APIConfig);
  const orderAPI = APIs.orderAPI;

  const orderHandler = () => {
    console.log("inside order handler LITems ordered");

    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + TokenService.getToken(),
    };
    /*
    axios.post(orderAPI, { headers })
      .then((response) => {
        // setProductList(response.data);
        console.log('saved succesfully');
        //redirect to order history page
      })
      .catch((error) => {
        console.log(error.message);
      });

      */
    alert("Product succesfully ordered:add POST implimentation");

    console.log("after Delete");
    cartRemoveAllItemsRemoveHandler();
    console.log(cartCtx.items);

    navigate("../products");
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
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
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
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
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
                <Typography variant="h4" gutterBottom>
                  Payment Method
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
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
