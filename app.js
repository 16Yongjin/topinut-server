const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('mz/fs')
const port = process.env.PORT || 3000
const app = express()
app.use(bodyParser.json())
app.use(cors())

let cards = { toDo: [], doing: [], done: [] }

fs.exists('cards.json')
  .then(res => res ? fs.readFile('cards.json', 'utf-8') : cards)
  .then(res => cards = res)

app.get('/', async (req, res) => {
  res.send(cards)
})

app.post('/', async (req, res) => {
  await fs.writeFile('./cards.json', JSON.stringify(req.body))
  cards = req.body
  res.send(req.body)
})

app.listen(port)
