const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoAddress = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// const port = 3000
const port = process.env.PORT || 3000

// define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine','hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to send  (public/index)
app.use(express.static(publicDirPath))

app.get('', (req, res) =>{  // by defualt to index
    res.render('index',{
        title : 'Weather',
        name : "Parth Butani"
    })
})

app.get('/about', (req, res) =>{  // about page
    res.render('about',{
        title : 'About',
        name : "Parth Butani"
    })
})

app.get('/help', (req, res) =>{  // help page
    res.render('help',{
        title : 'Help',
        helpText : 'Help full text',
        name : 'Parth Butani'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error : 'You Must Provide Address'
        })
    }

	geoAddress(req.query.address, (err, {latitude , longitude} = {}) => {
		// console.log("Location_Details : ",data)
		if(err){
			return res.send({
                error : err
            })
		}
	
		forecast(latitude,longitude,(err, foreCastData)=>{
			if(err){
				return res.send({
                    error : err
                })
			}
			//console.log("Weather_datails : ",data2)
            res.send({
                temprature : foreCastData.temprature,
                weather : foreCastData.weather,
                location : foreCastData.name
            })
		})
	})
    
    // res.send({
    //     address : req.query.address
    // })
})

app.get('/products', (req, res) => {
    
    //console.log(req.query.key)
    if(!req.query.key){
        return res.send({
            error : "Invalid Input..."
        })
    }
    res.send({
        product : [req.query]
    })
})

app.get('*',(req, res) => {
    //res.send("<center><h2>404 : Page Not Found</h2></center>")
    res.render('404',{
        title : 404,
        errorMsg : "Page not Found",
        name : "Parth Butani"
    })
})

//start server on 3000 port
app.listen(port, () => console.log(`Example app listening on port: ${port}`)) 