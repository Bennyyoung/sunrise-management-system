import React, { useContext, useState } from 'react'
import AuthContext from './Context/AuthContext'
import { BrowserRouter, HashRouter,Routes, Route } from "react-router-dom"
// import TeachersHome from "./pages/ForTeachers/TeachersHome";

// import { Home, EventManagement, AllStaffs, AddStaff, EditStaff, AllStudents, AddStudent, EditStudent, AddNewResult, AllResult, AddNewExpense, ForTeachers, ForParents, EditResult, AllExpenses, AddFees, UploadAssignment, ViewByClass, Creche } from './pages'

import { Navbar, Sidebar, Login, Register } from './components'
import IndividualClassResult from './pages/Examination/IndividualClassResult'
import AddNewExpense from './pages/Accounts/AddNewExpense'
import AllExpenses from './pages/Accounts/AllExpenses'
import UploadAssignment from './pages/Assignment/UploadAssignment'
import EventManagement from './pages/EventManagement'
import AddNewResult from './pages/Examination/AddNewResult'
import AllResult from './pages/Examination/AllResult'
import EditResult from './pages/Examination/EditResult'
import ViewByClass from './pages/Examination/ViewByClass'
import AddFees from './pages/Fees/AddFees'
import ForParents from './pages/ForParents/ForParents'
import ForTeachers from './pages/ForTeachers/ForTeachers'
import Home from './pages/Home'
import AddStaff from './pages/Staff/AddStaff'
import AllStaffs from './pages/Staff/AllStaffs'
import EditStaff from './pages/Staff/EditStaff'
import AddStudent from './pages/Student/AddStudent'
import EditStudent from './pages/Student/EditStudent'
import AllStudent from './pages/Student/AllStudent'

function Router() {
 const { loggedIn } = useContext(AuthContext);

 const [isOpen, setIsOpen] = useState(false)


 const handleToggle = () => {
         setIsOpen(!isOpen)
 }

 return (
  <div>
   <BrowserRouter>
    <Navbar handleToggle={handleToggle} />
    <Sidebar handleToggle={handleToggle} isOpen={isOpen} />
    <Routes>
     <Route path="/" element={<Home />} />
     {
      loggedIn === false && (
       <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       </>
      )
     }

     {
      loggedIn === true && (
       <>
        <Route path="/event-management" element={<EventManagement />} />

        {/* Staff Frontend Routes */}
        <Route path="/all-staffs" element={<AllStaffs />} />
        <Route path="/add-staff" element={<AddStaff />} />
        <Route path="/edit-staff/:id" element={<EditStaff />} />

        {/* Student Frontend Route */}
        <Route path="/all-students" element={<AllStudent />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />

        {/* Result Frontend Route */}
        <Route path="/all-results" element={<AllResult />} />
        <Route path="/add-new-result" element={<AddNewResult />} />
        <Route path="/edit-result/:id" element={<EditResult />} />
        <Route path="/view-by-class" element={<ViewByClass />} />
        <Route path="/grade-5-result" element={<IndividualClassResult />} />
        <Route path="/grade-4-result" element={<IndividualClassResult />} />
        <Route path="/grade-3-result" element={<IndividualClassResult />} />
        <Route path="/grade-2-result" element={<IndividualClassResult />} />
        <Route path="/grade-1-result" element={<IndividualClassResult />} />
        <Route path="/nursery-3-result" element={<IndividualClassResult />} />
        <Route path="/nursery-2-result" element={<IndividualClassResult />} />
        <Route path="/nursery-1-result" element={<IndividualClassResult />} />
        <Route path="/pre-nursery-result" element={<IndividualClassResult />} />


        <Route path="/add-new-expense" element={<AddNewExpense />} />
        <Route path="/all-expenses" element={<AllExpenses />} />

        <Route path="/add-fees" element={<AddFees />} />
        <Route path="/upload-assignment" element={<UploadAssignment />} />

        <Route path="/teachers" element={<ForTeachers />} />

        {/* <Route path="/teachers/:home/" element={<TeachersHome} /> /> */}

        <Route path="/parents" element={<ForParents />} />

       </>
      )
     }

    </Routes>
   </BrowserRouter>
   {/* <Footer /> */}
  </div>
 )
}

export default Router