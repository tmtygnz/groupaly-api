import { initializeApp, cert } from "firebase-admin/app";
import {
  DocumentData,
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";
import { apps } from "firebase-admin";
import { config } from "dotenv";
import { IUser } from "./IUser";
import { createHash, randomBytes } from "crypto";

config();

if (!apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE!);

  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

class database {
  async generateKey(): Promise<string> {
    const randKey = randomBytes(265).toString();
    const hashedKey = await createHash("sha256").update(randKey).digest("hex");
    return hashedKey;
  }

  async getUser(uid: string): Promise<string | DocumentData> {
    /**
     * Get's user info of uid and only send .data
     */
    console.log(uid);
    const user = await db.collection("users").doc(uid).get();
    if (user.exists) {
      return user.data()!;
    } else {
      return { message: "User Does Not Exist" };
    }
  }

  async createUser(name: string, uid: string) {
    /**
     * Create a use using the name and uid given.
     */
    console.log(`${name} | ${uid}`);
    const userRef = db.collection("users").doc(uid);
    const user = await userRef.get();
    if (user.exists) {
      return { message: "User Already Created" };
    } else {
      let userTemplate: IUser = {
        name: name,
        dateCreated: Timestamp.now(),
        uid: uid,
        key: await this.generateKey(),
        sessionsCompletedThisWeek: [0],
        taskCompletedThisWeek: [0],
        numSessionsCompleted: 0,
        numTaskCompleted: 0,
      };
      userRef.set(userTemplate);
      return { message: "User Created", data: userTemplate };
    }
  }
}

export default database;
