
function userMiddleware(req,res,next){
    
    if(!req.session.userId){
        return res.status(403).json({
            message:"You are not signed in !!"
        });
    }

    req.userId = req.session.userId;

    next();
}

    


module.exports={
    userMiddleware:userMiddleware
};