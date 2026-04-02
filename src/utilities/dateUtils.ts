/**
 * Returns an array of Date objects representing all days of a given month.
 * @returns {Date[]} Array of Date objects for each day of the given month
 */
export function getDaysOfMonth(year: number, month: number): Date[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: Date[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}

// retorna a quantidade de dias desde a o dia de criação
export function daysSinceCreation(
  createdAt: Date | null,
  currentDate: Date,
): number | null {
  if (!createdAt) return null;

  const start = new Date(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate(),
  );

  const end = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const msPerDay = 1000 * 60 * 60 * 24;

  return Math.floor((end.getTime() - start.getTime()) / msPerDay);
}

export function formatDate(fullDate: string | Date): string {
  const date = new Date(fullDate);
  return date.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

// retorna a diferença em dias entre duas datas
export function diffInDays(date1: string, date2: string): number {
  const [y1, m1, d1] = date1.split("-").map(Number);
  const [y2, m2, d2] = date2.split("-").map(Number);

  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);

  const diffInMs = utc2 - utc1;

  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

export function formatDateForInput(date: string) {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function parseTimeToDate(time: string): Date | null {
  if (!time) return null;

  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date;
}

export function parseDateToDatabase(inputDate: string | undefined) {
  if (!inputDate) return;

  const [year, month, day] = inputDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatToYearMonthDay(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getWeekDay(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
  });
}

export function formatDateString(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export function getDayFromFormatedDateString(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return day;
}

export function formatDay(dateString: string): string {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}
