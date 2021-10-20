import data from "../../data/data";
import httpStatus from "../../data/httpStatus";

export let OBJECTS = {};

const URL = `${data.url.localhost}/api/v1/calendar`

export const createReminder = async (json) => {
  try {
    const response = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${json.user.token}`
      },
      body: JSON.stringify(json),
    });

    return response;

  } catch (e) {
    returnError(e)
  }
}

export const getUserObjectsFromADate = async (user, date) => {
  try {
    const response = await fetch(`${URL}/id=${user.email}&date=${date}`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
        },
    }).then(res => res.json());

    return response;

  } catch (e) {
    return returnError(e);
  }
}

export const deleteUserReminder = async (user, reminderId) => {
  try {
    const response = await fetch(`${URL}/${reminderId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
    })

    return response;

  } catch (e) {
    returnError(e)
  }
}

export const updateUserReminder = async (json) => {
  const { user } = json;

  try {
    const response = await fetch(`${URL}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(json),
    }).then(res => res.json());

    return response;

  } catch (e) {
    returnError(e)
  }
}

function returnError(e) {
  console.log("We got an error!");
  console.error(e);
  return httpStatus.SERVER_ERROR;
}
