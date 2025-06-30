// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//   response.write("oi")
//   return response.end()
// })

// server.listen(3333)

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database  =  new DatabaseMemory()

server.post("/videos", ( request, reply) => {
  database.create({
    title: " video 01",
    description: "este é o video 01",
    duration: 180

  })

  return reply.status(201).send()
});

server.get("/videos", () => {
  return " y4vt34f34gtrye";
});

server.put("/videos/:id", () => {
  return " 53453";
});

server.delete("/videos/:id", () => {
  return " 53453";
});

server.listen({
  port: 3333,
});
