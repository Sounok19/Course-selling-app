
function adminMiddleware(req,res,next){
    
    if(!req.session.adminId){
        return res.status(403).json({
            message:"Admin not logged in"
        });
    }

    req.adminId = req.session.adminId;

    next();
}
    


module.exports={
    adminMiddleware:adminMiddleware
}