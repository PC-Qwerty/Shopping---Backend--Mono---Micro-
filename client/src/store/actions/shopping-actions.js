import { DeleteData, GetData, PostData, PutData } from '../../utils'
import { Action } from '.'

 
export const onGetProducts = (payload) => async(dispatch) => {

    try {

        const response = await GetData('/products');
        
         dispatch({ type:  Action.LANDING_PRODUCTS, payload: response.data });
 
      
    } catch (err) {
      console.log(err)
    }

  };


  export const onGetProductDetails = (id) => async(dispatch) => {

    try {

        const response = await GetData('/products'+id);
        
         dispatch({ type:  Action.PRODUCT_DETAILS, payload: response.data });
 
      
    } catch (err) {
      console.log(err)
    }

  };

  /* ------------------- Wishlist --------------------- */

  export const onAddToWishlist = (_id) => async(dispatch) => {
    

    try {

        const response = await PutData('/products/wishlist', {
          _id
        });
        
        dispatch({ type:  Action.ADD_TO_WISHLIST, payload: response.data });
 
      
    } catch (err) {
      console.log(err)
    }

  };


  export const onRemoveFromWishlist = (_id) => async(dispatch) => {

    try {

        const response = await DeleteData('/products/wishlist/'+_id);
        
         dispatch({ type:  Action.REMOVE_FROM_WISHLIST, payload: response.data });
      
    } catch (err) {
      console.log(err)
    }

  };


  
  /* ------------------- Cart --------------------- */

  export const onAddToCart = ({ _id, qty }) => async(dispatch) => {

    try {

        const response = await PutData('/products/cart', {
          _id,
          qty
        });
        
         dispatch({ type:  Action.ADD_TO_CART, payload: response.data });
 
      
    } catch (err) {
      console.log(err)
    }

  };


  export const onRemoveFromCart = (_id) => async(dispatch) => {

    try {

        const response = await DeleteData('/products/cart/'+_id);
        
         dispatch({ type:  Action.REMOVE_FROM_CART, payload: response.data });
      
    } catch (err) {
      console.log(err)
    }

  };


  export const onCreateAddress = ({street, postalCode,city,country }) => async(dispatch) => {

    try {

        const response = await PostData('/customer/customer/address/', {
          street, postalCode,city,country 
        });
        
        dispatch({ type:  Action.ADDED_NEW_ADDRESS, payload: response.data });
      
    } catch (err) {
      console.log(err)
    }

  };

   
  export const onPlaceOrder = ({txnId }) => async(dispatch) => {

    try {

        const response = await PostData('/shopping/shopping/order/', {
          txnId
        });

        console.log(response.data,'ORDER');
        
        dispatch({ type:  Action.PLACE_ORDER, payload: response.data });
      
    } catch (err) {
      console.log(err)
    }

  };
 