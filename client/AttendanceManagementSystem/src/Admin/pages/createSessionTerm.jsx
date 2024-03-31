import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import * as api from '../../api/adminApis/api.sessionTerm';
// import { fetchClassArmsByClass } from '../../api/adminApis/api.classTeachers';
// import {fetchClasses} from '../../api/adminApis/api.Classes';

const CreateSessionTerm = () => {
  const [sessions, setSessions] = useState([]);
  const [sessionInfo, setSessionInfo] = useState({
    sessionName: '',
    termId: '',
    isActive: '',
  });
  const [terms, setTerms] = useState([]);
  const [editId, setEditId] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [filteredSessions, setFilteredSessions] = useState([]);

  const location = {
    currentPage: 'Create Session & Term',
    route: '/Admin/createSessionTerm'
  };

  useEffect(() => {
    api.fetchSessions()
    .then(data => {
      setSessions(data);
      setFilteredSessions(data);
    })
    .catch(error => {
      console.error('Error:', error);
      navigate('/login');
    });
    api.fetchTerms()
    .then(data => {
      setTerms(data);
    });

  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      if (editId) {
        await api.editSession(editId, sessionInfo.sessionName, sessionInfo.termId, sessionInfo.isActive);
        setStatusMsg('Session edited successfully');
      } else {
        await api.createSession(sessionInfo.sessionName, sessionInfo.termId, sessionInfo.isActive);
        setStatusMsg('Session created successfully');
      }

      setSessionInfo({
        sessionName: '',
        termId: '',
        isActive: '',
      });
      setEditId(null);

      const data = await api.fetchSessions();
      setSessions(data);
      setFilteredSessions(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while submitting the form');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSession(id);
      setStatusMsg('Session deleted successfully');
      const data = await api.fetchSessions();
      setSessions(data);
      setFilteredSessions(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while deleting the Session');
    }
  };

  const handleEdit = (id) => {
    const sessionToEdit = sessions.find((c) => c.id === id);
    setSessionInfo({
      sessionName: sessionToEdit.sessionName,
      termId: sessionToEdit.termId,
      isActive: sessionToEdit.isActive
    });
    setEditId(id);
  };

  function handleFilter(e) {
    let filterValue = e.target.value.toLowerCase();
    if (filterValue === '') {
      setFilteredSessions(sessions);
    } else {
      let newData = sessions.filter(row => {
        return row.sessionName.toLowerCase().includes(filterValue)
          || row.id.toString().includes(filterValue)
          || row.tblterm.termName.toString().toLowerCase().includes(filterValue);
      });
      setFilteredSessions(newData);
    }
  }

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Session Name',
      selector: row => row.sessionName,
      sortable: true,
    },
    {
      name: 'Term Name',
      selector: row => row.tblterm.termName,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.isActive ? '✅' : '❌',
    },
    {
      name: "Edit",
      sortable: false,
      selector: row => null,
      cell: (row) => [
        <i
          key={row.title}
          onClick={() => handleEdit(row.id)}
          className="first fas fa-pen"
        ></i>,
      ]
    },
    {
      name: "Delete",
      sortable: false,
      selector: row => null,
      cell: (row) => [
        <i
          key={row.title}
          onClick={() => handleDelete(row.id)}
          className="first fas fa-trash-alt"
        ></i>,
      ]
    },
  ];

  const handleChange = (e) => {
    setSessionInfo({
      ...sessionInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container-fluid" id="container-wrapper">
      <Location location={location} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Create Session & Term</h6>
                {statusMsg}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                  <div className="col-xl-6">
                    <label className="form-control-label">Session Name<span className="text-danger ml-2">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="sessionName"
                      value={sessionInfo.sessionName}
                      onChange={handleChange}
                      id="exampleInputSessionName"
                      placeholder="Session Name"
                      required
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Select Status<span className="text-danger ml-2">*</span></label>
                    <select
                      className="form-control"
                      name="isActive"
                      value={sessionInfo.isActive}
                      onChange={handleChange}
                      required
                    >
                      <option value="">--Select Status--</option>
                      <option value='1'>
                        Active
                      </option>
                      <option value='0'>
                        Inactive
                      </option>
                    </select>
                  </div> 
                  <div className="col-xl-6">
                    <label className="form-control-label">Select Term<span className="text-danger ml-2">*</span></label>
                    <select
                      className="form-control"
                      name="termId"
                      value={sessionInfo.termId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">--Select Term--</option>
                      {terms ? terms.map((termItem, index) => (
                        <option key={index} value={termItem.id}>
                          {termItem.termName}
                        </option>
                      )) : []}
                    </select>
                  </div>                 
                </div>
                <button type="submit" className={editId ? 'btn btn-warning' : 'btn btn-primary'}>{editId ? 'Update' : 'Save'}</button>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">All Session</h6>
                </div>
                <div className="table-responsive p-3">
                  <div className="form-group row mb-3">
                    <div className='ml-3'>
                      <label className="form-control-label mr-2">Search:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleFilter}
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <DataTable
                    className=''
                    title="All Students"
                    columns={columns}
                    data={filteredSessions}
                    noHeader
                    pagination
                    defaultSortField="id"
                    defaultSortAsc={true}
                    highlightOnHover
                    fixedHeader
                  ></DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSessionTerm;