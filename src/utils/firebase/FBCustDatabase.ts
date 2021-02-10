import { fbApp, fbAppNs } from "./FBCustInit";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FirebaseFirestore } from "@firebase/firestore-types";

// let fbAppDatabaseTs: Database;
export let fbAppDatabaseTs: FirebaseFirestore;
let fbAppDatabaseTsInitialized = false;

export async function loadFirebaseDatabaseAsyncModule(): Promise<boolean> {
  if (fbAppDatabaseTsInitialized) {
    return true;
  }

  await import(
    /* webpackChunkName: "firebase-database" */
    /* webpackMode: "lazy" */
    "firebase/firestore"
  );
  if (fbApp) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbAppDatabaseTs = (fbAppNs as any).firestore(fbApp);
    fbAppDatabaseTsInitialized = true;
    console.log("Firebase Database инициализирован");
    return true;
  } else {
    //  буду считать что app загружен и инициализирован
    throw new Error("Firebase fbApp не загружен");
  }
}

/*
export async function addUser({
  displayName,
  uid,
}: {
  displayName: string;
  uid: string;
}): Promise<void> {
  CheckFirebaseDatabaseLoad();
  return await fbAppDatabaseTs.ref("users/" + uid).set(displayName);
}

 */

/*
export async function NewData(uid, blocks) {
  CheckFirebaseDatabaseLoad();

  try {
    const taskNewRef = await fbAppDatabaseTs.ref("tasks/" + uid).push();
    blocks.createdAt = Date.now();
    await taskNewRef.set(blocks);

    return { result: true, msg: "", taskNewRef: taskNewRef.key };
  } catch (error) {
    return { result: false, msg: "Ошибка записи в бд " + error.message };
  }
}

export function readPost(uid: string): Promise<onePostType[]> {

  CheckFirebaseDatabaseLoad();
  return (
    fbAppDatabaseTs
      .ref("post/" + uid)
      .once("value")
      // .then((snapshot: DataSnapshot) => {
      .then((snapshot) => {
        // console.log(" данные прочитаны", snapshot.val());
        return snapshot.val();
      })
      .catch((e) => {
        console.error("Ошибка бд", e);
      })
  );
}
*/
