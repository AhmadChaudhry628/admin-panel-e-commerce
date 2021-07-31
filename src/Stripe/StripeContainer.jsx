import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51JDq4cEqcE9uXnYbOxvansueU0jMtlpPf64R4WQ06pIQlQrBxqCGdC9HuKjYGpXwMTkpFxt9JdHlI1HRMOq9ONRR00x1pdPklg";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;