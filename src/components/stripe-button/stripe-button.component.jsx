import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { clearItemFromCart } from "../../redux/cart/cart.actions";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51H744qCx8VLsJ2t6CGHox44k99AXk5Aucm2rHbFVZ1yUfforNSdUXmamz728naBc70QhBcZnpZp4QaTLPxpmkcDX00VC3lbGNF";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Succesful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="WebShop Clothing Claudiu"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      ammount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
