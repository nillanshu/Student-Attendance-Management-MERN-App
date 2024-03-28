import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Admin from './Admin/index'
import ClassTeacher from './ClassTeacher/index'
import Student from './Student/index'
import ErrorPage from './ErrorPage'
import AdminDashboard from './Admin/pages/Dashboard'
import TeacherDashboard from './ClassTeacher/pages/Dashboard'
import StudentDashboard from './Student/pages/Dashboard'
import CreateClass from './Admin/pages/CreateClass'
import CreateClassArm from './Admin/pages/createClassArm'
import CreateClassTeacher from './Admin/pages/createClassTeacher'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='login' element={ <Login /> } />
          <Route path='Admin' element={ <Admin /> } >
            <Route path='/Admin/dashboard' element={ <AdminDashboard /> }/>
            <Route path='/Admin/createClass' element={<CreateClass />} />
            <Route path='/Admin/createClassArm' element={<CreateClassArm />} />
            <Route path='/Admin/createClassTeacher' element={<CreateClassTeacher />} />
          </Route>
          <Route path='ClassTeacher' element={ <ClassTeacher /> } >
            <Route path='/ClassTeacher/dashboard' element={ <TeacherDashboard /> }/>
          </Route>
          <Route path='Student' element={ <Student /> } >
            <Route path='/Student/dashboard' element={ <StudentDashboard /> }/>
          </Route>
          <Route path='*' element={ <ErrorPage /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
