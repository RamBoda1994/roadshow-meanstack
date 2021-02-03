const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRouter = require('./src/routes/user');
const productRouter = require('./src/routes/product');

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_CONNECTION_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@practice.iari1.mongodb.net/roadshow?retryWrites=true&w=majority`;


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/products', productRouter);

mongoose.connect(DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log('MongoDB connection is setup successfully!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(error => {
    console.log(error);
})




