const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utl/geocode')
const forecast = require('./utl/forecast')

const app = express()

//Define Paths or Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//set up handlebars and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather App',
        name: 'Nathan'
    })

})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Nathan'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'this is some helpful page',
        title: 'Help page',
        name: 'Nathan'
    })
})
app.get('/weather',(req,res) => {
   if (!req.query.address){
       return res.send({
           error:'You must provide an address'
       })
   }
   geocode(req.query.address,(error,{longitude,latitude,location}=[])=>{
       if (error){ 
           return res.send({error})
       }
       forecast(longitude,latitude,(error,forecastData)=>{
           if(error){
               return res.send({error})
           }

           res.send({
               location,
               forecast:forecastData,
               address:req.query.address
           })
       })
   })
    
    // res.send(
    //     {
    //         forecast: 'it is raining', 
    //         location: 'Enugu',
    //         address:req.query.address
    // })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Nathan',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running on port 3000')
})