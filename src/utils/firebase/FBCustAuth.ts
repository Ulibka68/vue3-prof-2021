import { fbAppAuth } from "./FBCustInit";
import { store } from "@/store";
import router from "@/router";
import { UserCredential } from "@firebase/auth-types";

function CheckModuleLoad() {
  if (!fbAppAuth) {
    throw new Error("Подождите - идет загрузка модуля авторизации");
  }
}

/*
  email: string,
  password: string,
  name: string

  возвращает: Promise<logedUserType>
 */
export async function registerNewUser(
  email: string,
  password: string,
  name: string
): Promise<
  | {
      displayName: string;
      email: string;
      emailVerified: boolean;
      uid: string;
    }
  | undefined
> {
  CheckModuleLoad();
  // const data: UserCredential
  const data: UserCredential = await fbAppAuth.createUserWithEmailAndPassword(
    email,
    password
  );

  if (data) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await data!.user!.updateProfile({ displayName: name });

    return {
      displayName: name,
      email: email,
      emailVerified: false,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uid: data!.user!.uid,
    };
  }
}

export async function loginUserByEmail(
  email: string,
  password: string
): Promise<{ result: boolean; errMsg: string }> {
  try {
    CheckModuleLoad();
    // console.log("loginUserByEmail : ", email, password);
    const data: UserCredential = await fbAppAuth.signInWithEmailAndPassword(
      email,
      password
    );
    // console.log("loginUserByEmail end ");
    // console.log(data);

    if (data.user) {
      return { result: true, errMsg: "" };
    } else {
      return {
        result: false,
        errMsg: "вход не выполнен",
      };
    }
  } catch (err) {
    console.log("login filed : ", err.message);
    return {
      result: false,
      errMsg: err.message,
    };
  }
}

export async function logout(): Promise<void> {
  CheckModuleLoad();
  if (fbAppAuth) fbAppAuth.signOut();

  // будет вызвано автоматом по событию
  // store.commit("Auth/storeFirebaseCurrentUser");
}

export function hearFirebaseAuthEvent(): void {
  if (fbAppAuth) {
    // eslint-disable-next-line no-unused-vars
    fbAppAuth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged fired", user?.email, user?.displayName);
      store.commit("auth_storeFirebaseCurrentUser");
      if (user) {
        /*
          Временная заглушка
         */
        if (!user.displayName) {
          switch (user.email) {
            case "leha@leha.ru":
              user.updateProfile({ displayName: "Леха" });
              break;
            case "ivan@ivan.ru":
              user.updateProfile({ displayName: "Иван" });
              break;
          }
        }
        /*
          Временная конец
         */
        router.push({ name: "Home" });
      }
    });
  }
}
