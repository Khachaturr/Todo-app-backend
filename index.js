const express= require('express');

const app=express();
const jsonBody=express.json({limit:'5mb'})
const port=9000;




app.listen(port, ()=>{
    console.log(`http://localhost${port}`)
})