import { initializeApp, cert } from "firebase-admin/app";
import { DocumentData, getFirestore } from "firebase-admin/firestore";
import { apps } from "firebase-admin";
import { config } from "dotenv";

config();

if (!apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE!);

  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

class database {
  async getUser(uid: string): Promise<string | DocumentData> {
    /**
     * Get's user info of uid and only send .data
     */
    const user = await db.collection("users").doc(uid).get();
    if (user) {
      return user.data()!;
    } else {
      return "User Does Not Exist";
    }
  }
}

export default database;
