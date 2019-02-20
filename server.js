const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();



app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
// app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log.')
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>')
    // res.send({
    //     name: 'Jorge',
    //     likes: [
    //         'Games',
    //         'Travel'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page'
    })
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

// app.get('/help', (req, res) => {
//     res.render('/help.html')
// })
app.listen(port, () => console.log(`App listening to port ${port}`));

