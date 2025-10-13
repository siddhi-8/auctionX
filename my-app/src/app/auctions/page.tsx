import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { database } from "@/db/Database";
import Image from "next/image";

export default async function MyAuctionPage() {
    const session = await auth();
  
  // Your authentication check remains the same
    if (!session || !session.user || !session.user.id) {
      throw new Error("You must be signed in to view your auctions.");
    }
    const userId = session.user.id as string;
    const allItems = await database.query.items.findMany({
        where: (item, { eq }) => eq(item.userId, userId),
    });

  return (
    <main className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Items for Auction</h1>
        {/* You can add a link to your create page here later */}
        </div>

        {/* A responsive grid to display the items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {allItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex flex-col gap-2 shadow-md hover:shadow-lg transition-shadow">
            
            {/* Display the image using the Next.js <Image> component */}
            <div className="relative w-full h-48 mb-2">
                <Image
                src={item.imageUrl!} // The '!' tells TypeScript we know this value is not null
                alt={item.name}
                fill // The 'fill' prop makes the image cover the parent div
                style={{ objectFit: "cover" }} // Ensures aspect ratio is maintained without distortion
                className="rounded-md"
                />
            </div>

            <h2 className="text-xl font-bold truncate">{item.name}</h2>
            <p className="text-lg">
                Starting Price: {(item.startingPrice / 100).toFixed(2)} /-
            </p>
            <Button className="mt-auto">Place Bid</Button>
            </div>
        ))}
        </div>
    </main>
  );
}

