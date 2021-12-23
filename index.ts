import express from "express";
import database from "./firebase/user/user";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { getQuote } from "./quote/quote";
import { green, red, yellow } from "./clog/clog";
import cors from "cors";
import {
  addParticipant,
  getParticipantsFromSession,
  IParticipant,
  participants,
  removeParticipant,
  sockets,
} from "./session/user";

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
  const name = req.headers.username;
  const uid = req.headers.userid;
  const createUserResp = await db.createUser(
    name?.toString()!,
    uid?.toString()!
  );
  red(JSON.stringify(createUserResp.data));
  res.send(createUserResp.data);
});

io.on("connection", (socket: Socket) => {
  green("A User Connected Through Sockets");
  socket.on("me-join", (user: IParticipant) => {
    red(`${user} | ${user.sid}`);
    socket.join(user.sid);
    addParticipant(user.user, user.sid, socket);

    //get users
    const participants = getParticipantsFromSession(user.sid);
    io.sockets.in(user.sid).emit("user-join", participants);
  });
  socket.on("disconnecting", () => {
    for (const room in socket.rooms) {
      console.log(room);
      if (room == socket.id) {
        io.in(socket.id).emit(
          "user-left",
          `${participants[sockets.indexOf(socket)].user.name} left`
        );
      }
    }
    yellow("A user is disconnecting");
    removeParticipant(socket);
  });
});

httpServer.listen(3001, () => {
  yellow("Server Listening on 3001");
});
