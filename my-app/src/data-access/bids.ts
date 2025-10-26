import { database } from "@/db/Database";
import { bids } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getBidsForItem(itemId: number) {
  const allBids = await database.query.bids.findMany({
    where: eq((bids as any).itemId, itemId),
    orderBy: desc(bids.id),
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
  });
  return allBids;
}