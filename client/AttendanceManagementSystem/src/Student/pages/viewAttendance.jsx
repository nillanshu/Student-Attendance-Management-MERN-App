import { useState } from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import * as api from '../../api/studentApis/api.attendance'

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [studentAttnInfo, setStudentAttnInfo] = useState(
    {
        dateType: '',
        dateTimeTaken: '',
        fromDate: '',
        toDate: ''
    }
  );

  const location = {
    currentPage: 'View Your Attendance',
    route: '/Student/dashboard'
  };

  function handleSubmit(e) {
    e.preventDefault();
    api.fetchAttendance(studentAttnInfo)
      .then(response => {
        setFilteredAttendance(response.data);
        setAttendance(response.data);
        setStudentAttnInfo({
            dateType: '',
            dateTimeTaken: '',
            fromDate: '',
            toDate: ''
        });
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
      name: 'Session',
      selector: row => row.tblsessionterm.sessionName,
      sortable: false,
    },
    {
      name: 'Term',
      selector: row => row.tblsessionterm.tblterm.termName,
      sortable: false,
    }
  ];

  return (
    <div className="container-fluid" id="container-wrapper">
      <Location location={location} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">View Your Attendance</h6>
                {statusMsg}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                  <div className="col-xl-6">
                    <label className="form-control-label">Date Type<span className="text-danger ml-2">*</span></label>
                    <select
                        className="form-control"
                        name="dateType"
                        value={studentAttnInfo.dateType}
                        onChange={(e) => setStudentAttnInfo({ ...studentAttnInfo, dateType: e.target.value })}
                        required
                    >
                        <option value="">--Select Date Type--</option>
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
                  <h6 className="m-0 font-weight-bold text-primary">My Attendance</h6>
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
                    title="Attendance List"
                    columns={columns}
                    data={filteredAttendance}
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

export default ViewAttendance;