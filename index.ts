import express from "express";
import database from "./firebase/user/user";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { getQuote } from "./quote/quote";
import { green, red, yellow } from "./clog/clog";
import cors from "cors";
import { addParticipant, IParticipant } from "./session/user";

yellow("server starting!");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const db = new database();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello There!");
  green("/");
});

app.get("/quote", async (req, res) => {
  const quote = await getQuote();
  res.send(quote);
  green("/quote");
});

app.get("/users/get", async (req, res) => {
  const uid = req.headers.userid;
  const getUserResp = await db.getUser(uid?.toString()!);
  res.send(getUserResp);
  green("/user/get");
});

app.post("/users/create", async (req, res) => {
  const name = req.headers.name;
  const uid = req.headers.userid;
  const createUserResp = await db.createUser(
    name?.toString()!,
    uid?.toString()!
  );
  res.send(createUserResp);
});

io.on("connection", (socket: Socket) => {
  green("A User Connected Through Sockets");
  socket.on("me-join", (user: IParticipant) => {
    red(`${user} | ${user.sid}`);
    socket.join(user.sid);
    io.sockets
      .in(user.sid)
      .emit("user-join", `user ${user.user.name} joined the session`);
  });
});

httpServer.listen(3001, () => {
  yellow("Server Listening on 3001");
});
