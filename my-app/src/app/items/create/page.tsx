'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemActions } from "./actions"; // Make sure this path is correct

// Client Components cannot be async, so remove the 'async' keyword here
export default function CreatePage() {

  return (
    <main className="container mx-auto py-12 px-4 space-y-8">
      <h1 className="text-4xl font-bold mb-8">
        Post an item
      </h1>
      
      {/* This form will now directly call your single Server Action.
        The complex logic for pre-signed URLs is removed.
      */}
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          

          await createItemActions(formData);
          // You can add a loading state here for better UX
          // try {
          //   await createItemActions(formData);
          //   // The redirect in the action will handle navigation on success
          // } catch (error) {
          //   // if (error=="NEXT_REDIRECT") {
          //   //   throw error;
          //   // }
          //   // You can add an error message state here for the user
          //   console.error("Failed to create item:", error);
          //   alert("Error: " + (error as Error).message);
          // }
        }}
      >
        <Input 
          required 
          className="max-w-lg" 
          name="name" 
          placeholder="Name your item" 
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What is the starting price?"
        />
        <Input 
          required 
          type="file" 
          name="file" 
        />
        <Button className="self-end" type="submit">Post Item</Button>
      </form>
    </main>
  );
}