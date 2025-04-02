const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/database");
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require("./config/cloudinary");

app.use(cors());
app.use(express.json());

// Mongodb Connection
connect();

// Cloudinary Connection
cloudinaryConnect();

//routes
app.use("/api",);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));




const port = 80;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})