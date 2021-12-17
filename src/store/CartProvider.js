import axios from "axios";
import { useContext, useReducer } from "react";
import { TokenService } from "src/storage.service";
import { APIConfig } from "./Api-Config";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const headers = TokenService.getHeaderwithToken();

const cartReducer = (state, action) => {
  console.log("inside cart cartReducer");
  console.log(state);
  console.log(action);

  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVEALL") {
    return {
      items: [],
      totalAmount: 0,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const APIs = useContext(APIConfig);
  const cartAPI = APIs.cartAPI;
  const cartItemUpdateAPI = APIs.cartItemUpdateAPI;

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
    // addItemstoDBCart(item);
  };
  function addItemstoDBCart(itemsToBeAdded) {
    const cartItemRequest = {
      productId: itemsToBeAdded.id,
      quantity: itemsToBeAdded.amount,
    };
    console.log("====================================");
    console.log(cartItemRequest);
    console.log("====================================");

    axios
      .post(cartAPI, cartItemRequest, { headers })
      .then((response) => {
        alert("added to cart successfully");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }
  function removeItemFromCartDBCart(itemsToBeRemoved) {
    const cartItemRequest = {
      productId: itemsToBeRemoved.id,
      quantity: 1,
    };
    console.log("====================================");
    console.log(cartItemRequest);
    console.log("====================================");

    axios
      .put(cartItemUpdateAPI, cartItemRequest, { headers })
      .then((response) => {
        alert("added to cart successfully");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });

    //  removeItemFromCartDBCart(id);
  };
  const removeAllItemsFromCartHandler = () => {
    dispatchCartAction({ type: "REMOVEALL" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    removeAllItems: removeAllItemsFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
