import axios from 'axios';

export async function fetchAttendance(studentAttnInfo) {
    const res = await axios.get('/user/student/viewAttendance', 
        {
            params: {
                dateType: studentAttnInfo.dateType,
                dateTimeTaken: studentAttnInfo.dateTimeTaken,
                fromDate: studentAttnInfo.fromDate,
                toDate: studentAttnInfo.toDate
            },
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