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

const index = () => {

  const [adminData, setAdminData] = useState({});
  const navigate = useNavigate();

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
      <div id="page-top">
        <div id="wrapper" style={{ display: 'flex' }}>
          {/* sidebar */}
          <Sidebar sections={adminConstant.sections} link={adminConstant.link}/>
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              {/* Topbar */}
              <Topbar user={adminData ? adminData : {}}/>

              {/* Container Fluid */}
              <Routes>
                <Route path='/Admin/dashboard' element={<Dashboard />} />
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