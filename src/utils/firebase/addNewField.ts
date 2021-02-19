import {
  fbAppDatabaseTs,
  loadFirebaseDatabaseAsyncModule,
} from "./FBCustDatabase";

export async function AddQuantityField(): Promise<void> {
  await loadFirebaseDatabaseAsyncModule();

  const querySnapshot = await fbAppDatabaseTs.collection("goods").get();

  querySnapshot.forEach(async (doc) => {
    // doc.data() is never undefined for query doc snapshots
    const allObjectData = { firebaseID: doc.id, ...doc.data() };
    await fbAppDatabaseTs
      .doc("goods/" + allObjectData.firebaseID)
      .update({ quantity: Math.floor(Math.random() * 200) });
    console.log(allObjectData.firebaseID);
  });

  // const docRef = await fbAppDatabaseTs
  //   .doc("cities/DC")
  //   .update({ quantity1: 562 });
  // console.log(docRef);
}
