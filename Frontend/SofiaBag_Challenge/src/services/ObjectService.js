import data from "../../data/data";
import httpStatus from "../../data/httpStatus";

export let OBJECTS = {};

const URL = `${data.url.localhost}/api/v1/backpack`

export const createUserObject = async (json) => {
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
        return error(e);
    }
}

export const getUserObjects = async (user) => {
    try {
        const response = await fetch(`${URL}/${user.id}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
        }).then((res) => res.json());

        return response;

    } catch (e) {
        return error(e);
    }
}

export const deleteUser = async (user, objectId) => {
    try {
        const response = await fetch(`${URL}/userId=${user.id}&objectId=${objectId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
        })

        return response;

    } catch (e) {
        return error(e);
    }
}

export const updateUserObject = async (json) => {
    const { user, cdRfid } = json;

    try {
        const response = await fetch(`${URL}/userId=${user.id}&objectId=${cdRfid}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(json),
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