import {React, useState} from 'react'
import attnlogo from '../img/logo/attnlg.jpg'
import {useNavigate} from 'react-router-dom'
import login from '../api/api.login'

const Login = () => {

  let navigate = useNavigate();

  const [userType, setUserType] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!userType || !emailAddress || !password) {
      console.error('Invalid input');
      return;
    }

    try {
      const user = await login(userType, emailAddress, password);
      if (user) {
        switch (userType) {
          case "Administrator":
            navigate('/Admin');
            break;
          case "ClassTeacher":
            navigate('/ClassTeacher');
            break;
          case "Student":
            navigate('/Student');
            break;
          default:
            break;
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
    <>
        <div className="container-login">
            <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card shadow-sm my-5">
                <div className="card-body p-0">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="login-form">
                        <h5 align="center">STUDENT ATTENDANCE SYSTEM</h5>
                        <div className="text-center">
                            <img src={ attnlogo } style={{width: '100px', height: '100px'}} />
                            <br/>
                            <br/>
                            <h1 className="h4 text-gray-900 mb-4">Admin Login Panel</h1>
                        </div>
                        <form className="user" method="post" action="" onSubmit={handleLogin}>
                            <div className="form-group">
                            <select required name="userType" className="form-control mb-3" value={userType} onChange={(e) => setUserType(e.target.value)}>
                                <option value="">--Select User Roles--</option>
                                <option value="Administrator">Administrator</option>
                                <option value="ClassTeacher">ClassTeacher</option>
                                <option value="Student">Student</option>
                            </select>
                            </div>
                            <div className="form-group">
                            <input required type="text" className="form-control"  name="username" id="exampleInputEmail" placeholder="Enter Email Address" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
                            </div>
                            <div className="form-group">
                            <input required type="password" name="password"  className="form-control" id="exampleInputPassword" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="form-group">
                            <input type="submit" className="btn btn-success btn-block" value="Login" name="login"/>
                            </div>
                        </form>
                        <div className="text-center">
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Login