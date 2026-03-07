require("dotenv").config()
const express=require("express");
const mongoose=require("mongoose");
const { rateLimiter } = require("./middlewares/ratelimiter");
const morgan = require("morgan");


const app=express();
app.use(rateLimiter);
app.use(morgan("dev"));
const session = require("express-session");
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    }
}));




app.use(express.json());
const { userRouter }=require("./routes/user")

const { courseRouter }=require("./routes/course")

const {adminRouter}=require("./routes/admin")

app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

async function main(){
    await mongoose.connect (MONGO_URL)
    app.listen(3000);
    console.log("Listening on port 3000")
}
main()




