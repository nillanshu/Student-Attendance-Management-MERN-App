import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/fontawesome-free/css/all.min.css'
import '../css/ruang-admin.min.css'
import {adminConstant} from '../constants/index'
import callDashboardPage from '../api/api.adminDashboard'

const index = () => {

  const [dashboardData, setdashboardData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    callDashboardPage()
      .then(data => {
        setdashboardData(data);
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/login');
      });
  }, []);

  const data = [
    { title: 'Students', count: dashboardData.students, change: 'up', changePercent: 20.4, icon: 'users', color: 'info' },
    { title: 'Classes', count: dashboardData.classes, change: 'up', changePercent: 3.48, icon: 'chalkboard', color: 'primary' },
    { title: 'Teachers', count: dashboardData.classArms, change: 'down', changePercent: 4.38, icon: 'code-branch', color: 'success' },
    { title: 'Total Student Attendance', count: dashboardData.totalAttendance, change: 'down', changePercent: 3.48, icon: 'calendar', color: 'secondary' },
    { title: 'Class Teachers', count: dashboardData.classTeachers, change: 'down', changePercent: 3.48, icon: 'chalkboard-teacher', color: 'danger' },
    { title: 'Session & Terms', count: dashboardData.sessionNTerms, change: 'down', changePercent: 4.38, icon: 'calendar-alt', color: 'warning' },
    { title: 'Terms', count: dashboardData.terms, change: 'down', changePercent: 4.38, icon: 'th', color: 'info' },
  ];

  return (
    <>
      <div id="page-top">
        <div id="wrapper" style={{ display: 'flex' }}>
          {/* sidebar */}
          <Sidebar sections={adminConstant}/>
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              {/* Topbar */}
              <Topbar />

              {/* Container Fluid */}
              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Administrator Dashboard</h1>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                  </ol>
                </div>
                <div className="row mb-3">
                  {data.map((item, index) => (
                    <div className="col-xl-3 col-md-6 mb-4" key={index}>
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-uppercase mb-1">{item.title}</div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">{item.count}</div>
                              <div className="mt-2 mb-0 text-muted text-xs">
                                <span className={`text-${item.change} mr-2`}><i className={`fas fa-arrow-${item.change}`}></i> {item.changePercent}%</span>
                                <span>Since last month</span>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className={`fas fa-${item.icon} fa-2x text-${item.color}`}></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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