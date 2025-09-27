import { database } from "@/db/Database";
import { bids as bidsSchema } from "@/db/schema";

// Make the function async
export default async function HomePage() {
  const bids = await database.query.bids.findMany();

  return (
    <main className="">
      <form
        action={async (formData: FormData) => {
          "use server";
          // const bid = formData.get("bid") as string;
          await database.insert(bidsSchema).values({});
        }}
      >
        <input name="bid" placeholder="Bid" />
        <button type="submit">Place Bid</button>
      </form>

        {bids.map((bid) => (
          <div key={bid.id}>
            {bid.id}
          </div>
        ))}

    </main>
  );
}