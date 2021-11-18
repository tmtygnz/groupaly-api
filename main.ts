import fastify from "fastify";
import { request } from "http";
import database from "./firebase/user";
import { getQuote } from "./quote/quote";

const db = new database();
const server = fastify();

server.get("/", async (req, res) => {
  console.log("/");
  res.send("Hello There");
});

server.get("/quote", async (req, res) => {
  console.log("/quote");
  let quote = await getQuote();
  return quote;
});

server.get("/users/get", async (req, res) => {
  console.log("/users/get");
  //TODO: Make this more elegant later
  const uid = req.headers.uid;
  console.log(uid);
  let rest = await db.getUser(uid?.toString()!);
  return rest;
});

server.listen(3001, (err, addr) => {
  if (err) {
    console.warn(err);
    process.exit(1);
  }
  console.log(`Running in port ${addr}`);
});
