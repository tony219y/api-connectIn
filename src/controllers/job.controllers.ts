import { Response, Request } from "express"
import { addNewofferApply } from "../services/job.services";

export const createNewOfferApply = async(req: Request, res: Response) =>{

    try {
        const user = (req as any).user;
        const {postId, title, content} = req.body;
        await addNewofferApply(user.userId,postId, title, content)
        // console.log({user,postId, title, content})
        res.status(201).json({message: 'create new offer apply success!'})
    } catch (error:any) {
        console.log('Error creating new offer apply', error);
        res.status(400).json({ message: error.message });
    }
}