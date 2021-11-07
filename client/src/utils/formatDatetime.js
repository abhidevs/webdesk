const formatDatetime = (datetime) => {
  let d = new Date(datetime);
  let now = new Date();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  let fulldate = `${month} ${date}`;
  year !== now.getFullYear() && (fulldate += `, ${year}`);

  let time = d.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });

//   console.log(fulldate, time);
  if (date === now.getDate()) return time;
  else if (date === now.getDate() - 1) return "yesterday";
  else if (date === now.getDate() + 1) return "tomorrow";
  else return fulldate;
};

export default formatDatetime;
