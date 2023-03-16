import verifyToken from "./verifyToken.js"

const veriftyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.id===req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("Your are not authenticated!")
        }
    })
}

export default veriftyUser