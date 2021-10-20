import data from "../../data/data";
import httpStatus from "../../data/httpStatus";

const URL = `${data.url.localhost}/api/v1/user`;

export const createUser = async (json) => {
  try {
    const response = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
    });

    return response;

  } catch (e) {
    return error(e);
  }
}

export const getUser = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`).then(res => res.json())

    return response;

  } catch (e) {
    return error(e);
  }
}

export const getUserByEmail = async (email, user) => {
  try {
    const response = await fetch(`${URL}/email/${email}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }).then(res => res.json())

    return response;

  } catch (e) {
    return error(e);
  }
}

export const updateUserPassword = async (user) => {
  try {
    const response = await fetch(`${URL}/password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(user),
    });

    return response;

  } catch (e) {
    return error(e);
  }
}

function error(e) {
  console.log("We got an error!");
  console.error(e);
  return httpStatus.SERVER_ERROR;
}