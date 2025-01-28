import jwt from 'jsonwebtoken';

const userAuth = async(req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({
            succes:false,
            message:"Not Authorised. Login Again"
        })
    }
    try{
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        if(decodeToken.id){
            req.body.userId = decodeToken.id;
        } else {
            return res.json({
                succes:false,
                message:"Not Authorised. Login Again"
            })
        }
        next();
    }
    catch(error){
        res.json({
            succes:false,
            message:error.message
        });
    }
}

export default userAuth;