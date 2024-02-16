import React from 'react'
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

const index = () => {
  return (
    <>
      <div id="page-top">
        <div id="wrapper" style={{ display: 'flex' }}>
          {/* sidebar */}
          <Sidebar sections={teacherConstant}/>
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              {/* Topbar */}
              <Topbar />

              {/* Container Fluid */}
              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Class Teacher Dashboard</h1>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                  </ol>
                </div>
                <div className="row mb-3">
                  {/* students card */}

                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card h-100">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Students</div>
                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">8</div>
                            <div class="mt-2 mb-0 text-muted text-xs">
                              <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 20.4%</span>
                              <span>Since last month</span>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-users fa-2x text-info"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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

                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card h-100">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-uppercase mb-1">Total Student Attendance</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">24</div>
                            <div class="mt-2 mb-0 text-muted text-xs">
                              <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span>
                              <span>Since yesterday</span>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-warning"></i>
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