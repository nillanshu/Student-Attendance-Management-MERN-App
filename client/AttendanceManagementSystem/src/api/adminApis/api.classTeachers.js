import axios from 'axios';

export async function fetchClassTeachers() {
    const res = await axios.get('/user/admin/getAllClassTeachers', {
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
};

export async function fetchSubjects() {
    const res = await axios.get('/user/admin/getAllSubjects', {
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
};


export async function fetchClassArmsByClass( classId ) {
    const res = await axios.get('/user/admin/getClassArmsByClass', 
    {
        params: {
          classId
        },
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
};

export async function createClassTeacher(firstName, lastName, emailAddress, phoneNo, classId, classArmId, subjId) {
    try {
        const res = await axios.post('/user/admin/createClassTeacher',
            { firstName, lastName, emailAddress, phoneNo, classId, classArmId, subjId },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if(res.status !== 201) {
            throw new Error('Error in creating class teacher');
        }

        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('This Teacher Already Exists!');
        } else {
            throw new Error('An error occurred while creating the class teacher');
        }
    }
};

export async function deleteClassTeacher(deleteId) {
    const res = await axios.delete(`/user/admin/deleteClassTeacher/${deleteId}`,
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
};
