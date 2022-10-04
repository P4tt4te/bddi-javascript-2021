export const formatDate = (date) => {
  let newdate = new Date(date);
  let minutes = newdate.getMinutes();
  minutes < 10 && (minutes = "0" + minutes);
  return (
    newdate.getDate() +
    "/" +
    (newdate.getMonth() + 1) +
    "/" +
    newdate.getFullYear() +
    " : " +
    newdate.getHours() +
    "h" +
    minutes
  );
};
