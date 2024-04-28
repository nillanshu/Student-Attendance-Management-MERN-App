import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import CustomPagination from '../../components/CustomPagination';
import * as api from '../../api/subjTeacherApis/api.attendance';

const ViewStudentAttn = () => {
  const [attendance, setAttendance] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [students, setStudents] = useState([]);

  const [studentAttnInfo, setStudentAttnInfo] = useState(
    {
        dateType: '',
        admissionNumber: '',
        dateTimeTaken: '',
        fromDate: '',
        toDate: ''
    }
  );

  const location = {
    currentPage: 'View Student Attendance',
    route: '/SubjectTeacher/viewStudentAttendance'
  };

  useEffect(() => {
    api.fetchAllStudents()
        .then(response => {
            setStudents(response.data);
        })
        .catch(error => {
            setStatusMsg(error.response.data.message);
        });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    api.fetchStudentAttendance(studentAttnInfo)
      .then(response => {
        setFilteredAttendance(response.data);
        setAttendance(response.data);
      })
      .catch(error => {
        setStatusMsg(error.response.data.message);
      });
  }

  function handleFilter(e) {
    let filterValue = e.target.value.toLowerCase();
    if (filterValue === '') {
      setFilteredAttendance(attendance);
    } else {
      let newData = attendance.filter(row => {
        return row.admissionNumber.toLowerCase().includes(filterValue)
          || row.dateTimeTaken.toLowerCase().includes(filterValue)
          || row.id.toString().includes(filterValue)
          || row.tblclass.className.toString().toLowerCase().includes(filterValue)
          || row.tblclassarm.classArmName.toString().toLowerCase().includes(filterValue)
          || row.tblsessionterm.sessionName.toString().toLowerCase().includes(filterValue)
          || row.tblsessionterm.tblterm.termName.toString().toLowerCase().includes(filterValue);
      });
      setFilteredAttendance(newData);
    }
  }

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Admission No',
      selector: row => row.admissionNumber,
      sortable: true,
      cell: row => <div className='cell' title={row.admissionNumber}>{row.admissionNumber}</div>
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: false,
    },
    {
      name: 'Date',
      selector: row => row.dateTimeTaken,
      sortable: false,
      cell: row => <div className='cell' title={row.dateTimeTaken}>{row.dateTimeTaken}</div>
    },
    {
      name: 'Class',
      selector: row => row.tblclass && row.tblclass.className,
      sortable: false,
      cell: row => <div className='cell' title={row.tblclass && row.tblclass.className}>{row.tblclass && row.tblclass.className}</div>
    },
    {
      name: 'Class Arm',
      selector: row => row.tblclassarm && row.tblclassarm.classArmName,
      sortable: false,
      cell: row => <div className='cell' title={row.tblclassarm && row.tblclassarm.classArmName}>{row.tblclassarm && row.tblclassarm.classArmName}</div>
    },
    {
      name: 'Session',
      selector: row => row.tblsessionterm && row.tblsessionterm.sessionName,
      sortable: false,
      cell: row => <div className='cell' title={row.tblsessionterm && row.tblsessionterm.sessionName}>{row.tblsessionterm && row.tblsessionterm.sessionName}</div>
    },
    {
      name: 'Term',
      selector: row => row.tblsessionterm && row.tblsessionterm.tblterm && row.tblsessionterm.tblterm.termName,
      sortable: false,
      cell: row => <div className='cell' title={row.tblsessionterm && row.tblsessionterm.tblterm && row.tblsessionterm.tblterm.termName}>{row.tblsessionterm && row.tblsessionterm.tblterm && row.tblsessionterm.tblterm.termName}</div>
    }
  ];

  return (
    <div className="container-fluid" id="container-wrapper">
      <Location location={location} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">View Student Attendance</h6>
                {statusMsg}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                  <div className="col-xl-6">
                    <label className="form-control-label">Select Student<span className="text-danger ml-2">*</span></label>
                    <select
                      className="form-control"
                      name="admissionNumber"
                      value={studentAttnInfo.admissionNumber}
                      onChange={(e) => setStudentAttnInfo({ ...studentAttnInfo, admissionNumber: e.target.value })}
                      required
                    >
                      <option value="">--Select Class--</option>
                      {students ? students.map((student, index) => (
                        <option key={index} value={student.admissionNumber}>
                          {student.firstName + ' ' + student.lastName}
                        </option>
                      )) : []}
                    </select>
                  </div>
                  <div className="col-xl-6">
                    <label className="form-control-label">Type<span className="text-danger ml-2">*</span></label>
                    <select
                        className="form-control"
                        name="classId"
                        value={studentAttnInfo.dateType}
                        onChange={(e) => setStudentAttnInfo({ ...studentAttnInfo, dateType: e.target.value })}
                        required
                    >
                        <option value="">--Select Class--</option>
                        <option value="All">All</option>
                        <option value="By Single Date">By Single Date</option>
                        <option value="By Date Range">By Date Range</option>
                    </select>
                  </div>
                    {studentAttnInfo.dateType === "By Single Date" && (
                    <div className="col-xl-6">
                        <label className="form-control-label">Select Date<span className="text-danger ml-2">*</span></label>
                        <input
                        type="date"
                        className="form-control"
                        name="dateTimeTaken"
                        value={studentAttnInfo.dateTimeTaken}
                        onChange={(e) => setStudentAttnInfo({ ...studentAttnInfo, dateTimeTaken: e.target.value })}
                        id="exampleSelectDate"
                        required
                        />
                    </div>
                    )}
                    {studentAttnInfo.dateType === "By Date Range" && (
                    <>
                        <div className="col-xl-6">
                        <label className="form-control-label">From Date<span className="text-danger ml-2">*</span></label>
                        <input
                            type="date"
                            className="form-control"
                            name="fromDate"
                            value={studentAttnInfo.fromDate}
                            onChange={(e) => setStudentAttnInfo({ ...studentAttnInfo, fromDate: e.target.value })}
                            id="exampleSelectDate"
                            required
                        />
                        </div>   
                        <div className="col-xl-6">
                        <label className="form-control-label">To Date<span className="text-danger ml-2">*</span></label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateTimeTaken"
                            value={studentAttnInfo.toDate}
                            onChange={(e) => setStudentAttnInfo({ ...studentAttnInfo, toDate: e.target.value })}
                            id="exampleSelectDate"
                            required
                        />
                        </div>
                    </>
                    )}
                </div>
                <button type="submit" className='btn btn-primary'>View Attendance</button>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Student Attendance</h6>
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
                    data={filteredAttendance}
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

export default ViewStudentAttn;