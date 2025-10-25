
import { database } from '@/db/Database'; // Adjust the path as needed
import { items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from "@/components/ui/button";


export default async function ItemPage({ params : {itemId} }: { params: { itemId: string }  }) {

    const item = await  database.query.items.findFirst({
       where: eq(items.id, parseInt(itemId)), // Replace '1' with the actual itemId you want to fetch
    });

    if (!item) {
    return( 
    <div >
        
        <h1 className="text-4xl font-bold">Item not found</h1>
        <p>The item that you are trying to search is invalid. Please go back and search for a valid item.</p>

        <Button className="mt-auto" asChild>
            <Link href={`/auctions`}>View Auctions
            </Link>
        </Button>
    </div>
    );
    }

    return (
    <main className="container mx-auto py-12 space-y-8">
        <h1 className="text-4xl font-bold">{item?.name}</h1>
    </main>
  );
}