import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'

import ParentsEventManagement from './ParentsEventManagement'
import ParentsHome from './ParentsHome'
import ParentsSeeAllStudent from './ParentsSeeAllResults'
import ParentsSidebar from './ParentsSidebar'
import ParentsUploadAssignment from './ParentsUploadAssignment'

export default class ForParents extends Component {
 render() {
  return (
   <div>
    <ParentsSidebar />
    <Routes>
     <Route path="/parents/home" component={ParentsHome} />
     <Route path="/parents/event-management" component={ParentsEventManagement} />
     <Route path="/parents/all-results" component={ParentsSeeAllStudent} />
     <Route path="/parents/upload-assignment" component={ParentsUploadAssignment} />
     {/* <Route path="/parents/add-new-result" component={TeachersAddNewResult} /> */}
    </Routes>
   </div>
  )
 }
}
