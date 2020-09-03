const express = require('express')
const app = express()
const navList = require('./nav.json')

app.set('view engine', 'ejs')

app.listen(3001, () => {
    console.log('server listening at 3001')
})

app.use(express.static('public'))

navList.forEach(elt => {
    app.get(elt.url, (req, res) => {
        elt.data.title = `HUNGRY PEOPLE - ${elt.name}`
        elt.data.navigation = navList
        res.render(elt.name.toLowerCase(), elt.data)
    })
})

app.use((req, res) => {
    res.render('404', { title: '404', navigation: navList })
})
