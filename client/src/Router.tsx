import React, { useContext, useState } from 'react'
import AuthContext from './context/AuthContext'
import { BrowserRouter, HashRouter,Routes, Route } from "react-router-dom"
// import TeachersHome from "./pages/ForTeachers/TeachersHome";

import { Home, EventManagement, AllStaffs, AddStaff, EditStaff, AllStudents, AddStudent, EditStudent, AddNewResult, AllResult, AddNewExpense, ForTeachers, ForParents, EditResult, AllExpenses, AddFees, UploadAssignment, ViewByClass, Grade5, Grade4, Grade3, Grade2, Grade1, Nursery3, Nursery2, Nursery1, Creche } from './pages'

import { Navbar, Sidebar, Login, Register } from './components'

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
        <Route path="/all-students" element={<AllStudents />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />

        {/* Result Frontend Route */}
        <Route path="/all-results" element={<AllResult />} />
        <Route path="/add-new-result" element={<AddNewResult />} />
        <Route path="/edit-result/:id" element={<EditResult />} />
        <Route path="/view-by-class" element={<ViewByClass />} />
        <Route path="/grade-5-result" element={<Grade5 />} />
        <Route path="/grade-4-result" element={<Grade4 />} />
        <Route path="/grade-3-result" element={<Grade3 />} />
        <Route path="/grade-2-result" element={<Grade2 />} />
        <Route path="/grade-1-result" element={<Grade1 />} />
        <Route path="/nursery-3-result" element={<Nursery3 />} />
        <Route path="/nursery-2-result" element={<Nursery2 />} />
        <Route path="/nursery-1-result" element={<Nursery1 />} />
        <Route path="/creche-result" element={<Creche />} />


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