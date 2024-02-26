import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import * as api from '../../api/adminApis/api.classArms';
import {fetchClasses} from '../../api/adminApis/api.Classes';

const CreateClassArm = () => {
  const [ClassArms, setClassArms] = useState([]);
  const [classArmName, setClassArmName] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState('');
  const [editId, setEditId] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [filteredClassArms, setFilteredClassArms] = useState([]);

  const location = {
    currentPage: 'Create Class Arm',
    route: '/Admin/createClassArm'
  };

  useEffect(() => {
    fetchClasses().then(data => {
      setClasses(data);
    });
    api.fetchClassArms()
    .then(data => {
      setClassArms(data);
      setFilteredClassArms(data);
    })
    .catch(error => {
      console.error('Error:', error);
      navigate('/login');
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editId) {
        await api.editClassArm(editId, classId, classArmName);
        setStatusMsg('Class Arm edited successfully');
      } else {
        await api.createClassArm(classId, classArmName);
        setStatusMsg('Class Arm created successfully');
      }

      setClassArmName('');
      setEditId(null);

      const data = await api.fetchClassArms();
      setClassArms(data);
      setFilteredClassArms(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while submitting the form');
    }
  };

  const handleEdit = (id) => {
    const classArmToEdit = ClassArms.find((c) => c.Id === id);
    setClassArmName(classArmToEdit.classArmName);
    const classToEdit = classes.find((c) => c.className === classArmToEdit.tblclass.className);
    setClassId(classToEdit.id); // set classId to the id of the class of the class arm
    setEditId(id); // set editId to the id of the class arm
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteClassArm(id);
      setStatusMsg('Class Arm deleted successfully');
      const data = await api.fetchClassArms();
      setClassArms(data);
      setFilteredClassArms(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while deleting the class');
    }
  };

  function handleFilter(e) {
    let filterValue = e.target.value.toLowerCase();
    if (filterValue === '') {
      setFilteredClassArms(ClassArms);
    } else {
      let newData = ClassArms.filter(row => {
        return row.classArmName.toLowerCase().includes(filterValue.toLowerCase())
          || row.Id.toString().includes(filterValue)
          || row.tblclass.className.toString().toLowerCase().includes(filterValue.toLowerCase())
          || row.isAssigned.toString().includes(filterValue);
      });
      setFilteredClassArms(newData);
    }
  }

  const columns = [
    {
      name: '#',
      selector: row => row.Id,
      sortable: true,
    },
    {
      name: 'Class Name',
      selector: row => row.tblclass.className,
      sortable: true,
    },
    {
      name: 'Class Arm Name',
      selector: row => row.classArmName,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.isAssigned,
      sortable: true,
    },
    {
      name: "Edit",
      sortable: false,
      selector: row => null,
      cell: (row) => [
        <i
          key={row.title}
          onClick={() => handleEdit(row.Id)}
          className="first fas fa-pen"
        ></i>,
        <p>Edit</p>
      ]
    },
    {
      name: "Delete",
      sortable: false,
      selector: row => null,
      cell: (row) => [
        <i
          key={row.title}
          onClick={() => handleDelete(row.Id)}
          className="first fas fa-trash-alt"
        ></i>,
        <p>Delete</p>
      ]
    },
  ];

  return (
    <div className="container-fluid" id="container-wrapper">
      <Location location={location} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Create Class Arm</h6>
                {statusMsg}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                  <div className="col-xl-6">
                    <label className="form-control-label">Select Class<span className="text-danger ml-2">*</span></label>
                    <select
                      className="form-control"
                      name="classId"
                      value={classId}
                      onChange={(e) => setClassId(e.target.value)}
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
                    <label className="form-control-label">Class Arm Name<span className="text-danger ml-2">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="classArmName"
                      value={classArmName}
                      onChange={(e) => setClassArmName(e.target.value)}
                      id="exampleInputFirstName"
                      placeholder="Class Arm Name"
                      required
                    />
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
                  <h6 className="m-0 font-weight-bold text-primary">All ClassArms</h6>
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
                    title="All ClassArms"
                    columns={columns}
                    data={filteredClassArms}
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

export default CreateClassArm;