export const timeDuration = (
  selectedDate: Date,
  currentDate: Date = new Date()
) => {
  Math.floor(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ) -
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
  ) /
    (1000 * 60 * 60 * 24);
};
