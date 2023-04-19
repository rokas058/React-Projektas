import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ShoppingCartContext } from '../src/components/ShoppingCartContext';

const initialState = {
  cartItems: [],
};

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

const AppWrapper = () => {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <ShoppingCartContext.Provider value={{ ...state, addToCart }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShoppingCartContext.Provider>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);
