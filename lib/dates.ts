export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, '0'); // Ensure two digits
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Ensure two digits

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};
