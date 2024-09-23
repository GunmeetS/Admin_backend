const express = require('express');
const cors=require("cors");


const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = require('./config/corsOptions');
app.use(cors(corsOptions));
require("dotenv").config();

const routes = require("./routes/index");
app.use('/api',routes);

require('./sequelize');


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
