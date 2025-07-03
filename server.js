// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//   response.write("oi")
//   return response.end()
// })

// server.listen(3333)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // dev only

import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DatabaseMemory();

const database = new DatabasePostgres()

//------------------POST

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

//------------------GET

server.get("/videos", async (request) => {
  const search = request.query.search;
  const videos = await database.list(search);

  console.log(search);

  return videos;
});

//------------------PUT

server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

 await database.update(videoId, { title, description, duration });

  return reply.status(204).send();
});

//------------------DELETE

server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
