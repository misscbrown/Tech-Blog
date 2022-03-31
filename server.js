const express = require('express');
const exphbr = require('express-handlebars');
const session = require('express-session');
const path = require('path')
const routes = require('./controllers')

const app = express();
const PORT = process.env.PORT || 3001; 

const sequelize = require('./config/config');
const seqStore = require('connect-session-sequelize')(session.Store)

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
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use(routes)

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
    sequelize.sync()
})


