import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ParentsEventManagement from './ParentsEventManagement';
import ParentsHome from './ParentsHome';
import ParentsSeeAllStudent from './ParentsSeeAllResults';
import ParentsSidebar from './ParentsSidebar';
import ParentsUploadAssignment from './ParentsUploadAssignment';

const ForParents = () => {
  return (
    <div>
      <ParentsSidebar />
      <Routes>
        <Route path="/parents/home" element={<ParentsHome />} />
        <Route path="/parents/event-management" element={<ParentsEventManagement />} />
        <Route path="/parents/all-results" element={<ParentsSeeAllStudent />} />
        <Route path="/parents/upload-assignment" element={<ParentsUploadAssignment />} />
        {/* <Route path="/parents/add-new-result" component={TeachersAddNewResult} /> */}
      </Routes>
    </div>
  );
};

export default ForParents;
