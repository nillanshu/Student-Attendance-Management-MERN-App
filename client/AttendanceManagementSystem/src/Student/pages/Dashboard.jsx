import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import callDashboardPage from '../../api/studentApis/api.studentDashboard';
import Location from '../../components/Location';
import CircularProgBar from '../../components/CircularProgBar';

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [cardName, setCardName] = useState('');
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    callDashboardPage()
      .then(data => {
        console.log('Success:', data);
        setDashboardData(data);
        setPercentage(isNaN(data[0].attendancePercentage) ? 0 : data[0].attendancePercentage); // Use data[0].attendancePercentage
        setCardName('Overall Attendance');
        setSubjectAttendance(data.slice(1)); // Exclude the first object which is for overall attendance
        console.log(data.slice(1)); // Log the value of subjectAttendance
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
        navigate('/login');
      });
  }, []);

  const location = {
    currentPage: 'Student Dashboard',
    route: '/Student/dashboard'
  };
  
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container-fluid" id="container-wrapper">
          <Location location={location} />
          <CircularProgBar percentage={percentage} cardName={cardName} />
          {subjectAttendance && subjectAttendance.map((subject, index) => ( // Add a check for subjectAttendance before mapping over it
            <CircularProgBar 
              key={index} 
              percentage={isNaN(subject.attendancePercentage) ? 0 : subject.attendancePercentage} 
              cardName={subject.subjName} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;