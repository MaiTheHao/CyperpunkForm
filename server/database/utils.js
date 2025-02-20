import DB from './store.js';

export const findUserByUsername = (username) => {
    return DB.users.find((user) => user.username === username);
};

export const findUserByEmail = (email) => {
    return DB.users.find((user) => user.email === email);
};

export const addUser = (userData) => {
    const newUser = {
        id: DB.users.length + 1,
        ...userData,
    };
    DB.users.push(newUser);
    return newUser;
};