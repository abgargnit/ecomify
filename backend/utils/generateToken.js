import jwt from 'jsonwebtoken';

const generateToken = (res,userId) =>{
    // Now we will create token
    const token = jwt.sign({userId}, process.env.SECRET_KEY, 
        {
            expiresIn: '30d', 
        }
    );
     // set jwt as Http-only cookie
    res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict', //  to prevent attacks
                maxAge: 30*24*60*60*1000 // this will be 30 days...
            })
}

export default generateToken;