import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/fontawesome-free/css/all.min.css'
import '../css/ruang-admin.min.css'
import {adminConstant} from '../constants/index'
import callAdminPage from '../api/api.admin'

const index = () => {

  const [dashboardData, setdashboardData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    callAdminPage()
      .then(user => {
        setdashboardData(user);
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
                  {/* students card */}

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-uppercase mb-1">Students</div>
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">16</div>
                            <div className="mt-2 mb-0 text-muted text-xs">
                              <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 20.4%</span>
                              <span>Since last month</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-users fa-2x text-info"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Class Card */}
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card h-100">
                      <div class="card-body">
                        <div class="row align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Classes</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">3</div>
                            <div class="mt-2 mb-0 text-muted text-xs">
                              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                              <span>Since last month</span>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-chalkboard fa-2x text-primary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* class arm card */}
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card h-100">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Class Arms</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">4</div>
                            <div class="mt-2 mb-0 text-muted text-xs">
                              <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                              <span>Since last years</span>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-code-branch fa-2x text-success"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* student attendance card */}
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card h-100">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Total Student Attendance</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">37</div>
                            <div class="mt-2 mb-0 text-muted text-xs">
                              <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span>
                              <span>Since yesterday</span>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-secondary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* teacher's card */}
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card h-100">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Class Teachers</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">4</div>
                            <div class="mt-2 mb-0 text-muted text-xs">
                              <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                              <span>Since last years</span>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-chalkboard-teacher fa-2x text-danger"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* session and terms card */}
                  <div class="col-xl-3 col-md-6 mb-4">
                          <div class="card h-100">
                            <div class="card-body">
                              <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-uppercase mb-1">Session & Terms</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">2</div>
                                  <div class="mt-2 mb-0 text-muted text-xs">
                                    <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                                    <span>Since last years</span>
                                  </div>
                                </div>
                                <div class="col-auto">
                                  <i class="fas fa-calendar-alt fa-2x text-warning"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                  </div>

                  {/* terms card */}
                  <div class="col-xl-3 col-md-6 mb-4">
                          <div class="card h-100">
                            <div class="card-body">
                              <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-uppercase mb-1">Terms</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">3</div>
                                  <div class="mt-2 mb-0 text-muted text-xs">
                                    <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                                    <span>Since last years</span>
                                  </div>
                                </div>
                                <div class="col-auto">
                                  <i class="fas fa-th fa-2x text-info"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                  </div>

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