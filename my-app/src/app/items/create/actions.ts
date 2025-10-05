'use server'

import { revalidatePath } from "next/cache";
import { database } from "@/db/Database"; // Adjust the import path as needed
import { items } from "@/db/schema"; // Adjust the import path as needed
import { auth } from "@/auth"; // Adjust the import path as needed

export async function createItemActions(formData: FormData) {
    const session = await auth();
    if(!session){
        throw new Error("User not authenticated");
    }

    const user = session.user;
    if(!user || !user.id){
        throw new Error("User not found in session");
    }

    await database.insert(items).values({
    name: formData.get("name") as string,
    userId: user.id,
    });
    revalidatePath("/");
        
}