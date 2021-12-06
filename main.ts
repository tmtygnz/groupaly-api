import fastify from "fastify";
import { request } from "http";
import database from "./firebase/user/user";
import { getQuote } from "./quote/quote";
import fastifyIO from "fastify-socket.io";
import { Socket } from "socket.io";
import { IUser } from "./firebase/user/IUser";
import { IosApp } from "firebase-admin/lib/project-management/ios-app";
import {
  addParticipant,
  getParticipantsFromSession,
  participants,
} from "./session/user";
const db = new database();
const server = fastify();

server.register(require("fastify-cors"), { origin: "*" });
server.register(require("fastify-compress"), { global: false });
server.register(require("fastify-socket.io"), {
  cors: {
    origin: "*",
  },
});

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
  //TODO: Make this more readable
  const uid = req.headers.userid;
  let rest = await db.getUser(uid?.toString()!);
  res.send(rest);
  console.log("/users/get");
});

server.post("/users/create", async (req, res) => {
  const name = req.headers.username;
  const uid = req.headers.userid;
  const resp = await db.createUser(name?.toString()!, uid?.toString()!);
  res.send(resp);
  console.log("/users/create");
});

server.ready().then(() => {
  server.io.on("connection", (socket: Socket) => {
    console.log("user connected");
    socket.on("join", (user: IJoin) => {
      addParticipant(user.user, user.id);

      //get the latest list of participants
      const participantsInSession = getParticipantsFromSession(user.id);
      server.io.emit("new-user-join", participantsInSession);
    });
  });
});

server.listen(3001, (err, addr) => {
  if (err) {
    console.warn(err);
    process.exit(1);
  }
  console.log(`Running in port ${addr}`);
});

export interface IJoin {
  user: IUser;
  id: string;
}
