import { fbApp } from "./FBCustInit";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Database, DataSnapshot } from "@firebase/database-types";

// let fbAppDatabaseTs: Database;
export let fbAppDatabaseTs: Database;
let fbAppDatabaseTsInitialized = false;

export function loadFirebaseDatabaseAsyncModule(): void {
  import(
    /* webpackChunkName: "firebase-database" */
    /* webpackMode: "lazy" */
    "firebase/database"
  ).then(() => {
    if (fbApp) {
      fbAppDatabaseTs = (fbApp as unknown).database();
      fbAppDatabaseTsInitialized = true;
      console.log("Firebase Database инициализирован");
    } else {
      //  буду считать что app загружен и инициализирован
      throw new Error("Firebase fbApp не загружен");
    }
  });
}

export function CheckFirebaseDatabaseLoad(): void {
  if (!fbAppDatabaseTsInitialized) {
    loadFirebaseDatabaseAsyncModule();
    throw new Error("Подождите - идет загрузка модуля авторизации");
  }
}

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
