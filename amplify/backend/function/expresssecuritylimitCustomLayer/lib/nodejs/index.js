const generateDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date().getDate().toString();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const hours = new Date().getHours() + 3;
  const minutes = new Date().getMinutes();

  const time = `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
  let dateStr = "";

  switch (date) {
    case date.endsWith("1"):
      dateStr = `${months[month]} ${date}st ${year}`;
      break;
    case date.endsWith("2"):
      dateStr = `${months[month]} ${date}nd ${year}`;
      break;
    case date.endsWith("3"):
      dateStr = `${months[month]} ${date}rd ${year}`;
      break;
    default:
      dateStr = `${months[month]} ${date}th ${year}`;
      break;
  }
  return {
    time: time,
    date: dateStr,
  };
};

function removeCharacters(str) {
  const strArray = [...str.split(" ")];
  const filtered = strArray.filter(
    (item) => item !== "&" && item !== "/" && item !== "|" && item !== "."
  );
  return filtered.map((item) => item.toLowerCase().replace(".", ""));
}

const generatePath = (text) => {
  let copiedText = removeCharacters(text);
  const str = copiedText;
  return str.join("-");
};

module.exports = { generateDate, generatePath };
