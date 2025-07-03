process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // dev only

import { createServer } from "http";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3333");
});
