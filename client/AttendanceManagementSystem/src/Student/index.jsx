import { React, useEffect, useState } from 'react'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/fontawesome-free/css/all.min.css'
import '../css/ruang-admin.min.css'
// import '../vendor/jquery/jquery.min.js'
// import '../vendor/bootstrap/js/bootstrap.bundle.min.js'
// import '../vendor/jquery-easing/jquery.easing.min.js'
import { studentConstant } from '../constants'
import studentAuth from '../api/studentApis/api.studentAuth'
import Dashboard from './pages/Dashboard'

const index = () => {

  const [studentData, setStudentData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    studentAuth()
      .then(data => {
        setStudentData(data);
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
          <Sidebar sections={studentConstant.sections} link={studentConstant.link} />
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              {/* Topbar */}
              <Topbar user={studentData ? studentData : {}}/>

              {/* Container Fluid */}
              <Routes>
                <Route path='/Student/dashboard' element={<Dashboard />} />
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