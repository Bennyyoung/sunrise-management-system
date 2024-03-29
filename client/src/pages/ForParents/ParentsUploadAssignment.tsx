import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Dropzone from 'react-dropzone'

interface ParentsUploadAssignmentState {
  teachersname: string;
  subject: string;
  staffs: string[];
}

const ParentsUploadAssignment: React.FC = () => {
  const [state, setState] = useState<ParentsUploadAssignmentState>({
    teachersname: '',
    subject: '',
    staffs: []
  });

  useEffect(() => {
    axios.get('/staffs')
      .then(response => {
        if (response.data.length > 0) {
          setState(prevState => ({
            ...prevState,
            staffs: response.data.map((staff: any) => staff.firstname + ' ' + staff.lastname)
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onChangeTeachersName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prevState => ({
      ...prevState,
      teachersname: e.target.value
    }));
  };

  const onChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prevState => ({
      ...prevState,
      subject: e.target.value
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const assignment = {
      teachersname: state.teachersname,
      subject: state.subject
    };

    console.log(assignment);

    axios.post('/assignments/add', assignment)
      .then(res => {
        console.log(res.data);
        swal("Good job", "Assignment Successfully Submitted", "success");
      })
      .catch(error => {
        console.log(error);
        swal("Couldn't submit assignment", "Please input or check all fields properly", "error");
      });

    setState(prevState => ({
      ...prevState,
      teachersname: '',
      subject: ''
    }));
  };


  return (
   <div className="content-body">
    <div className="container-fluid">

     <div className="row page-titles mx-0">
      <div className="col-sm-6 p-md-0">
       <div className="welcome-text">
        <h4>Assignment</h4>
       </div>
      </div>
      <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
       <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item active"><Link to="/all-students">Students</Link></li>
        <li className="breadcrumb-item active"><Link to="/upload-assignment">Upload Assignment</Link></li>
       </ol>
      </div>
     </div>

     <div className="row">
      <div className="col-lg-12">
       <ul className="nav nav-pills mb-3">
        <li className="nav-item"><a href="#list-view" data-toggle="tab" className="nav-link btn-primary mr-1 show active">List View</a></li>
        <li className="nav-item"><a href="#grid-view" data-toggle="tab" className="nav-link btn-primary">Grid View</a></li>
       </ul>
      </div>
      <div className="col-lg-12">
       <div className="row tab-content">
        <div id="list-view" className="tab-pane fade active show col-lg-12">
         <div className="card">
          <div className="card-header">
           <h4 className="card-title">Upload Assignments</h4>
          </div>
          <div className="card-body">
           <div className="table-responsive">
            <form action="#" method="post">
             <div className="form-group">
              <div className="input-group">
               <div className="input-group-prepend">
                <span className="input-group-text">Submit To</span>
               </div>
               <select className="form-control" value={state.teachersname} onChange={onChangeTeachersName} required>
                <option value="Class">Please select the teachers name</option>
                {
                 state.staffs.map(function (staff) {
                  return <option
                  key={staff}
                  value={staff}
                  >
                   {staff}
                  </option>
                 })
                }
               </select>

              </div>
             </div>
             <div className="form-group">
              <div className="input-group">
               <div className="input-group-prepend">
                <span className="input-group-text">Subject</span>
               </div>
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
             <div className="form-group">
              <div className="summernote"></div>
             </div>
             <div className="row align-items-center">
              <div className="col-lg-6">
               <div className="fallback w-100">
                {/* <Dropzone>

                 <p>Drag and drop a file OR click here to select a file</p>
                </Dropzone> */}
               </div>
              </div>
              <div className="col-lg-6">
               <button type="button" className="btn btn-primary float-right">
                Send <i className="fa fa-paper-plane-o"></i>
               </button>
              </div>
             </div>
            </form>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  )
}

export default ParentsUploadAssignment