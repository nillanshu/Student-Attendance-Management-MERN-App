import axios from 'axios';

export async function fetchClasses() {
    const res = await axios.get('/user/admin/getAllClasses', {
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

export async function createClass(className) {
    const res = await axios.post('/user/admin/createClass',
        { className },
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
    const data = res.data;
    return data;
};

export async function editClass(editId, className) {
    const res = await axios.patch(`/user/admin/editClass/${editId}`,
        { className },
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
    const data = res.data;
    return data;
};

export async function deleteClass(deleteId) {
    const res = await axios.delete(`/user/admin/deleteClass/${deleteId}`,
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
