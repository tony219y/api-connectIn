import { Request, Response } from 'express';
import { register,login, me } from '../services/auth.services';
import 'dotenv/config'


export const registerController= async(req: Request, res:Response)=>{

    try{
        const {username, email, password}=req.body;
        await register(username, email, password);
        res.status(201).json({message: 'User registered successfully'});
    }catch(error : any){  
        res.status(400).json({messages: error.message});
    }
}
export const loginController= async(req: Request, res:Response)=>{
    try{
        const {email, password}=req.body;
        const token = await login(email, password);
        res.status(201).json({message: 'User logged in successfully', token: token});
    }catch(error : any){  
        // console.log('Error registering user', error);
        res.status(400).json({messages: error.message});
    }
   
}


export const meController= async(req: Request, res:Response)=>{
    try{
        const user = (req as any).user;
        // console.log('USER: ',user);
        const userInfo = await me(user.userId);
        res.status(200).json(userInfo);
    }catch(error : any){  
        // console.log('Error registering user', error);
        res.status(400).json({messages: error.message});
    }
   
}
