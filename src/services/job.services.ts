import { db } from "../configs/database"
import { postsTable, usersTable, offerApplyTable } from "../configs/database/schema"
import { eq, and } from 'drizzle-orm';

export const addNewofferApply = async (userId_sender: string, postId: string, title: string, content: string) => {
    try {
        // ตรวจสอบว่ามีข้อเสนออยู่แล้วหรือไม่
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
            // ดึงข้อมูลโพสต์เพื่อตรวจสอบว่าเป็น recruiter หรือ seeker
            const [postInfo] = await db
                .select()
                .from(postsTable)
                .where(eq(postsTable.id, parseInt(postId)));
            
            throw new Error(`You have already ${(postInfo.postFor === 'recruiter') ? 'Applied to' : 'Offered on'} this post`);
        }

        // ดึงข้อมูลโพสต์และเจ้าของโพสต์
        const [post] = await db
            .select()
            .from(postsTable)
            .where(eq(postsTable.id, parseInt(postId)))
            .innerJoin(usersTable, eq(postsTable.userId, usersTable.id));

        // เพิ่มข้อเสนอใหม่
        const response = await db.insert(offerApplyTable).values({
            ownerPostId: parseInt(postId), // ใช้ postId เป็น ownerPostId ซึ่งถูกต้องตามโครงสร้าง
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

export const getSeekerOffer = async (userId: string) => {
    const checkSeekerOffer = await db.select().from(offerApplyTable)
        .where(eq(offerApplyTable.senderId, parseInt(userId)))
    console.log(checkSeekerOffer)
}

export const getSeekerPending = async (userId: string) => {
    const [checkSeekerPending] = await db.select().from(offerApplyTable)
        .where(eq(offerApplyTable.senderId, parseInt(userId)))
        .innerJoin(postsTable,eq(postsTable.id,offerApplyTable.ownerPostId ))
    // console.log('checkSeekerPending', checkSeekerPending)
    return {
        post_id:checkSeekerPending.posts.id,
        post_title:checkSeekerPending.posts.title,
        post_content:checkSeekerPending.posts.content,
        title_sender:checkSeekerPending.offerapplys.title,
        content_sender:checkSeekerPending.offerapplys.content,
        status:checkSeekerPending.offerapplys.status,
        type:checkSeekerPending.offerapplys.type,
        updatedAt:checkSeekerPending.offerapplys.updatedAt
    }
}
