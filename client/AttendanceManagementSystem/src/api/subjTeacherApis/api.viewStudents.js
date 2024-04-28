import axios from 'axios';

export async function fetchStudents() {
    const res = await axios.get('/user/subjTeacher/viewStudents', {
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