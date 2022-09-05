function time(minutes) {
    if (["2", "3", "4"].includes(minutes.toString().slice(-1))) {
      return "ы";
    }
    else if (minutes.toString().slice(-1) === "1") {
      return "а";
    } else {
      return "";
    }
  }

  export default time