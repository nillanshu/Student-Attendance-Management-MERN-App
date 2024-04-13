import axios from 'axios';

export async function fetchClassAttendance(date) {
    const res = await axios.post('/user/classTeacher/viewClassAttendance', 
        { dateTimeTaken: date },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    if(res.status !== 200) {
        const error = new Error(res.error);
        throw error;
    }
    return res;
}
