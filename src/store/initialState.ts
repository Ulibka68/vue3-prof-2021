export type MessageType = "warning" | "danger" | "primary";

const msgType: MessageType = "primary";

export const initialState = {
  counter: {
    counter: 0,
  },
  auth: {
    displayName: "Неизвестный",
    email: "",
    emailVerified: false,
    uid: null,
    provider: "email",
  },
  logedUser: {
    displayName: "",
    email: "",
    uid: "",
    provider: "email",
    isAuth: false,
  },
  sidebar: false,
  message: {
    value: "",
    type: msgType as MessageType,
  },
};
