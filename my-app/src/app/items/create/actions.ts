'use server'

import { revalidatePath } from "next/cache";
import { database } from "@/db/Database"; // Adjust the import path as needed
import { items } from "@/db/schema"; // Adjust the import path as needed
import { auth } from "@/auth"; // Adjust the import path as needed
import { redirect } from "next/navigation";

export async function createItemActions(formData: FormData) {
    const session = await auth();
    if(!session){
        throw new Error("User not authenticated");
    }

    const user = session.user;
    if(!user || !user.id){
        throw new Error("User not found in session");
    }

    const startingPrice = parseFloat(formData.get("startingPrice") as string) 

    const priceAsMoney = Math.floor(startingPrice * 100)
    await database.insert(items).values({
        name: formData.get("name") as string,
        startingPrice: priceAsMoney,   
        userId: user.id,
    });
    redirect("/");
}
