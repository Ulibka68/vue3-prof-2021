export const statusArr = ["done", "canceled", "active", "pending"] as const;

export type tStatus = typeof statusArr[number];

type tStatusDescriptions = {
  [K in tStatus]: { text: string; className: string };
};

export const statusDescriptions: tStatusDescriptions = {
  done: { text: "Завершен", className: "primary" },
  canceled: { text: "Отменен", className: "danger" },
  active: { text: "Активен", className: "primary" },
  pending: { text: "Выполняется", className: "warning" },
};
