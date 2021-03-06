var express=require('express');  
var bodyParser=require('body-parser');
var app=new express();  
var port=7000;  
app.listen(port,function(err){  
    if(typeof(err)=="undefined"){  
        console.log('Your application is running on : '+ port+' port');  
    }  
});  
var navMenu=[  
                {href:'/articles',text:'Articles'},  
                {href:'/projects',text:'Projects'},  
                {href:'/books',text:'Books'},  
                {href:'/Contact',text:'Contact Us'}  
           ];   
  
app.use(express.static('public'));//making public directory as static diectory   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('views','./src/views');   
  
app.set('view engine','ejs');  
var articlesRouter=require('./src/routes/articlesRoute')(navMenu);  
var projectsRouter=require('./src/routes/projectsRoute')(navMenu);  
var booksRouter=require('./src/routes/booksRoute')(navMenu);  
var contactRouter=require('./src/routes/contactRoute')(navMenu);  
var usersRouter=require('./src/routes/registrationRoute')(navMenu);  
var loginRouter=require('./src/routes/loginRoute')(navMenu);  
var profileRouter=require('./src/routes/profileRoute')(navMenu);  
require('./src/configuration/passport')(app); 
var cookieParser=require('cookie-parser');  
var passport=require('passport');  
var session=require('express-session'); 
app.use(cookieParser());  
app.use(session({secret:'c-sharpcorner'}));  

app.use('/myprofile',profileRouter); 
app.use('/articles',articlesRouter);  
app.use('/projects',projectsRouter);  
app.use('/books',booksRouter);  
app.use('/contact',contactRouter);  
app.use('/register',usersRouter); 
app.use('/login',loginRouter);  
app.get('/',function(req,res){  
    res.render('index', {  
        title:'Node.js Tutorial',  
        menu:navMenu  
    });  
});  