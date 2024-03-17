import axios from 'axios';

export async function fetchClassArms() {
    const res = await axios.get('/user/admin/getAllClassArms', {
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

export async function createClassArm(classId, classArmName) {
    const res = await axios.post('/user/admin/createClassArm',
        { classId, classArmName },
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

export async function editClassArm(editId, classId, classArmName) {
    const res = await axios.patch(`/user/admin/editClassArm/${editId}`,
        { classId, classArmName },
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

export async function deleteClassArm(deleteId) {
    const res = await axios.delete(`/user/admin/deleteClassArm/${deleteId}`,
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
