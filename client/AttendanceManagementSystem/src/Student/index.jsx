import { React, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import callDashboardPage from '../api/api.studentDashboard'

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

  const data = dashboardData[1] ? [
    { title: 'Students', count: dashboardData[1].dashboardCounts.students, change: 'up', changePercent: 20.4, icon: 'users', color: 'info' },
    { title: 'Classes', count: dashboardData[1].dashboardCounts.classes, change: 'up', changePercent: 3.48, icon: 'chalkboard', color: 'primary' },
    { title: 'Class Arms', count: dashboardData[1].dashboardCounts.classArms, change: 'down', changePercent: 4.38, icon: 'code-branch', color: 'success' },
    { title: 'Total Student Attendance', count: dashboardData[1].dashboardCounts.totalAttendance, change: 'down', changePercent: 3.48, icon: 'calendar', color: 'warning' },
  ] : [];

  return (
    <>
      <div id="page-top">
        <div id="wrapper" style={{ display: 'flex' }}>
          {/* sidebar */}
          <Sidebar sections={studentConstant}/>
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              {/* Topbar */}
              <Topbar user={dashboardData[0] ? dashboardData[0].rootUser : {}}/>

              {/* Container Fluid */}
              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Student Dashboard</h1>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                  </ol>
                </div>
                <div className="row mb-3">
                  {/* students card */}
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