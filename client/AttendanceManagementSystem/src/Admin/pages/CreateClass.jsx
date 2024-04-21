import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Location from '../../components/Location';
import CustomPagination from '../../components/CustomPagination';
import * as api from '../../api/adminApis/api.Classes';

const CreateClass = () => {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');
  const [editId, setEditId] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

  const location = {
    currentPage: 'Create Class',
    route: '/Admin/createClass'
  };

  useEffect(() => {
    api.fetchClasses()
    .then(data => {
      setClasses(data);
      setFilteredClasses(data);
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
        await api.editClass(editId, className);
        setStatusMsg('Class edited successfully');
      } else {
        await api.createClass(className);
        setStatusMsg('Class created successfully');
      }

      setClassName('');
      setEditId(null);

      const data = await api.fetchClasses();
      setClasses(data);
      setFilteredClasses(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while submitting the form');
    }
  };

  const handleEdit = (id) => {
    const classToEdit = classes.find((c) => c.id === id);
    setClassName(classToEdit.className);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteClass(id);
      setStatusMsg('Class deleted successfully');
      const data = await api.fetchClasses();
      setClasses(data);
      setFilteredClasses(data);
    } catch (error) {
      console.error('Error:', error);
      setStatusMsg('Error occurred while deleting the class');
    }
  };

  function handleFilter(e) {
    let filterValue = e.target.value.toLowerCase();
    if (filterValue === '') {
      setFilteredClasses(classes);
    } else {
      let newData = classes.filter(row => {
        return row.className.toLowerCase().includes(filterValue) || row.id.toString().includes(filterValue);
      });
      setFilteredClasses(newData);
    }
  }

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Class Name',
      selector: row => row.className,
      sortable: true,
      cell: row => <div className='cell' title={row.className}>{row.className}</div>
    },
    {
      name: "Edit",
      sortable: false,
      selector: row => null,
      cell: (row) => [
        <i
          key={row.title}
          onClick={() => handleEdit(row.id)}
          className="first fas fa-pen clickable"
        ></i>
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
          className="first fas fa-trash-alt clickable"
        ></i>
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
              <h6 className="m-0 font-weight-bold text-primary">Create Class</h6>
                {statusMsg}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                  <div className="col-xl-6">
                    <label className="form-control-label">Class Name<span className="text-danger ml-2">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        name="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        id="exampleInputFirstName"
                        placeholder="Class Name"
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
                  <h6 className="m-0 font-weight-bold text-primary">All Classes</h6>
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
                    title="All Classes"
                    columns={columns}
                    data={filteredClasses}
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

export default CreateClass;