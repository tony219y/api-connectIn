import { db } from "../configs/database"
import { postsTable, usersTable, offerApplyTable } from "../configs/database/schema"
import { eq, and } from 'drizzle-orm';

export const addNewofferApply = async (userId_sender: string, postId: string, title: string, content: string) => {
    try {
        const existingOffer = await db
            .select()
            .from(offerApplyTable)
            .where(
                and(
                    eq(offerApplyTable.ownerPostId, parseInt(postId)),
                    eq(offerApplyTable.senderId, parseInt(userId_sender))
                )
            )
            .limit(1);

            const [posts] = await db
            .select()
            .from(postsTable)
            .where(eq(postsTable.id, parseInt(postId)))
            .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
            
            if (existingOffer.length > 0) {
                throw new Error(`You ar have already ${(posts.posts.postFor === 'recruiter') ? 'Apply' : 'Offer'} this post`)
            }
        const response = await db.insert(offerApplyTable).values({
            ownerPostId: posts.posts.userId,
            senderId: parseInt(userId_sender),
            title: title,
            content: content,
            type: (posts.posts.postFor === 'recruiter') ? 'Apply' : 'Offer',
            createdAt:new Date(),
            updatedAt: new Date()
        })

        console.log(response)
        // console.log({
        //     ownerPostId: posts.posts.userId,
        //     senderId: parseInt(userId_sender),
        //     title: title,
        //     content: content,
        //     type: (posts.posts.postFor === 'recruiter') ? 'Apply' : 'Offer',
        //     date: new Date()
        // })
        return response

    } catch (error:any) {
        console.log('Error creating offer apply!', error);
        throw new Error(error.message);
    }
}


/*
  {
  ownerPostId: 1,
  senderId: 7,
  title: 'Hello!',
  content: 'I Love you',
  type: 'Apply',
  date: 2025-04-05T13:13:59.165Z
}
*/
