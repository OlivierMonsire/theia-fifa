import { getDocs, collection, QuerySnapshot, DocumentData, setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { MatchGateway } from "../models/gateways/match.gateway";
import { Match } from "../models/match";
import { v4 as uuidv4 } from "uuid";

export class FirestoreMatchGateway implements MatchGateway {
  matches: Match[] = [];

  getAll = async (): Promise<Match[]> => {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "match"));
    this.matches = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Match;
    });
    return this.matches;
  };

  async persist(match: Match): Promise<void> {
    const index = this.matches.findIndex(
      (m) =>
        [match.homePlayerId, match.visitorPlayerId].includes(m.homePlayerId) &&
        [match.homePlayerId, match.visitorPlayerId].includes(m.visitorPlayerId)
    );
    if (index === -1) {
      match.id = uuidv4();
    }
    try {
      await setDoc(doc(db, "match", match.id), match);
      if (index === -1) {
        this.matches.push(match);
      } else {
        this.matches[index] = { ...this.matches[index], ...match };
      }
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }
}
