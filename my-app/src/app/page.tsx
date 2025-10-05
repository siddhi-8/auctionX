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
    <main className="container mx-auto py-12 px-4 space-y-8">
      <h1 className="text-4xl font-bold mb-8">
        Items for Sale
      </h1>
      
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allItems.map((item) => (
        <div key={item.id} className="border p-4 rounded-xl">
          {item.name}
          starting price: {item.startingPrice / 100}
        </div>
      ))}
      </div>
      
    </main>
  );
}