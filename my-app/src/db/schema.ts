// this is where we define our table in our databse

import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids= pgTable("bb_bids", {
  id: serial("id").primaryKey(),
});
// bb_bids is the name of the table in our actuall postgre database
// id is the name of the column in our actuall postgre database
// serial means it will auto increment
// primaryKey means it is the primary key of the table
