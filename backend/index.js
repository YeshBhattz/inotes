const con = require('./db');
con();
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
//these are the available routes:-
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 