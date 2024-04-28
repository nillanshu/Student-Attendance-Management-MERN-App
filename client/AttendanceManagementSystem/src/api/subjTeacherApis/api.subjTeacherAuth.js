import axios from 'axios';

export default async function subjTeacherAuth() {
    const res = await axios.post('/user/subjTeacher/authenticate', {
        headers: {
          "Content-Type": "application/json"
        }
    });
    if(res.status !== 200) {
        const error = new Error(res.error);
        throw error;
    }
    const rootUser = res.data;
    return rootUser;
}