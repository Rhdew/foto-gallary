const app =  require('./server');
let port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log('server ready at https://localhost:3000');
});