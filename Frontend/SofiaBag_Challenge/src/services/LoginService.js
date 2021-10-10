export const validateLogin = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/login/test', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'emilyputinha@gmail.com',
                password: 'emilyquerumchadepica'
            })
        });

    } catch (e) {
        console.error(e);
    }
}
