const express = require('express');
const exphbr = require('express-handlebars');
const session = require('express-session');
const path = require('path')


const app = express();
const PORT = process.env.PORT || 3001; 

const sequelize = require('./config/config');
const seqStore = require('connection-session-sequelize')(session.Store)

const sess = {
    secret: 'abcdefghijklmnopqrstuvwxyzzyx',
    cookie: {},
    resave: false,
    saveUninitialised: true,
    store: new seqStore({
        db: sequelize
    })
}

app.use(session(sess))

const hbs = exphbr.create();

app.engine('handlebars', hbs.engine); 

app.search(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use('./controllers/')

app.listen(PORT, () => {
    console.log(`App listening on post: ${PORT}`)
    sequelize.sync()
})


