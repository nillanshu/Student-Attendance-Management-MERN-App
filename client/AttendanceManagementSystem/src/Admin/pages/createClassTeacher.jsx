import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import * as api from '../../api/adminApis/api.classTeachers';
import {fetchClasses} from '../../api/adminApis/api.Classes';

const CreateClassTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNo: '',
    classId: '',
    classArmId: '',
    subjId: ''
  });
  const [classArms, setClassArms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const location = {
    currentPage: 'Create Class Teacher',
    route: '/Admin/createClassTeacher'
  };

  useEffect(() => {
    fetchClasses().then(data => {
      setClasses(data);
    });
    api.fetchClassTeachers()
    .then(data => {
      setTeachers(data);
      setFilteredTeachers(data);
    })
    .catch(error => {
      console.error('Error:', error);
      navigate('/login');
    });
    api.fetchSubjects().then(data => {
      setSubjects(data);
    });
  }, []);

  useEffect(() => {
    if (teacherInfo.classId) {
      api.fetchClassArmsByClass(teacherInfo.classId).then(data => {
        console.log(data);
        if (Array.isArray(data)) {
          setClassArms(data);
        }
      });
    }
  }, [teacherInfo.classId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.createClassTeacher(teacherInfo.firstName, teacherInfo.lastName, teacherInfo.emailAddress, teacherInfo.phoneNo, teacherInfo.classId, teacherInfo.classArmId, teacherInfo.subjId);
      setStatusMsg('Class Teacher created successfully');

      setTeacherInfo({});

      const data = await api.fetchClassTeachers();
      console.log(data);
      setTeachers(data);
      setFilteredTeachers(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while submitting the form');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteClassTeacher(id);
      setStatusMsg('Class Teacher deleted successfully');
      const data = await api.fetchClassTeachers();
      setTeachers(data);
      setFilteredTeachers(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while deleting the Class Teacher');
    }
  };

  function handleFilter(e) {
    let filterValue = e.target.value.toLowerCase();
    if (filterValue === '') {
      setFilteredTeachers(teachers);
    } else {
      let newData = teachers.filter(row => {
        return row.firstName.toLowerCase().includes(filterValue.toLowerCase())
          || row.lastName.toLowerCase().includes(filterValue.toLowerCase())
          || row.id.toString().includes(filterValue)
          || row.tblclass.className.toString().toLowerCase().includes(filterValue.toLowerCase())
          || row.emailAddress.toString().includes(filterValue.toLowerCase());
      });
      setFilteredTeachers(newData);
    }
  }

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
    },
    {
      name: 'Email Address',
      selector: row => row.emailAddress,
      sortable: true,
    },
    {
      name: 'Phone No',
      selector: row => row.phoneNo,
      sortable: false,
    },
    {
      name: 'Class',
      selector: row => row.tblclass.className,
      sortable: false,
    },
    {
      name: 'Class Arm',
      selector: row => row.tblclassarm.classArmName,
      sortable: false,
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
        <p>Delete</p>
      ]
    },
  ];

  const handleChange = (e) => {
    setTeacherInfo({
      ...teacherInfo,
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
              <h6 className="m-0 font-weight-bold text-primary">Create Class Teacher</h6>
                {statusMsg}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                  <div className="col-xl-6">
                    <label className="form-control-label">First Name<span className="text-danger ml-2">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={teacherInfo.firstName}
                      onChange={handleChange}
                      id="exampleInputFirstName"
                      placeholder="Your First Name"
                      required
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Last Name<span className="text-danger ml-2">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={teacherInfo.lastName}
                      onChange={handleChange}
                      id="exampleInputLastName"
                      placeholder="Your Second Name"
                      required
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Email Address<span className="text-danger ml-2">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="emailAddress"
                      value={teacherInfo.emailAddress}
                      onChange={handleChange}
                      id="exampleInputEmailAddress"
                      placeholder="Your Email Address"
                      required
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Phone No<span className="text-danger ml-2">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNo"
                      value={teacherInfo.phoneNo}
                      onChange={handleChange}
                      id="exampleInputPhoneNo"
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Select Class<span className="text-danger ml-2">*</span></label>
                    <select
                      className="form-control"
                      name="classId"
                      value={teacherInfo.classId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">--Select Class--</option>
                      {classes ? classes.map((classItem, index) => (
                        <option key={index} value={classItem.id}>
                          {classItem.className}
                        </option>
                      )) : []}
                    </select>
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Select Arm<span className="text-danger ml-2">*</span></label>
                    <select
                      className="form-control"
                      name="classArmId"
                      value={teacherInfo.classArmId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">--Select Class Arm--</option>
                      {classArms ? classArms.map((ArmItem, index) => (
                        <option key={index} value={ArmItem.Id}>
                          {ArmItem.classArmName}
                        </option>
                      )) : []}
                    </select>
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Select Arm<span className="text-danger ml-2">*</span></label>
                    <select
                      className="form-control"
                      name="subjId"
                      value={teacherInfo.subjId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">--Select Subject--</option>
                      {subjects ? subjects.map((SubjItem, index) => (
                        <option key={index} value={SubjItem.id}>
                          {SubjItem.subjName}
                        </option>
                      )) : []}
                    </select>
                  </div>
                </div>
                <button type="submit" className='btn btn-primary'>Save</button>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">All Class Teachers</h6>
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
                    title="All Class Teachers"
                    columns={columns}
                    data={filteredTeachers}
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

export default CreateClassTeacher;