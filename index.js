const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.get('/', (req, res) => {
    res.json("Hello world")
})

app.get('/exchange', (req, res) => {

    let fromCcy = req.query.from
    let toCcy = req.query.to
    let amount = req.query.amount
    
    // Check input parameters
    let missingParams = []
    if (!fromCcy)
        missingParams.push('from')
    if (!toCcy)
        missingParams.push('to')
    if (!amount)
        missingParams.push('amount')

    if (missingParams.length > 0)
        res.status(400).json({ error: `Missing parameters: ${missingParams}` })

    const url = `https://finance.yahoo.com/quote/${fromCcy}${toCcy}=X`

    axios.get(url)
        .then( (response) => {
            const html = response.data
            const $ = cheerio.load(html)

            const rateElement = $('fin-streamer[data-field="regularMarketPrice"][data-test="qsp-price"]', html)
            const rate = rateElement.attr("value")

            // Error no rate return
            if (!rate) {
                res.status(400).json({ error: "Unknown Currency" })
            }
            
            const convertedAmount = amount * rate
            
            res.json({
                from: fromCcy,
                to: toCcy,
                rate: rate,
                amount:  convertedAmount
            })
        })
        .catch( (err) => {
            console.log(err)
        })
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))