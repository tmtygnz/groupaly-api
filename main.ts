import fastify from "fastify";
import { request } from "http";
import database from "./firebase/user/user";
import { getQuote } from "./quote/quote";

const db = new database();
const server = fastify();

server.register(require("fastify-cors"), { origin: "*" });

server.get("/", async (req, res) => {
  res.send("Hello There");
  console.log("/");
});

server.get("/quote", async (req, res) => {
  let quote = await getQuote();
  res.send(quote);
  console.log("/quote");
});

server.get("/users/get", async (req, res) => {
  //TODO: Make this more elegant later
  const uid = req.headers.userid;
  console.log(req.headers);
  let rest = await db.getUser(uid?.toString()!);
  res.send(rest);
  console.log("/users/get");
});

server.post("/users/create", async (req, res) => {
  const name = req.headers.username;
  const uid = req.headers.userid;
  console.log(req.headers);
  const resp = await db.createUser(name?.toString()!, uid?.toString()!);
  res.send(resp);
  console.log("/users/create");
});

server.listen(3001, (err, addr) => {
  if (err) {
    console.warn(err);
    process.exit(1);
  }
  console.log(`Running in port ${addr}`);
});
