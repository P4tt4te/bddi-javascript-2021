export const formatDate = (date) => {
  let messageDate = new Date(date).getTime();
  let actualDate = new Date().getTime();

  let val = actualDate - messageDate;
  let secondes = Math.floor(val / 1000);
  let minutes = 0;
  while (secondes > 59) {
    secondes = secondes - 60;
    minutes++;
  };
  if(minutes > 1) {
    return minutes + " min" ;
  } else if (secondes < 10) {
    return "À l'instant";
  } else {
    return secondes + " s";
  }
};
