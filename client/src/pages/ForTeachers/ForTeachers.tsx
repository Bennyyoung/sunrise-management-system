import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TeachersSidebar from './TeachersSidebar';
import TeachersAddNewResult from './TeachersAddNewResult';
import TeachersEventManagement from './TeachersEventManagement';
import TeachersHome from './TeachersHome';
import TeachersSeeAllResult from './TeachersSeeAllResult';
import TeachersSeeAllStudent from './TeachersSeeAllStudents';

const ForTeachers: React.FC = () => {
  return (
    <div>
      <TeachersSidebar />
      <Routes>
        <Route path="/teachers/home" element={<TeachersHome />} />
        <Route path="/teachers/event-management" element={<TeachersEventManagement />} />
        <Route path="/teachers/all-results" element={<TeachersSeeAllResult />} />
        <Route path="/teachers/add-new-result" element={<TeachersAddNewResult />} />
        <Route path="/teachers/all-students" element={<TeachersSeeAllStudent />} />
      </Routes>
    </div>
  );
};

export default ForTeachers;
