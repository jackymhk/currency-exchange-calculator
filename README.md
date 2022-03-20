# currency-exchange-calculator
A simple currency exchange calculator API using Node.js. It scrapers live exchange rate from Yahoo Finance
* Node.js
* express.js
* axios
* cheerio

## Usage
```
/exchange?from=<From Currency>&to=<To Currency>&amount=<amount to convert>
```
Result
```
{
    "from": <From Currency>,
    "to": <To Currency>,
    "rate": <Exchange Rate>,
    "amount": <Converted Amount>
}
```

## Demo
<https://currency-exchange-calculator.herokuapp.com/exchange?from=USD&to=GBP&amount=1000>
