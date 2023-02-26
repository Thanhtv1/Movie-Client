const USER_DATA = "USER_DATA";
const HISTORY = "HISTORY";

export const localStorageService = {
  user: {
    set: function (user) {
      const dataJSON = JSON.stringify(user);
      localStorage.setItem(USER_DATA, dataJSON);
    },
    get: function () {
      const dataJSON = localStorage.getItem(USER_DATA)
        ? JSON.parse(localStorage.getItem(USER_DATA))
        : {};
      return dataJSON;
    },
    setHistory: function (items) {
      const dataJSON = localStorage.getItem(HISTORY);
      if (dataJSON) {
        const parse = JSON.parse(dataJSON);
        const isAvailable = parse.find((d) => d.id * 1 === items.id * 1);
        if (!isAvailable) {
          const updateHistory = [...parse, items];
          localStorage.setItem(HISTORY, JSON.stringify(updateHistory));
        }
      } else {
        const newHistory = [];
        newHistory.push(items);
        localStorage.setItem(HISTORY, JSON.stringify(newHistory));
      }
    },
    getHistory: function () {
      const dataJSON = localStorage.getItem(HISTORY)
        ? JSON.parse(localStorage.getItem(HISTORY))
        : null;
      return dataJSON;
    },
    remove: function () {
      localStorage.removeItem(USER_DATA);
      localStorage.removeItem(HISTORY);
    },
  },
};
