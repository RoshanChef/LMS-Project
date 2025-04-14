const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require("./config/cloudinary");

const user_router = require("./routes/user");
const contact_router = require("./routes/contact");
const course_router = require("./routes/course");
const payment_router = require("./routes/payment");
const profile_router = require("./routes/profile");

const connect = require("./config/database");
const { uploadToCloudinary } = require("./utils/imageUpload");

require('dotenv').config();

//CORS 
app.use(cors({
    origin: "http://localhost:5173",
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Mongodb Connection
connect();

// Cloudinary Connection
cloudinaryConnect();

// clodinary filepath
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//routes
app.use("/api/v1/auth", user_router);
app.use("/api/v1/profile", profile_router);
app.use("/api/v1/course", course_router);
app.use("/api/v1/contact", contact_router);
app.use("/api/v1/payment", payment_router);

// Testing Route
app.get("/", (req, res) => {
    res.send("Hello World");
})
app.post('/', async (req, res) => {
    const pic = req.files.pic;
    const image = await uploadToCloudinary(pic, process.env.CLOUDINARY_FOLDER_NAME);
    return res.json({
        image: image.secure_url
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})  