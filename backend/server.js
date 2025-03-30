const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/database");


app.use(cors());
app.use(express.json());

// Mongodb connection
connect();

//routes
app.use("/api",);



const port = 80;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})