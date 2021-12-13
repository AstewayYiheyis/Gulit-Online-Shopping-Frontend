import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products }) { 


  var productArray = Object.values(products); 
  
  
  return (
    <Grid container spacing={3}>
      {productArray.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}  >
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
