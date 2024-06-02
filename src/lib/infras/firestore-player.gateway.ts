import { getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { PlayerGateway } from "../models/gateways/player.gateway";
import { Player } from "../models/player";

export class FirestorePlayerGateway implements PlayerGateway {
  private fetchData = async (): Promise<Player[]> => {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "player"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Player;
    });
  };

  getAll = async (): Promise<Player[]> => {
    return await this.fetchData();
  };
}
