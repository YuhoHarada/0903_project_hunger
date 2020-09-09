const express = require('express')
const app = express()
const navList = require('./nav.json')
const fs = require("fs")
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')

app.listen(3001, () => {
    console.log('server listening at 3001')
})

app.use(express.static('public'))

navList.forEach(elt => {
    let url = elt.url
    if (elt.name == "Menu") url = "/menu/:id"
    app.get(url, (req, res) => {
        elt.data.title = `HUNGRY PEOPLE - ${elt.name}`
        elt.data.navigation = navList
        elt.name == "Home" ? elt.data.smooth = true : elt.data.smooth = false
        if (elt.name == "Menu") elt.data.id = req.params.id
        res.status(200).render(elt.name.toLowerCase(), elt.data)
    })
})

app.post('/newBook', urlencodedParser, (req, res) => {
    const fileName = 'bookdata.json'
    let newData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        people: req.body.people,
        date: req.body.date,
        time: req.body.time,
    }
    console.log(newData)
    if (!fs.existsSync(fileName)) {
        let data = []
        data.push(newData)
        data = JSON.stringify(data)
        fs.writeFile(fileName, data, (err) => {
            if (err) throw err
            console.log("Data written")
        })
    } else {
        let myData = fs.readFileSync(fileName, 'utf-8')
        myData = JSON.parse(myData)
        myData.push(newData)
        fs.writeFile(fileName, JSON.stringify(myData), (err) => {
            if (err) throw err
            console.log("Data written")
        })
    }
    res.redirect('/booking')
})

app.post('/newContact', urlencodedParser, (req, res) => {
    const fileName = 'contactdata.json'
    let newData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    }
    console.log(newData)
    if (!fs.existsSync(fileName)) {
        let data = []
        data.push(newData)
        data = JSON.stringify(data)
        fs.writeFile(fileName, data, (err) => {
            if (err) throw err
            console.log("Data written")
        })
    } else {
        let myData = fs.readFileSync(fileName, 'utf-8')
        myData = JSON.parse(myData)
        myData.push(newData)
        fs.writeFile(fileName, JSON.stringify(myData), (err) => {
            if (err) throw err
            console.log("Data written")
        })
    }
    res.redirect('/contact')
})

app.use((req, res) => {
    res.render('404', { smooth:false, title: '404', navigation: navList })
})
