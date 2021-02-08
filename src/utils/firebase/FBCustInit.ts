import { firebaseConfig } from "../../../fbconf";
import { loadFirebaseDatabaseAsyncModule } from "./FBCustDatabase";
import { store } from "@/store";
import { hearFirebaseAuthEvent } from "./FBCustAuth";
import { FirebaseApp, FirebaseNamespace } from "@firebase/app-types";
import { FirebaseAuth } from "@firebase/auth-types";

export let fbApp: FirebaseApp;
export let fbAppAuth: FirebaseAuth;
export const listenersCallbacks = []; // будут вызываны зарегистрированные слушатели

// в этот модуль включим инициализацию Firebase
import(
  /* webpackChunkName: "firebase-app" */
  /* webpackMode: "lazy" */
  "firebase/app"
).then((fbAppProp) => {
  // блок выполняется один раз
  // инициализация Firebase
  const fbAppNs: FirebaseNamespace = (fbAppProp.default as unknown) as FirebaseNamespace;

  fbApp = fbAppNs.initializeApp(firebaseConfig);

  import(
    /* webpackChunkName: "firebase-auth" */
    /* webpackMode: "lazy" */
    "firebase/auth"
  ).then(() => {
    fbAppAuth = ((fbApp as any).auth() as unknown) as FirebaseAuth;
    console.log("Система авторизации инициализирована");

    store.commit("Auth/storeFirebaseCurrentUser");
    hearFirebaseAuthEvent();

    // данная функция вызывается после инициализации auth - Значит пора инициализировать DB
    loadFirebaseDatabaseAsyncModule();

    // после получения интерфейса вызвать зарегистрированных слушателей
    console.log(
      `Firebase listenersCallbacks has ${listenersCallbacks.length} elements`
    );
    listenersCallbacks.map(
      (funcCallBack: (fbAppAuth: FirebaseAuth) => void) => {
        funcCallBack(fbAppAuth);
      }
    );
  });
});
