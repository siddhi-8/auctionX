import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { database } from "@/db/Database";
import Image from "next/image";
import { EmptyState } from "./empty-state"; // Make sure this component exists

// --- FIXES ---
import { getImageUrl } from "@/util/files"; // 1. Import getImageUrl (adjust path if needed)
import { Item } from "@/db/schema"; // 2. Import the Item type
// -------------

export default async function MyAuctionPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be signed in to view your auctions.");
  }

  const userId = session.user.id;

  // 3. Apply the Item type
  const allItems: Item[] = await database.query.items.findMany({
    where: (item, { eq }) => eq(item.userId, userId),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Auction Items</h1>
      </div>

      {hasItems ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allItems.map((item) => {
            // 4. Derive the imageUrl from the fileKey
            const imageUrl = item.fileKey ? getImageUrl(item.fileKey) : null;

            return (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex flex-col gap-2 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* 5. Conditionally render the image only if imageUrl is valid */}
                {imageUrl && (
                  <div className="relative w-full h-48 mb-2">
                    <Image
                      src={imageUrl} // 6. Use the derived imageUrl
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
                <Button variant="outline" className="mt-auto">
                  View Bids
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}