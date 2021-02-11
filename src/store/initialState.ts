// дополнения к классу alert для AppMessage
export type MessageType = "warning" | "danger" | "primary";

// расшифровка заголовка для AppMessage
export const MESSAGE_TITLE_MAP: Record<MessageType, string> = {
  primary: "Успешно",
  danger: "Ошибка",
  warning: "Предупреждение",
};

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
    type: "primary" as MessageType,
  },
  products: {
    categoryList: [] as Array<string>, // перечень категорий
    searchString: "",
  },
};
