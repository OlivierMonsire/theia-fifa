import { getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { MatchGateway } from "../models/gateways/match.gateway";
import { Match } from "../models/match";

export class FirestoreMatchGateway implements MatchGateway {
  private fetchData = async (): Promise<Match[]> => {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "match"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Match;
      return {
        ...data,
      };
    });
  };

  getAll = async (): Promise<Match[]> => {
    return await this.fetchData();
  };
}
