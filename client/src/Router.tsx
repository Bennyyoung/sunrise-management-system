import React, { useContext, useState } from 'react'
import AuthContext from './Context/AuthContext'
import { BrowserRouter, HashRouter,Routes, Route } from "react-router-dom"
// import TeachersHome from "./pages/ForTeachers/TeachersHome";

// import { Home, EventManagement, AllStaffs, AddStaff, EditStaff, AllStudents, AddStudent, EditStudent, AddNewResult, AllResult, AddNewExpense, ForTeachers, ForParents, EditResult, AllExpenses, AddFees, UploadAssignment, ViewByClass, Creche } from './pages'

import { Navbar, Sidebar, Login, Register } from './components'
import IndividualClassResult from './Pages/Examination/IndividualClassResult'
import AddNewExpense from './Pages/Accounts/AddNewExpense'
import AllExpenses from './Pages/Accounts/AllExpenses'
import UploadAssignment from './Pages/Assignment/UploadAssignment'
import EventManagement from './Pages/EventManagement'
import AddNewResult from './Pages/Examination/AddNewResult'
import AllResult from './Pages/Examination/AllResult'
import EditResult from './Pages/Examination/EditResult'
import ViewByClass from './Pages/Examination/ViewByClass'
import AddFees from './Pages/Fees/AddFees'
import ForParents from './Pages/ForParents/ForParents'
import ForTeachers from './Pages/ForTeachers/ForTeachers'
import Home from './Pages/Home'
import AddStaff from './Pages/Staff/AddStaff'
import AllStaffs from './Pages/Staff/AllStaffs'
import EditStaff from './Pages/Staff/EditStaff'
import AddStudent from './Pages/Student/AddStudent'
import EditStudent from './Pages/Student/EditStudent'
import AllStudent from './Pages/Student/AllStudent'

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