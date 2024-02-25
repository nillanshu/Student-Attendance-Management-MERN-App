import axios from 'axios';

export default async function callDashboardPage() {
    const res = await axios.post('/user/student/dashboard', {
        headers: {
          "Content-Type": "application/json"
        }
    });
    if(res.status !== 200) {
        const error = new Error(res.error);
        throw error;
    }
    const data = res.data;
    return data;
}