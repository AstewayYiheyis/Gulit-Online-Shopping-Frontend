import { Icon } from '@iconify/react';
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill';
// material
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import CartContext from 'src/store/cart-context'; 
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: theme.shape.borderRadiusMd,
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

export default function CartWidget(props) {

 
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
 

  useEffect(() => {
    if (items.length === 0) {
      return;
    } 

    const timer = setTimeout(() => { 
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
 

  const navigate = useNavigate();
  
  const ShowCheckout=(e) =>{
    e.preventDefault();
     let path = '../checkout'; 
    navigate(path);
  }

  return (
    <RootStyle>
      <Badge showZero badgeContent={numberOfCartItems} color="error" max={99} onClick={ShowCheckout}>
        <Icon icon={shoppingCartFill} width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}
