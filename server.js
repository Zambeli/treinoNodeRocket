// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("Hello world!");
//   return response.end();
// });

// server.listen(3333);

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

// GET,  POST, PUT, DELETE

// POST https://localhost:3333/videos - estarei criando um video

// PUT https://localhost:3333/videos/3

const database = new DatabaseMemory();

//request body

server.post("/videos", (request, reply) => {
  const { title, description, duration } = request.body;

  database.create({
    // title: title,
    // description: description,
    // duration: duration,
    title,
    description,
    duration,
  });

  console.log(database.list());

  return reply.status(201).send();
});

server.get("/videos", (request) => {
  const search = request.query.search;

  const videos = database.list(search);

  return videos;
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: 3333,
});
