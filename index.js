const express = require('express')
const db = require('./sqlite.js')
const themes = require('./utils/theme.js')
const PLACES = 7
const port = 80

const app = express()


app.get('/get/@:name', (req, res) => {
    const { name } = req.params;
    const { theme } = req.query;
    let inc = db.incrementNumByName(db.cleanInput(name))
    let length = PLACES
    if(inc == null){
        db.createObjectByName(db.cleanInput(name))
        inc = 1
    }

    const renderSvg = themes.getCountImage({ count: inc, theme, length })
    res.send(renderSvg)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})



