import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import swal from 'sweetalert'

const TeachersAddNewResult: React.FC = () => {
    const [state, setState] = useState({
      studentname: '',
      studentclass: '',
      subject: '',
      classtest: '',
      midtermtest: '',
      midtermtotal: '',
      exam: '',
      examtotal: '',
      average: '',
      position: '',
      resultdate: new Date(),
      responsible: '',
    });
  

 const onChangeStudentName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, studentname: e.target.value });
  };

  const onChangeStudentClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, studentclass: e.target.value });
  };

  const onChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, subject: e.target.value });
  };

  const onChangeClassTest = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setState({ ...state, classtest: e.target.value });
  };

  const onChangeMidTermTest = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setState({ ...state, midtermtest: e.target.value });
  };

  const onChangeMidTermTotal = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setState({ ...state, midtermtotal: e.target.value });
  };

  const onChangeExam = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setState({ ...state, exam: e.target.value });
  };

  const onChangeExamTotal = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setState({ ...state, examtotal: e.target.value });
  };

  const onChangeAverage = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setState({ ...state,  average: e.target.value });
  };

  const onChangePosition = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setState({ ...state,   position: e.target.value });
  };

  const onChangeResponsible = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setState({ ...state, responsible: e.target.value });
  };

 const onChangeResultDate = (date: Date | null) => {
    setState({ ...state, resultdate: date || new Date() });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = { ...state };

    console.log(result);

    axios
      .post('results/add', result)
      .then((res) => {
        console.log(res.data);
        swal('Good job', 'Student Result Successfully Uploaded', 'success');
      })
      .catch(function (error) {
        console.log(error);
        swal(
          "Couldn't upload student result",
          'Please input or check all fields properly',
          'error'
        );
      });

    setState({
      studentname: '',
      studentclass: '',
      subject: '',
      classtest: '',
      midtermtest: '',
      midtermtotal: '',
      exam: '',
      examtotal: '',
      average: '',
      position: '',
      resultdate: new Date(),
      responsible: '',
    });
  };

  return (
   <div className="content-body">
    <div className="container-fluid">

     <div className="row page-titles mx-0">
      <div className="col-sm-6 p-md-0">
       <div className="welcome-text">
        <h4>Add New Result</h4>
       </div>
      </div>
      <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
       <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item active"><Link to="/all-result">Exam Grade</Link></li>
        <li className="breadcrumb-item active"><Link to="/add-new-result">Add New Result</Link></li>
       </ol>
      </div>
     </div>

     <div className="row">
      <div className="col-xl-12 col-xxl-12 col-sm-12">
       <div className="card">
        <div className="card-header">
         <h5 className="card-title">Basic Info</h5>
        </div>
        <div className="card-body">
         <form onSubmit={onSubmit}>
          <div className="row">
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Student Name</label>
             <input type="text" className="form-control" value={state.studentname} onChange={onChangeStudentName} required />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Class</label>
             <select className="form-control" value={state.studentclass} onChange={onChangeStudentClass} required>
              <option value="Class">Please select a class</option>
              <option value="creche">Creche/Pre-School</option>
              <option value="Nursery 1">Nursery 1</option>
              <option value="Nursery 2">Nursery 2</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
             </select>
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Subject</label>
             <select className="form-control" value={state.subject} onChange={onChangeSubject} required>
              <option value="Class">Please select a subject</option>
              <option value="English">English</option>
              <option value="Maths">Maths</option>
              <option value="SOS">SOS</option>
              <option value="Basic Science">General Paper</option>
              <option value="CRK">CRK</option>
              <option value="Home Econ">H/Econ</option>
              <option value="Verbal">Verbal</option>
              <option value="Quantitative">Quantitative</option>
              <option value="Agric">Agric</option>
              <option value="Handwriting">Handwriting</option>
              <option value="French">French</option>
              <option value="Igbo">Igbo</option>
              <option value="Non Verbal">Non Verbal</option>
              <option value="Vocational">Vocational</option>
              <option value="Basic Science">Basic Science</option>
              <option value="Creative Arts">Creative Arts</option>
              <option value="Computer">Computer</option>
              <option value="P.H.E">P.H.E</option>
              <option value="Civic">Civic</option>
              <option value="History">History</option>
             </select>
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Class Test</label>
             <input type="number" className="form-control" value={state.classtest} onChange={onChangeClassTest} required />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Mid-Term Test</label>
             <input type="number" className="form-control" value={state.midtermtest} onChange={onChangeMidTermTest} required />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Mid-Term Total</label>
             <input type="number" className="form-control" value={state.midtermtotal} onChange={onChangeMidTermTotal} required />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Exam</label>
             <input type="number" className="form-control" value={state.exam} onChange={onChangeExam} required />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">All Total</label>
             <input type="number" className="form-control" value={state.examtotal} onChange={onChangeExamTotal} required />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Average</label>
             <input type="number" className="form-control" value={state.average} onChange={onChangeAverage} required />
            </div>
           </div>           
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Position</label>
             <input type="number" className="form-control" value={state.position} onChange={onChangePosition} required />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Result Date</label><br />
             <DatePicker
              selected={state.resultdate}
              onChange={onChangeResultDate}
             />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Responsible</label>
             <input type="text" className="form-control" value={state.responsible} onChange={onChangeResponsible} required />
            </div>
           </div>
           <div className="col-lg-12 col-md-12 col-sm-12">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="submit" className="btn btn-light">Cancel</button>
           </div>
          </div>
         </form>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  )
  
}

export default TeachersAddNewResult
