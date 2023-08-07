import { Container, Typography } from "@mui/material";
import Currency from "./components/Currency";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [currency, setCurrency] = useState<any>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("THB");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(1);
  const [exChangeRate, setExChangeRate] = useState<number>(0);
  const [checkFromCurrency, setCheckFromCurrency] = useState<boolean>(true);
  let fromAmount: any;
  let toAmount: any;

  if (checkFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exChangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exChangeRate).toFixed(2);
  }

  useEffect(() => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        // console.log(response.data.rates);
        setCurrency([...Object.keys(response.data.rates)]);
        setExChangeRate(response.data.rates[toCurrency]);
        console.log(exChangeRate);
      });
  }, [fromCurrency ,toCurrency]);

  const amountFromCurrency = (e: {
    target: { value: SetStateAction<number> };
  }) => {
    setAmount(e.target.value);
    setCheckFromCurrency(true);
  };
  const amountToCurrency = (e: {
    target: { value: SetStateAction<number> };
  }) => {
    setAmount(e.target.value);
    setCheckFromCurrency(false);
  };

  return (
    <>
      <Container
        sx={{
          textAlign: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          bgcolor: "grey.300",
        }}
      >
        <img src="/src/assets/images/money.png" alt="..." />
        <Typography variant="h3" sx={{ color: "black" }}>
          แปลงสกุลเงิน
        </Typography>
        <Currency
          currency={currency}
          selectCurrency={fromCurrency}
          changeCurrency={(e: { target: { value: any } }) =>
            setFromCurrency(e.target.value)
          }
          onChangeAmount={amountFromCurrency}
          amount={fromAmount}
        />
        <Typography variant="h5" sx={{ color: "black" }}>
          =
        </Typography>
        <Currency
          currency={currency}
          selectCurrency={toCurrency}
          changeCurrency={(e: { target: { value: any } }) =>
            setToCurrency(e.target.value)
          }
          onChangeAmount={amountToCurrency}
          amount={toAmount}
        />
      </Container>
    </>
  );
}

export default App;
