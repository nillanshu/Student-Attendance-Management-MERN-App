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

export async function fetchAllStudents() {
    const res = await axios.get('/user/classTeacher/getAllStudents');
    if(res.status !== 200) {
        const error = new Error(res.error);
        throw error;
    }
    return res;
}

export async function fetchStudentAttendance(studentAttnInfo) {
    const res = await axios.post('/user/classTeacher/viewStudentAttendance', 
        { 
            dateType: studentAttnInfo.dateType,
            admissionNumber: studentAttnInfo.admissionNumber,
            dateTimeTaken: studentAttnInfo.dateTimeTaken,
            fromDate: studentAttnInfo.fromDate,
            toDate: studentAttnInfo.toDate
        },
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