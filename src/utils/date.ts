export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getTodayDateString = () => formatLocalDate(new Date());

export const addDays = (dateString: string, delta: number) => {
  const date = parseLocalDate(dateString);
  date.setDate(date.getDate() + delta);
  return formatLocalDate(date);
};

export const getDateLabel = (dateString: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(parseLocalDate(dateString));
