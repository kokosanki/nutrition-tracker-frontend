export const getTodayDateString = () => new Date().toISOString().slice(0, 10);

export const getTodayLabel = () =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date());
