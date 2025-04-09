import { db } from "../configs/database"
import { postsTable, usersTable, offerApplyTable } from "../configs/database/schema"
import { eq, and } from 'drizzle-orm';

export const addNewofferApply = async (userId_sender: string, postId: string, title: string, content: string) => {
    try {
        const existingOffers = await db
            .select()
            .from(offerApplyTable)
            .where(
                and(
                    eq(offerApplyTable.ownerPostId, parseInt(postId)),
                    eq(offerApplyTable.senderId, parseInt(userId_sender))
                )
            );

        if (existingOffers.length > 0) {
            const [postInfo] = await db
                .select()
                .from(postsTable)
                .where(eq(postsTable.id, parseInt(postId)));
            
            throw new Error(`You have already ${(postInfo.postFor === 'recruiter') ? 'Applied to' : 'Offered on'} this post`);
        }

        const [post] = await db
            .select()
            .from(postsTable)
            .where(eq(postsTable.id, parseInt(postId)))
            .innerJoin(usersTable, eq(postsTable.userId, usersTable.id));

        const response = await db.insert(offerApplyTable).values({
            ownerPostId: parseInt(postId), 
            senderId: parseInt(userId_sender),
            title: title,
            content: content,
            type: (post.posts.postFor === 'recruiter') ? 'Apply' : 'Offer',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Offer apply created successfully:', response);
        return response;

    } catch (error: any) {
        console.log('Error creating offer apply!', error);
        throw new Error(error.message);
    }
}

export const getSeekerOffer = async (userId:string, postForInput: string) => {
    // console.log('userId: ', userId, " type: ",postForInput)
        const receiveOffer = await db.select(
            {
                postId: postsTable.id, 
                postTitle: postsTable.title, 
                postFor:postsTable.postFor, 
                senderId: usersTable.id,
                sendBy: usersTable.username,
                sendMessage: offerApplyTable.content,
                updatedAt: offerApplyTable.updatedAt,
            })
        .from(postsTable).where(eq(postsTable.userId,parseInt(userId)))
        .innerJoin(offerApplyTable, and(
            eq(postsTable.id, offerApplyTable.ownerPostId),
            eq(postsTable.postFor, postForInput)
        ))
        .innerJoin(usersTable, eq(offerApplyTable.senderId, usersTable.id));

        if (!receiveOffer || receiveOffer.length === 0) {
            throw new Error("No Offer/Applicant found for this user.");
        }
        return receiveOffer
}

export const getSeekerPending = async (userId: string) => {
    const checkSeekerPending = await db
      .select({
        post_id: postsTable.id,
        post_title: postsTable.title,
        post_content: postsTable.content,
        post_for: postsTable.postFor,
        post_by: usersTable.username,
        title_sender: offerApplyTable.title,
        content_sender: offerApplyTable.content,
        status: offerApplyTable.status,
        type: offerApplyTable.type,
        updatedAt: offerApplyTable.updatedAt
      })
      .from(offerApplyTable)
      .where(eq(offerApplyTable.senderId, parseInt(userId)))
      .innerJoin(postsTable, eq(postsTable.id, offerApplyTable.ownerPostId))
      .innerJoin(usersTable, eq(usersTable.id, postsTable.userId));
  
    if (!checkSeekerPending || checkSeekerPending.length === 0) {
      throw new Error("No pending offer found for this user.");
    }
  
    return checkSeekerPending;
  };
  
