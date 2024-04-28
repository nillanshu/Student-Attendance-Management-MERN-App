import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import CustomPagination from '../../components/CustomPagination';
import * as api from '../../api/subjTeacherApis/api.viewStudents';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [className, setClassName] = useState([]);
  const [classArmName, setClassArmName] = useState([]);

  const location = {
    currentPage: `All Student in (${className} - ${classArmName}) Class`,
    route: '/classTeacher/viewStudents'
};

  useEffect(() => {
    api.fetchStudents()
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
      cell: row => <div className='cell' title={row.firstName}>{row.firstName}</div>
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
      cell: row => <div className='cell' title={row.lastName}>{row.lastName}</div>
    },
    {
      name: 'Email Address',
      selector: row => row.emailAddress,
      sortable: true,
      cell: row => <div className='cell' title={row.emailAddress}>{row.emailAddress}</div>
    },
    {
      name: 'Admission No',
      selector: row => row.admissionNumber,
      sortable: true,
      cell: row => <div className='cell' title={row.admissionNumber}>{row.admissionNumber}</div>
    },
    {
      name: 'Phone No',
      selector: row => row.phoneNo,
      sortable: false,
      cell: row => <div className='cell' title={row.phoneNo}>{row.phoneNo}</div>
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
    }
  ];

  return (
    <div className="container-fluid" id="container-wrapper">
      <Location location={location} />
      <div className="row">
        <div className="col-lg-12">
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

export default ViewStudents;