export const lsSave = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const lsReadArray = (key) => JSON.parse(localStorage.getItem(key)) || [];