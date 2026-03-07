const {Router}=require("express");
const {purchaseModel}=require("../db")
const {courseModel}=require("../db")
const {userMiddleware}=require("../middlewares/user")
const courseRouter=Router();
    courseRouter.post("/purchase",userMiddleware,async function(req,res){
        const userId=req.userId;
        const courseId=req.body.courseId;
        if(!courseId){
            return res.json({
                message:"courseId is required"
            });
        }
        const existingPurchase = await purchaseModel.findOne({
            userId,
            courseId
        });

        if(existingPurchase){
            return res.json({
                message:"You already purchased this course"
            });
        }
        //check if the user has actually paid for it or not
        await purchaseModel.create({
           userId,
           courseId
        })
        res.json({
            message:"You have succesfully bought the course"
        })
    })

    courseRouter.get("/preview",async function(req,res){
        const courses=await courseModel.find({
            
        })
        res.json({
            courses
        })
        
    })


module.exports={
    courseRouter:courseRouter
}