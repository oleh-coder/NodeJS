// Підключили express
const express = require('express');
// Підключили Template handlebars
const expressBer = require('express-handlebars');
// Підлючили модуль path для робота із шляхами
const path =require('path');

// Запускаємо express
const app = express();


// Читає json
app.use(express.json());
// Читає url
app.use(express.urlencoded());
// Прописуєм статичну теку
app.use(express.static(path.join(__dirname, 'public')));

// Налаштування Template handlebars
app.engine('.hbs', expressBer({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-page',
    extname: '.hbs',
}));


app.set('view engine', '.hbs');
app.set('views', 'views');

users = [];

//---------------------------------------------Регістрація------------------------------------------------------------//

app.get('/reg', (req, res) => {
    res.render('reg-page');
});

app.post('/reg', (req, res) =>{
    const {name,email, pas} = req.body;
    if(users.find(user => (user.email === email))){
        res.render('reg-page', {msg: 'Такий email вже існує в системі'});
    }
    else{
        users.push({name, email, pas});
        res.render('aut-page');

    }
});

//---------------------------------------------#Регістрація-----------------------------------------------------------//

//---------------------------------------------Авторизація------------------------------------------------------------//

app.get('/', (req, res) => {
    res.render('aut-page');
});

app.post('/', (req, res) => {
    const {email, pas} = req.body;

    if(users.find(user => (user.email === email && user.pas === pas))){
        res.render('users-page', {users});
    }
    else{
        res.render('aut-page', {msg: 'Не вірний email або пароль. Чи пройдіть реєстрацію:'});

    }
});

//--------------------------------------------#Авторизація------------------------------------------------------------//



// Підняли сервер
app.listen(2207,(err)=> {
    if(err){
        console.log(err);
    }
    else{
        console.log('listen start 2207....');
    }
})
