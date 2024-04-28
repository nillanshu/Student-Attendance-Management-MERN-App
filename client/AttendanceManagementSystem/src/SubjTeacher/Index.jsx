import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/fontawesome-free/css/all.min.css'
import '../css/ruang-admin.min.css'
import { subjTeacherConstant } from '../constants'
import { useNavigate } from 'react-router-dom'
import subjTeacherAuth from '../api/subjTeacherApis/api.subjTeacherAuth'
import Dashboard from './pages/Dashboard'
import ViewStudents from './pages/viewStudents'
import ViewClassAttn from './pages/viewClassAttn'
import ViewStudentAttn from './pages/viewStudentAttn'
import TakeAttendance from './pages/takeAttendance'

const Index = () => {

  const [teacherData, setteacherData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const data = await subjTeacherAuth();
        setteacherData(data);
      } catch (error) {
        console.error('Error:', error);
        navigate('/login');
      }
    };

    fetchTeacherData();
  }, []);

  return (
    <>
      <div id="page-top">
        <div id="wrapper" style={{ display: 'flex' }}>
          {/* sidebar */}
          <Sidebar sections={subjTeacherConstant.sections} link={subjTeacherConstant.link}/>
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              {/* Topbar */}
              <Topbar user={teacherData ? teacherData : {}}/>

              {/* Container Fluid */}
              <Routes>
                <Route path='/SubjTeacher/dashboard' element={<Dashboard />} />
                <Route path='/SubjTeacher/takeAttendance' element={<TakeAttendance />} />
                <Route path='/SubjTeacher/viewClassAttendance' element={<ViewClassAttn />} />
                <Route path='/SubjTeacher/viewStudentAttendance' element={<ViewStudentAttn />} />
                <Route path='/SubjTeacher/viewStudents' element={<ViewStudents />} />
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

export default Index