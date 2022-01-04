import React, { useContext, useState } from 'react'
import AuthContext from './context/AuthContext'
import { BrowserRouter, HashRouter,Switch, Route } from "react-router-dom"
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
   <HashRouter>
    <Navbar handleToggle={handleToggle} isOpen={isOpen} />
    <Sidebar handleToggle={handleToggle} isOpen={isOpen} />
    <Switch>
     <Route exact path="/" component={Home} />
     {
      loggedIn === false && (
       <>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
       </>
      )
     }

     {
      loggedIn === true && (
       <>
        <Route path="/event-management" component={EventManagement} />

        {/* Staff Frontend Routes */}
        <Route path="/all-staffs" component={AllStaffs} />
        <Route path="/add-staff" component={AddStaff} />
        <Route path="/edit-staff/:id" component={EditStaff} />

        {/* Student Frontend Route */}
        <Route path="/all-students" component={AllStudents} />
        <Route path="/add-student" component={AddStudent} />
        <Route path="/edit-student/:id" component={EditStudent} />

        {/* Result Frontend Route */}
        <Route path="/all-results" component={AllResult} />
        <Route path="/add-new-result" component={AddNewResult} />
        <Route path="/edit-result/:id" component={EditResult} />
        <Route path="/view-by-class" component={ViewByClass} />
        <Route path="/grade-5-result" component={Grade5} />
        <Route path="/grade-4-result" component={Grade4} />
        <Route path="/grade-3-result" component={Grade3} />
        <Route path="/grade-2-result" component={Grade2} />
        <Route path="/grade-1-result" component={Grade1} />
        <Route path="/nursery-3-result" component={Nursery3} />
        <Route path="/nursery-2-result" component={Nursery2} />
        <Route path="/nursery-1-result" component={Nursery1} />
        <Route path="/creche-result" component={Creche} />


        <Route path="/add-new-expense" component={AddNewExpense} />
        <Route path="/all-expenses" component={AllExpenses} />

        <Route path="/add-fees" component={AddFees} />
        <Route path="/upload-assignment" component={UploadAssignment} />

        <Route path="/teachers" component={ForTeachers} />

        {/* <Route path="/teachers/:home/" component={TeachersHome} /> */}

        <Route path="/parents" component={ForParents} />

       </>
      )
     }

    </Switch>
   </HashRouter>
   {/* <Footer /> */}
  </div>
 )
}

export default Router