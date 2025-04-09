import { Response, Request } from "express"
import { addNewofferApply, getSeekerOffer, getSeekerPending } from "../services/job.services";

export const createNewOfferApply = async(req: Request, res: Response) =>{

    try {
        const user = (req as any).user;
        const {postId, title, content} = req.body;
        // console.log({postId, title, content})
        await addNewofferApply(user.userId,postId, title, content)
        res.status(201).json({message: 'create new offer apply success!'})
    } catch (error:any) {
        console.log('Error creating new offer apply', error);
        res.status(400).json({ message: error.message });
    }
}

export const seekerOffer = async(req:Request, res:Response)=>{
    try {
        const user = (req as any).user;
        const postForInput = req.query.type as string;
        const response = await getSeekerOffer(user.userId, postForInput)
        console.log("response: ", response)
        res.status(200).json(response)
    } catch (error : any) {
        console.error(error);
        res.status(400).json({message: error.message})
    }
}
export const seekerPending = async(req:Request, res:Response)=>{
    try {
        const user = (req as any).user;
        const response = await getSeekerPending(user.userId)
        res.status(200).json(response)
    } catch (error : any) {
        // console.error(error);
        res.status(400).json({message: error.message})
    }
}