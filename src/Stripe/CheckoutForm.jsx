import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios'
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";

import logo from "../pages/login/logo.svg";
import useStyles from "../pages/login/styles";

// context

export const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  var classes = useStyles();

  // global
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [amount, setAmountValue] = useState(900);

  const handleSubmit = async (event) => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    const config = {
      headers: { token: `${token}` }
    };
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          `${process.env.REACT_APP_AUTH_SERVER}/payment/stripe/charge`,
          {
            amount: amount,
            id: id,
          }, config
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        setError(error)
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      setIsLoading(false)
      setError(error)
      console.log(error.message);
    }
  };


  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Payment" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Good Morning, Vendor
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your payment :(
                </Typography>
              </Fade>
              <label>Amount</label>
              <TextField
                id="amount"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={amount}
                onChange={e => setAmountValue(e.target.value)}
                margin="normal"
                disabled
                placeholder="Payment"
                type="number"
                fullWidth
              />
              <CardElement />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Payment
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Grid>
  );
};