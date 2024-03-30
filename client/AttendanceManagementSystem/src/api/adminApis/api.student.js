import axios from 'axios';

export async function fetchStudents() {
    const res = await axios.get('/user/admin/getAllStudents', {
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

export async function createStudent(firstName, lastName, emailAddress, admissionNumber, phoneNo, classId, classArmId) {
    try {
        const res = await axios.post('/user/admin/createStudent',
            { firstName, lastName, emailAddress, admissionNumber, phoneNo, classId, classArmId },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if(res.status !== 201) {
            throw new Error('Error in creating Student');
        }

        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('This Student Already Exists!');
        } else {
            throw new Error('An error occurred while creating the Student');
        }
    }
}

// export async function editStudent(editId, firstName) {
//     const res = await axios.patch(`/user/admin/editStudent/${editId}`,
//         { firstName },
//         {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }
//     );
//     if(res.status !== 200) {
//         const error = new Error(res.error);
//         throw error;
//     }
//     const data = res.data;
//     return data;
// };

export async function deleteStudent(deleteId) {
    const res = await axios.delete(`/user/admin/deleteStudent/${deleteId}`,
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
}
