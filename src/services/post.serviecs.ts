import { eq } from 'drizzle-orm';
import { db } from "../configs/database";
import { postsTable,usersTable } from "../configs/database/schema";

const formatDate = (date: Date) => {
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,  // ใช้เวลาในรูปแบบ 24 ชั่วโมง
  }).replace(',', '');
};

export const newPost = async(userId:string, title:string, content:string,tags:string,postFor:string,visibility:string) => {
    try {
        const response = await db.insert(postsTable).values({
            userId: parseInt(userId),
            title:  title,
            content: content,
            tags: tags,
            postFor: postFor,
            visibility: visibility,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // console.log('Post created successfully', response);
        return response;
        
    } catch (error: any) {
        console.log('Error creating post', error);
        throw new Error(error.message);
        
    }
}


export const allPost = async() => {
    try {
        const response = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        tags: postsTable.tags,
        postFor: postsTable.postFor,
        visibility: postsTable.visibility,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        username: usersTable.username, // ดึง username จาก usersTable
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(usersTable.id,postsTable.userId));
        console.log('Posts fetched successfully', response);
        return response;
    } catch (error: any) {
        console.log('Error fetching posts', error);
        throw new Error(error.message);
    }
}