// this is where we define our table in our databse

import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids= pgTable("bb_bids", {
  id: serial("id").primaryKey(),
});

