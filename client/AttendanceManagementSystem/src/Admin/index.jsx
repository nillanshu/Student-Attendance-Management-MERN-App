import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/fontawesome-free/css/all.min.css'
import '../css/ruang-admin.min.css'
import {adminConstant} from '../constants/index'
import adminAuth from '../api/adminApis/api.adminAuth'
import Dashboard from './pages/Dashboard';
import CreateClass from './pages/CreateClass';
import CreateClassArm from './pages/createClassArm';
import CreateClassTeacher from './pages/createClassTeacher';
import CreateStudent from './pages/createStudent';
import CreateSessionTerm from './pages/createSessionTerm';


const index = () => {

  const [adminData, setAdminData] = useState({});
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    adminAuth()
      .then(data => {
        setAdminData(data);
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/login');
      });
  }, []);

  return (
    <>
      <div id="page-top" className={`${ isSidebarOpen ? 'sidebar-toggled' : '' }`}>
        <div id="wrapper" style={{ display: 'flex' }}>
          {/* sidebar */}
          <Sidebar sections={adminConstant.sections} link={adminConstant.link} isOpen={isSidebarOpen}/>
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              {/* Topbar */}
              <Topbar user={adminData ? adminData : {}} onSidebarToggle={toggleSidebar}/>

              {/* Container Fluid */}
              <Routes>
                <Route path='/Admin/dashboard' element={<Dashboard />} />
                <Route path='/Admin/createClass' element={<CreateClass />} />
                <Route path='/Admin/createClassArm' element={<CreateClassArm />} />
                <Route path='/Admin/createClassTeacher' element={<CreateClassTeacher />} />
                <Route path='/Admin/createStudent' element={<CreateStudent />} />
                <Route path='/Admin/createSessionTerm' element={<CreateSessionTerm />} />
              </Routes>
              <Outlet />

            </div>
            {/* footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default index