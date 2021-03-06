const express = require('express')
const app = express()
const blogRoutes = require('./routes/blog.route')
app.use(express.urlencoded({extended : true}))
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/blog',blogRoutes)

app.get('**',(req,res)=>{
    res.send("404 Page Not Found")
})

app.listen(3000,()=>{
    console.log("Server is listening to port http://localhost:3000")
})
