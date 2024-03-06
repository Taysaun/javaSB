const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
var data = fs.readFileSync('moneyData.json')
data = JSON.parse(data)

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('java')
    // data.amount = bank.amount
    // fs.writeFileSync("moneyData.json", JSON.stringify(data))
})
app.use('/', (req, res) => {
    res.sendFile(__dirname+'/pr.js')
})
app.use('/', (req, res) => {
    res.sendFile(__dirname+'/design.css')
})

// app.post('/readJSON', (req, res) => {
//     var data = fs.readFileSync('moneyData.json')
//     data = JSON.parse(data)
//     res.json(JSON.stringify(data))
// })
// app.post('/writeJSON', (req, res) => {
//     var data = req.body
//     fs.writeFileSync('moneyData.json', JSON.stringify(data))
//     res.json(JSON.stringify(data))
// })

const PORT = 2000

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})