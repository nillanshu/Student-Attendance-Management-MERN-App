import axios from 'axios';
import download from 'downloadjs';

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

export async function loadTakeAttendancePage() {
    const res = await axios.post('/user/classTeacher/loadTakeAttendancePage', {
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

export async function takeAttendance(check) {
    const res = await axios.patch('/user/classTeacher/takeAttendance', 
        { 
            check: check,
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

export async function downloadAttendance() {
    try {
        const res = await axios.get('/user/classTeacher/downloadAttendance', {
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'blob'
        });
        
        download(res.data, 'attendance.xlsx');
    } catch (error) {
        console.error('An error occurred while downloading the attendance file:', error);
    }
}