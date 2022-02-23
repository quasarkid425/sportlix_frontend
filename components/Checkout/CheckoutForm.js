import { useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  CardElement,
  useStripe,
  useElements,
  Box,
} from "@stripe/react-stripe-js";
import { pay, subscription, createSubscription } from "../../actions/order";

const CheckoutForm = ({
  shippingDetails,
  price,
  onSuccessfulCheckout,
  cart,
}) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    const billingDetails = {
      name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
      email: shippingDetails.email,
      address: {
        city: shippingDetails.city,
        line1: shippingDetails.address,
        state: shippingDetails.state,
        postal_code: shippingDetails.postalCode,
      },
    };

    try {
      const clientSecret = await pay(Math.round(price * 100));

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      onSuccessfulCheckout();
    } catch (err) {
      console.log(err.message);
      setCheckoutError(err.message);
    }
  };

  // Learning
  // A common ask/bug that users run into is:
  // How do you change the color of the card element input text?
  // How do you change the font-size of the card element input text?
  // How do you change the placeholder color?
  // The answer to all of the above is to use the `style` option.
  // It's common to hear users confused why the card element appears impervious
  // to all their styles. No matter what classes they add to the parent element
  // nothing within the card element seems to change. The reason for this is that
  // the card element is housed within an iframe and:
  // > styles do not cascade from a parent window down into its iframes

  const cardElementOpts = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        color: "#fff",
      },
    },
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <CardElement
        options={cardElementOpts}
        onChange={handleCardDetailsChange}
      />

      {checkoutError && <div style={{ color: "#f03e3e" }}>{checkoutError}</div>}

      {/* TIP always disable your submit button while processing payments */}

      <Button
        disabled={isProcessing || !stripe}
        isLoading={isProcessing ? true : false}
        loadingText={isProcessing ? "Processing..." : ""}
        w="100%"
        bgGradient="linear(to-r, #59f9b7, #66feea)"
        _hover={{
          bgGradient: "linear(to-r, #59f9b7, #66feea)",
        }}
        _active={{
          bgGradient: "linear(to-r, #59f9b7, #66feea)",
        }}
        _focus={{ boxShadow: "none" }}
        color={"#000"}
        type="submit"
        mt={2}
      >
        {isProcessing ? "" : `Pay $${price}`}
      </Button>
    </form>
  );
};

export default CheckoutForm;
