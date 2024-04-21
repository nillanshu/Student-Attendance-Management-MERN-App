import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import CustomPagination from '../../components/CustomPagination';
import * as api from '../../api/adminApis/api.student';
import { fetchClassArmsByClass } from '../../api/adminApis/api.classTeachers';
import {fetchClasses} from '../../api/adminApis/api.Classes';

const CreateStudent = () => {
  const [students, setStudents] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    admissionNumber: '',
    phoneNo: '',
    classId: '',
    classArmId: ''
  });
  const [classArms, setClassArms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const location = {
    currentPage: 'Create Student',
    route: '/Admin/createStudent'
  };

  useEffect(() => {
    fetchClasses().then(data => {
      setClasses(data);
    });
    api.fetchStudents()
    .then(data => {
      setStudents(data);
      setFilteredStudents(data);
    })
    .catch(error => {
      console.error('Error:', error);
      navigate('/login');
    });
  }, []);

  useEffect(() => {
    if (studentInfo.classId) {
      fetchClassArmsByClass(studentInfo.classId).then(data => {
        if (Array.isArray(data)) {
          setClassArms(data);
        }
      });
    }
  }, [studentInfo.classId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.createStudent(studentInfo.firstName, studentInfo.lastName, studentInfo.emailAddress, studentInfo.admissionNumber, studentInfo.phoneNo, studentInfo.classId, studentInfo.classArmId);
      setStatusMsg('Student created successfully');

      setStudentInfo({
        firstName: '',
        lastName: '',
        emailAddress: '',
        admissionNumber: '',
        phoneNo: '',
        classId: '',
        classArmId: ''
      });

      const data = await api.fetchStudents();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while submitting the form');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteStudent(id);
      setStatusMsg('Student deleted successfully');
      const data = await api.fetchStudents();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while deleting the Student');
    }
  };

  function handleFilter(e) {
    let filterValue = e.target.value.toLowerCase();
    if (filterValue === '') {
      setFilteredStudents(students);
    } else {
      let newData = students.filter(row => {
        return row.firstName.toLowerCase().includes(filterValue)
          || row.lastName.toLowerCase().includes(filterValue)
          || row.id.toString().includes(filterValue)
          || row.tblclass.className.toString().toLowerCase().includes(filterValue)
          || row.emailAddress.toString().toLowerCase().includes(filterValue)
          || row.admissionNumber.toString().toLowerCase().includes(filterValue);
      });
      setFilteredStudents(newData);
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
      cell: row => <div className='cell' title={row.firstName}>{row.firstName}</div>,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
      cell: row => <div className='cell' title={row.lastName}>{row.lastName}</div>,
    },
    {
      name: 'Email Address',
      selector: row => row.emailAddress,
      sortable: true,
      cell: row => <div className='cell' title={row.emailAddress}>{row.emailAddress}</div>,
    },
    {
      name: 'Admission No',
      selector: row => row.admissionNumber,
      sortable: true,
      cell: row => <div className='cell' title={row.admissionNumber}>{row.admissionNumber}</div>,
    },
    {
      name: 'Phone No',
      selector: row => row.phoneNo,
      sortable: false,
      cell: row => <div className='cell' title={row.phoneNo}>{row.phoneNo}</div>,
    },
    {
      name: 'Class',
      selector: row => row.tblclass.className,
      sortable: false,
      cell: row => <div className='cell' title={row.tblclass.className}>{row.tblclass.className}</div>,
    },
    {
      name: 'Class Arm',
      selector: row => row.tblclassarm.classArmName,
      sortable: false,
      cell: row => <div className='cell' title={row.tblclassarm.classArmName}>{row.tblclassarm.classArmName}</div>,
    },
    {
      name: "Delete",
      sortable: false,
      selector: row => null,
      cell: (row) => [
        <i
          key={row.title}
          onClick={() => handleDelete(row.id)}
          className="first fas fa-trash-alt clickable"
        ></i>
      ]
    },
  ];

  const handleChange = (e) => {
    setStudentInfo({
      ...studentInfo,
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
              <h6 className="m-0 font-weight-bold text-primary">Create Student</h6>
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
                      value={studentInfo.firstName}
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
                      value={studentInfo.lastName}
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
                      value={studentInfo.emailAddress}
                      onChange={handleChange}
                      id="exampleInputEmailAddress"
                      placeholder="Your Email Address"
                      required
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Admission Number<span className="text-danger ml-2">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="admissionNumber"
                      value={studentInfo.admissionNumber}
                      onChange={handleChange}
                      id="exampleInputAdmissionNo"
                      placeholder="Your Admission Number"
                      required
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Phone No<span className="text-danger ml-2">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNo"
                      value={studentInfo.phoneNo}
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
                      value={studentInfo.classId}
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
                      value={studentInfo.classArmId}
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
                 
                </div>
                <button type="submit" className='btn btn-primary'>Save</button>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">All Students</h6>
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
                    className='my-table'
                    title="All Students"
                    columns={columns}
                    data={filteredStudents}
                    noHeader
                    pagination
                    defaultSortField="id"
                    defaultSortAsc={true}
                    highlightOnHover
                    fixedHeader
                    paginationComponent={CustomPagination}
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

export default CreateStudent;