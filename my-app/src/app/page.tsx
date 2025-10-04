import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/Database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";

// Make the function async
export default async function HomePage() {
  const session = await auth()
 
  const allItems = await database.query.items.findMany();

  if(!session) return null;

  const user =  session.user;

  if(!user) return null;

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Post an item for auction
      </h1>
      <form
        // className="border p-8 rounded-xl space-y-4 max-w-2xl mb-12"
        action={async (formData: FormData) => {
          "use server";
          // const bid = formData.get("bid") as string;
          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input className="max-w-md" name="name" placeholder="Name your item" />
        <Button type="submit">Post item</Button>
      </form>

      <div className="space-y-4 mt-8">
        {allItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </main>
  );
}