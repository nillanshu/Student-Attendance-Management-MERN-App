import axios from 'axios';

export default async function callAdminPage() {
    const res = await axios.post('/user/admin/dashboard', {
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