export const saveToCache = (id, val) => {
    if (val === "") {
        localStorage.removeItem(id);
    } else {
        localStorage.setItem(id, val);
    }
};

export const getFromCache = (id) => {
    if (!localStorage.getItem(id)) {
        return "";
    } else {
        return localStorage.getItem(id);
    }
};