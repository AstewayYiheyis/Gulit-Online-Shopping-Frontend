import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Box,
  Card,
  Link,
  Grid,
  Typography,
  Stack,
  Container,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
//
import Label from "../../Label";
import { useContext } from "react";

import CartContext from "src/store/cart-context";
import ItemCartForm from "./ItemCartForm";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ProductDetailCard.propTypes = {
  product: PropTypes.object,
};

function ProductDetailCard({ product }) {
  console.log("inside product detail card");

  const { id, name, description, isActive, price } = product;
  //const { id, name, cover, price, status, priceSale ,description,brand,category} = product;
  console.log(product);
  const status = isActive;
  const priceSale = price;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  console.log("cart items");
  console.log(cartCtx.items);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Card>
            <Box sx={{ pt: "100%", position: "relative" }}>
              {status && (
                <Label
                  variant="filled"
                  color={(status === "sale" && "error") || "info"}
                  sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    position: "absolute",
                    textTransform: "uppercase",
                  }}
                >
                  {status}
                </Label>
              )}
              <ProductImgStyle
                alt={name}
                src={`/static/mock-images/products/product_${id}.jpg`}
              />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography variant="subtitle4" noWrap>
                {description}
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Link
            to={"/brand/" + name}
            color="inherit"
            underline="hover"
            component={RouterLink}
          >
            Brand :APPLE
          </Link>
          <Typography variant="subtitle1">{name}</Typography>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* <ColorPreview colors={colors} /> */}
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  Price: {priceSale && fCurrency(priceSale)}
                </Typography>
                &nbsp;
                {fCurrency(price)}
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} sx={{ p: 3 }}></Stack>

          <Stack
            direction="row"
            alignItems="right"
            justifyContent="space-between"
            mb={5}
          >
            <div>
              <ItemCartForm id={id} onAddToCart={addToCartHandler} />
            </div>
          </Stack>

          <Stack
            direction="row"
            alignItems="right"
            justifyContent="space-between"
            mb={5}
          >
            <Button variant="contained" component={RouterLink} to="#">
              <Link
                to={"../checkout"}
                color="inherit"
                underline="hover"
                component={RouterLink}
              >
                Buy Now
              </Link>
            </Button>
          </Stack>

          <Box>
            <Stack
              direction="row"
              alignItems="left"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="subtitle1">
                <a href={`/products/${id}/reviews/`}>Reviews</a>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetailCard;
