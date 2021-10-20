import data from "../../data/data";
import httpStatus from "../../data/httpStatus";

const URL = `${data.url.localhost}/api/v1/login`;

export const signIn = async (json) => {
    try {
        const response = await fetch(`${URL}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json)
        }).then(res => res.json());

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

