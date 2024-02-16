import axios from 'axios';

export default async function performLogin(userType, emailAddress, password) {
    try {
        const res = await axios.post('/user/login', {
            userType,
            emailAddress,
            password
        }, {
            headers: {
              "Content-Type": "application/json"
            }
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        return null;
    }
}
