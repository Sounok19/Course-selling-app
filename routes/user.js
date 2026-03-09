const {Router}=require("express");
const userRouter=Router();
const {userModel, courseModel} = require("../db");
const bcrypt=require("bcrypt");
const {z}=require("zod");
//const jwt=require("jsonwebtoken");
const {purchaseModel}=require("../db")
const {userMiddleware}=require("../middlewares/user")

const {JWT_USER_PASSWORD}=require("../config");

userRouter.post("/signup",async function(req,res){

    const requireBody=z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(100),
        firstName:z.string().min(3).max(100),
        lastName:z.string().min(3).max(100)

    })

    const parsedDatawithSuccess=requireBody.safeParse(req.body);
    if(!parsedDatawithSuccess.success){
        res.json({
            message:"Incorrect format!!",
            error:parsedDatawithSuccess.error
        })
        return
    }
   const {email,password,firstName,lastName} =req.body

   const hashedPassword=await bcrypt.hash(password,5);
   try{

   
    await userModel.create({
        email,
        password:hashedPassword,
        firstName,
        lastName
    })

    res.json({
        message:"Signup Succeded",
    });
} catch(error){
    res.json({
        message:"Something went wrong !!"
    })
}


})

userRouter.post("/signin",async function(req,res){
//     const email=req.body.email;
//     const password=req.body.password;

//     const User=await UserModel.findOne({
//         email:email,
//         password:password
//     })
//     console.log(User)
//     if(User){
//         const token=jwt.sign({
//             id:User._id.toString()
//         },JWT_SECRET);

//         res.json({
//             token:token
//         })
//     }

//     else{
//         res.status(403).json({
//             message:"Incorrect Username or Password !!"
//         })
//     }
    const {email,password}=req.body

    const user=await userModel.findOne({
        email:email,
        
    });

    if(!user){
        res.status(403).json({
            message:"User doesn't exist in database"
        })
    }

    const passwordMatch=await bcrypt.compare(password,user.password)

    if(passwordMatch){
        req.session.userId=user._id;
        //Do cookie logic
        
        res.json({
            message:"Signin successfull !"
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
 })
userRouter.get("/purchases",userMiddleware,async function(req,res){
    const userId=req.userId
    const purchases=await purchaseModel.find({
        userId,
    });
    const coursesData=await courseModel.find({
        _id:{$in:purchases.map(x => x.courseId)}
    })
    res.json({
        purchases,
        coursesData,
        message:"These are your purchases!!"
    })
})


module.exports={
    userRouter:userRouter
}