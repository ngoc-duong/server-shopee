require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const shoesRoute = require('./routes/product');
const userRoute = require('./routes/user');
const shopRoute = require('./routes/shop');
const cartRoute = require('./routes/cart');
const SearchHistoryRoute = require('./routes/searchHistory');
const { connectDb } = require('./config/db/db');
const cors = require('cors');


connectDb();

// const code = require('./models/VeriCode')
// const test = async () => {
//     const otp = await code.findOne({ OTP: "123456" });
//     const date2 = otp._id.getTimestamp()
//     const date = new Date();
//     console.log(date.getTime())
//     console.log(date2.getTime())
//     console.log(date)
//     console.log(date2)
// }
// test()


const app = express();

app.use(cors());

app.use(logger('dev'));

app.use(passport.initialize());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Server started'
    })
});

app.use('/shoes', shoesRoute);

app.use('/user', userRoute);

app.use('/shop', shopRoute);

app.use('/cart', cartRoute);

app.use('/searchhistory', SearchHistoryRoute);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.log(err);
    res.status(status).json({
        error: {
            message: err.message
        }
    })
});

const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Sever is listening on port ${port}`));