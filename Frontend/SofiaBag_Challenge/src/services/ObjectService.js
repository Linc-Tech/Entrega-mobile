import data from "../../data/data";
import httpStatus from "../../data/httpStatus";

export let OBJECTS = {};

const URL = `${data.url.localhost}/api/v1/object`

export const createUserObject = async (json) => {
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
        console.log("We got an error!");
        console.error(e);
        return httpStatus.SERVER_ERROR;
    }
}

export const getUserObjects = async () => {
    const userId = "DJOI208";

    try {
        const response = await fetch(`${URL}/${userId}`)
            .then((res) => res.json());

        return response;

    } catch (e) {
        console.log("We got an error!");
        console.error(e);
        return httpStatus.SERVER_ERROR;
    }
}

export const deleteUser = async (userId, objectId) => {
    userId = "DJOI208";

    try {
        const response = await fetch(`${URL}/userId=${userId}&objectId=${objectId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })

        return response;

    } catch (e) {
        console.log("We got an error!");
        console.error(e);
        return httpStatus.SERVER_ERROR;
    }
}

export const updateUserObject = async (json) => {
    const userId = json.user.id;
    const { cdRfid } = json;

    try {
        const response = await fetch(`${URL}/userId=${userId}&objectId=${cdRfid}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
        });

        return response;

    } catch (e) {
        console.log("We got an error!");
        console.error(e);
        return httpStatus.SERVER_ERROR;
    }
}