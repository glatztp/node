process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import "dotenv/config";
import { sql } from "./db.js";

// // Descomente se quiser apagar antes de criar
// await sql`DROP TABLE IF EXISTS videos;`;

await sql`
  CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration INTEGER
  );
`;

console.log("Tabela 'videos' criada com sucesso");
