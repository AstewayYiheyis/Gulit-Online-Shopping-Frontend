import PropTypes, { checkPropTypes } from "prop-types";
import { Link as RouterLink, Route } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack, Switch, Divider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
//
import Label from "../../Label";
import ColorPreview from "../../ColorPreview";
import ProductDetail from "src/pages/ProductDetail";
import CartContext from "src/store/cart-context";
import ItemCartForm from "./ItemCartForm";
import { useContext } from "react";
// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});



// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { id, name, cover, price, status, priceSale } = product;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price
    });
  
  };

  

  return (
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
        <Link to={'' +id} color="inherit" underline="hover" component={RouterLink} >
{/*         
        <Link to={{ 
  pathname: '' +id, 
  search: `choosenDog=${JSON.stringify({ ...product })}`
}}
        
color="inherit" underline="hover" component={RouterLink} > */}

          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

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
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="left"
          justifyContent="space-between"
        >
        <Divider variant="inset"></Divider>
    
<ItemCartForm id={id} onAddToCart={addToCartHandler} />  </Stack>
      </Stack>
    </Card>
  );
}
