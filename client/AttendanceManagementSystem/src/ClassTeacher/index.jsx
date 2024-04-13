import { React, useEffect, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/fontawesome-free/css/all.min.css'
import '../css/ruang-admin.min.css'
// import '../vendor/jquery/jquery.min.js'
// import '../vendor/bootstrap/js/bootstrap.bundle.min.js'
// import '../vendor/jquery-easing/jquery.easing.min.js'
import { teacherConstant } from '../constants'
import { useNavigate } from 'react-router-dom'
import teacherAuth from '../api/classTeacherApis/api.teacherAuth'
import Dashboard from './pages/Dashboard'
import ViewStudents from './pages/viewStudents'
import ViewClassAttn from './pages/viewClassAttn'

const index = () => {

  const [teacherData, setteacherData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    teacherAuth()
      .then(data => {
        setteacherData(data);
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
          <Sidebar sections={teacherConstant.sections} link={teacherConstant.link}/>
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              {/* Topbar */}
              <Topbar user={teacherData ? teacherData : {}}/>

              {/* Container Fluid */}
              <Routes>
                <Route path='/classTeacher/dashboard' element={<Dashboard />} />
                <Route path='/classTeacher/viewStudents' element={<ViewStudents />} />
                <Route path='/classTeacher/viewClassAttendance' element={<ViewClassAttn />} />
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