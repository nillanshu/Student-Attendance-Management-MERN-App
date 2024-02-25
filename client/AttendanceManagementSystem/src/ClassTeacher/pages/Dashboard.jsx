import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import callDashboardPage from '../../api/classTeacherApis/api.classteacherDashboard';
import Location from '../../components/Location';

const Dashboard = () => {

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

  const location = {
    currentPage: 'Class Teacher Dashboard',
    route: '/ClassTeacher/dashboard'
  };

  const data = dashboardData[1] ? [
    { title: 'Students', count: dashboardData[1].dashboardCounts.students, change: 'up', changePercent: 20.4, icon: 'users', color: 'info' },
    { title: 'Classes', count: dashboardData[1].dashboardCounts.classes, change: 'up', changePercent: 3.48, icon: 'chalkboard', color: 'primary' },
    { title: 'Class Arms', count: dashboardData[1].dashboardCounts.classArms, change: 'down', changePercent: 4.38, icon: 'code-branch', color: 'success' },
    { title: 'Total Student Attendance', count: dashboardData[1].dashboardCounts.totalAttendance, change: 'down', changePercent: 3.48, icon: 'calendar', color: 'secondary' },
  ] : [];

  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <Location location={location} />
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
    </>
  );
};

export default Dashboard;