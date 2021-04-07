const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
dotenv.config()


//db
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected'))

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`)
})


//bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')


//middleware 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: 'Unauthorized token!'});
    }
    next()
});


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Node JS API listening on port: ${port}`))