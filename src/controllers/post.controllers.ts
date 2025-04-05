import { Response, Request } from "express"
import { newPost, allPost } from "../services/post.serviecs";

export const createNewPost = async (req: Request, res: Response) => {
    try {
        const { title, content, tags, postFor, visibility } = req.body;
        const user = (req as any).user;
        await newPost(user.userId, title, content, tags, postFor, visibility);
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error: any) {
        console.log('Error creating post', error);
        res.status(400).json({ message: error.message });

    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await allPost();
        res.status(200).json({ message: 'Posts fetched successfully', posts });
    } catch (error: any) {
        console.log('Error fetching posts', error);
        res.status(400).json({ message: error.message });
    }
}