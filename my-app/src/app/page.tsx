// src/app/page.tsx

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { database } from "@/db/Database";
import { getImageUrl } from "@/util/files"; // <-- 1. Import getImageUrl
import Image from "next/image";
import Link from "next/link";
import { Item } from "@/db/schema"; // Import your Item type

export default async function HomePage() {
  const session = await auth();
  const allItems: Item[] = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Items for Auction</h1>
        
        {/* 2. Add the "Post Item" button, visible only if logged in */}
        {session && (
          <Button asChild>
            <Link href="/items/create">Post Item</Link>
          </Button>
        )}
      </div>

      {/* A responsive grid to display the items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {allItems.map((item) => {
          // 3. Derive the imageUrl here
          const imageUrl = item.fileKey ? getImageUrl(item.fileKey) : null;

          return (
            <div
              key={item.id}
              className="border rounded-lg p-4 flex flex-col gap-2 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* 4. Conditionally render the image div */}
              {imageUrl && (
                <div className="relative w-full h-48 mb-2">
                  <Image
                    src={imageUrl} // Use the derived URL
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                </div>
              )}

              <h2 className="text-xl font-bold truncate">{item.name}</h2>
              <p className="text-lg">
                Starting Price: {(item.startingPrice / 100).toFixed(2)} /-
              </p>
              <Button className="mt-auto" asChild>
                <Link href={`/items/${item.id}`}>Place Bid</Link>
              </Button>
            </div>
          );
        })}
      </div>
    </main>
  );
}