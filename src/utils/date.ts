export const getTodayDateString = () => new Date().toISOString().slice(0, 10);

export const addDays = (dateString: string, delta: number) => {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
};

export const getDateLabel = (dateString: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date(`${dateString}T00:00:00Z`));
