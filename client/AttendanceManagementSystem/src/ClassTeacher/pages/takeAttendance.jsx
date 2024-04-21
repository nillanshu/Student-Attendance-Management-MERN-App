import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import CustomPagination from '../../components/CustomPagination';
import * as api from '../../api/classTeacherApis/api.attendance';

const TakeAttendance = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [className, setClassName] = useState([]);
  const [classArmName, setClassArmName] = useState([]);
  const [selectedAdmissionNumbers, setSelectedAdmissionNumbers] = useState([]);

  const location = {
    currentPage: `Take Attendance`,
    route: '/classTeacher/takeAttendance'
  };

  const date = new Date().toLocaleDateString();

  useEffect(() => {
    api.loadTakeAttendancePage()
    .then(data => {
      setStudents(data.students);
      setFilteredStudents(data.students);
      setClassName(data.className);
      setClassArmName(data.classArmName);
    })
    .catch(error => {
      console.error('Error:', error);
      navigate('/login');
    });
  }, []);

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
          || row.tblclassarm.classArmName.toString().toLowerCase().includes(filterValue)
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
      cell: row => <div className='cell' title={row.firstName}>{row.firstName}</div>
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
      cell: row => <div className='cell' title={row.lastName}>{row.lastName}</div>
    },
    {
      name: 'Admission No',
      selector: row => row.admissionNumber,
      sortable: true,
      cell: row => <div className='cell' title={row.admissionNumber}>{row.admissionNumber}</div>
    },
    {
      name: 'Class',
      selector: row => row.tblclass.className,
      sortable: false,
      cell: row => <div className='cell' title={row.tblclass.className}>{row.tblclass.className}</div>
    },
    {
      name: 'Class Arm',
      selector: row => row.tblclassarm.classArmName,
      sortable: false,
      cell: row => <div className='cell' title={row.tblclassarm.classArmName}>{row.tblclassarm.classArmName}</div>
    },
    {
        name: 'Check',
        cell: row => (
          <input 
            type="checkbox" 
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedAdmissionNumbers(prevState => [...prevState, row.admissionNumber]);
              } else {
                setSelectedAdmissionNumbers(prevState => prevState.filter(admissionNumber => admissionNumber !== row.admissionNumber));
              }
            }}
          />
        ),
        ignoreRowClick: true,
      }
  ];

  function handleSubmit(e) {
    e.preventDefault();
    
    if (selectedAdmissionNumbers.length === 0) {
      setStatusMsg("Select at least one student to take attendance");
      return;
    }
  
    api.takeAttendance(selectedAdmissionNumbers)
      .then(res => {
        setStatusMsg(res.data);
      })
      .catch(error => {
        console.error('Error:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setStatusMsg(error.response.data.message);
        }
      });
  }

  return (
    <div className="container-fluid" id="container-wrapper">
      <Location location={location} /> <h3> Today's Date: {date}</h3>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">All Student in ({className} - {classArmName}) Class</h6>
                  {statusMsg}
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
                  <form onSubmit={handleSubmit}>
                    <button type="submit" className='btn btn-primary'>Take Attendance</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance;