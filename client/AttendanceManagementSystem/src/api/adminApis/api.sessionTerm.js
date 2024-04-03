import axios from 'axios';

export async function fetchSessions() {
    const res = await axios.get('/user/admin/getAllSessionTerms', {
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

export async function fetchTerms() {
    const res = await axios.get('/user/admin/getAllTerms', {
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

export async function createSession(sessionName, termId, isActive) {
    const res = await axios.post('/user/admin/createSession',
        { sessionName, termId, isActive },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    if(res.status !== 201) {
        const error = new Error(res.error);
        throw error;
    }
};

export async function editSession(editId, sessionName, termId, isActive) {
    const res = await axios.patch(`/user/admin/editSession/${editId}`,
        { sessionName, termId, isActive },
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

export async function deleteSession(deleteId) {
    const res = await axios.delete(`/user/admin/deleteSession/${deleteId}`,
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
