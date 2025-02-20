import { findUserByUsername, findUserByEmail, addUser } from './utils.js';

export const loginService = ({ username, password }) => {
  const user = findUserByUsername(username);
  
  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== password) {
    throw new Error('Invalid password');
  }

  const { password: _, ...userData } = user;
  return userData;
};

export const signupService = ({ username, email, password, ...otherData }) => {
  if (findUserByUsername(username)) {
    throw new Error('Username already exists');
  }

  if (findUserByEmail(email)) {
    throw new Error('Email already exists');
  }

  const newUser = addUser({
    username,
    email,
    password,
    ...otherData
  });

  const { password: _, ...userData } = newUser;
  return userData;
};