import app from './server';
let port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log('server ready at http://localhost:3000');
});