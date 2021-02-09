const ERROR_CODES = {
  EMAIL_NOT_FOUND: "Пользователь с таким email не был найден",
  INVALID_PASSWORD: "Неверный пароль",
  auth: "Пожалуйста войдите в систему",
};

export type ErrorCodes = keyof typeof ERROR_CODES;

export function error(code: ErrorCodes): string {
  return ERROR_CODES[code] ?? "Неизвестная ошибка";
}
