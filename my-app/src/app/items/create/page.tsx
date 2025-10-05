
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemActions } from "@/app/items/create/actions";
import { number } from "zod";
// Make the function async
export default async function CreatePage() {

  return (
    <main className="container mx-auto py-12 px-4 space-y-8">
      <h1 className="text-4xl font-bold mb-8">
        Post an item
      </h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        action={createItemActions}
      >
        <Input required className="max-w-lg" name="name" placeholder="Name your item" />
        <Input 
          required
          className="max-w-lg" 
          name="startPrice" 
          type="number" 
          placeholder="Starting Price" 
        />
        <Button className="self-end" type="submit">Post item</Button>
      </form>
    </main>
  );
}