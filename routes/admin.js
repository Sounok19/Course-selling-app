const {Router}=require("express");
const adminRouter=Router();
//const jwt=require("jsonwebtoken")
const {adminModel, courseModel}=require("../db");
const{z}=require("zod");
const bcrypt=require("bcrypt");

//const {JWT_ADMIN_PASSWORD}=require("../config");
const {adminMiddleware}=require("../middlewares/admin")

//adminRouter.use(adminMiddleware);

adminRouter.post("/signup",async function(req,res){

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

   
    await adminModel.create({
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


adminRouter.post("/signin",async function(req,res){
   const {email,password}=req.body

    const admin=await adminModel.findOne({
        email:email,
        
    });

    if(!admin){
        return res.status(403).json({
            message:"User doesn't exist in database"
        })
    }

    const passwordMatch=await bcrypt.compare(password,admin.password)

    if(passwordMatch){
        req.session.adminId = admin._id;
        
        res.json({
            message:"Admin signin successful"
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
 })

 

adminRouter.post("/course",adminMiddleware,async function(req,res) {
    const adminId=req.adminId;
    const {title,description,imageURL,price}=req.body;
    const course=await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageURL,
        price:price,
        creatorId:adminId
    })
    res.json({
        message:"course creation done!!",
        courseId:course._id
    })
})

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const {title,description,imageURL,price,courseId}=req.body;
    const course=await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    }
        ,{
        title:title,
        description:description,
        imageURl:imageURL,
        price:price,
        
    })
    res.json({
        message:"Course updated",
        courseId:course._id
    })
    
})

adminRouter.put("/course/bulk",adminMiddleware,async function(req,res){
    const adminId=req.adminId;
    const {title,description,imageURL,price,courseId}=req.body;
    const courses=await courseModel.findOne({
        _id:courseId,
        
    });

    res.json({
        message:"Here are your courses",
        courses
    })
})

module.exports={
    adminRouter:adminRouter
}