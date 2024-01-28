const token = {
  get: (type: string) => {
    const item = localStorage.getItem(type || "user:token");
    return item;
  },
  remove: (type: string) => {
    const item = localStorage.removeItem(type || "user:token");
    return item;
  },
  set: (type: string, newToken: string) => {
    const item = localStorage.setItem(type || "user:token", newToken);
    return item;
  },
};

export default token;
