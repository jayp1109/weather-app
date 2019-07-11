const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

app.use(express.static(path.join(__dirname,'../public')))

const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather App',
        name:'Jay'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'Weather App',
        name:'Jay'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is help for weather app',
        title:'Weather App',
        name:'Jay'
    })
})

 app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'please provide a address'
        })
    }

    geocode.geocode(req.query.address,(error,{latitude,longitude,location}= {})=>{

        if(error){
           return res.send({error})
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){
                return res.send({error})
            }
            console.log(forecastData)
            console.log('Iam here')

            return res.send({
                forecastData,
                location,
                address:req.query.address
            })
          })
    })

    
 })

 app.get('/products',(req,res) =>{

    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error:'provide search request param'
        })
    }

    res.send({
        products:[]
    })
 })

 app.get('/help/*',(req,res)=>{

    res.render('404',{
        errorMessage:'Help page not Found',
        title:'404',
        name:'Jay'
    })
 })

 app.get('*',(req,res)=>{

    res.render('404',{
        errorMessage:'pageNot Found',
        title:'404',
        name:'Jay'
    })

 })



app.listen(3000,()=>{
    console.log('server is UP on ',3000)
})