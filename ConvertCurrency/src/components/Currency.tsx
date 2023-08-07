import { Box, MenuItem, Select, Stack, TextField } from "@mui/material";

type CurrencyProps = {
  currency: string[];
  selectCurrency: string;
  changeCurrency: any;
  onChangeAmount: any;
  amount: number;
};

const Currency = ({
  currency,
  selectCurrency,
  changeCurrency,
  onChangeAmount,
  amount,
}: CurrencyProps) => {
  return (
    <>
      <Box sx={{ minWidth: 120, my: 2 }}>
        <Stack direction={"row"} spacing={5} justifyContent={"center"}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectCurrency}
            label="Currency"
            onChange={changeCurrency}
            sx={{ bgcolor: "whitesmoke" }}
          >
            {currency.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
          <TextField
            type="number"
            sx={{ bgcolor: "whitesmoke" }}
            onChange={onChangeAmount}
            value={amount}
          ></TextField>
        </Stack>
      </Box>
    </>
  );
};

export default Currency;
