import { Request, Response } from 'express';
import { register } from '../services/auth.services';


export const registerController= async(req: Request, res:Response)=>{
    try{
        const {username, email, password, passwordconfirm}=req.body;
        const token = await register(username, email, password, passwordconfirm);
        res.status(201).json({token});
    }catch(error){
        console.log(error);
    }
}
