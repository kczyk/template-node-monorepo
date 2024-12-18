import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import middie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import path from "node:path";
import ejs from "ejs";

const __dirname = import.meta.dirname;

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors);
await fastify.register(middie);
await fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});
await fastify.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
  root: path.join(__dirname, "views"),
});

fastify.get("/", async function handler(_request, reply) {
  return reply.view("sample.ejs", { title: "Fastify sample" });
});

try {
  await fastify.listen({ port: parseInt(process.env.PORT ?? "", 10) || 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
