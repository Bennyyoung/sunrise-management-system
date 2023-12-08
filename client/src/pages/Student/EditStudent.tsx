import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import swal from 'sweetalert'

interface Student {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    registrationdate: Date;
    rollno: string;
    studentclass: string;
    gender: string;
    parentsname: string;
    parentsmobilenumber: string;
    dateofbirth: Date;
    bloodgroup: string;
    healthissues: string;
    address: string;
  }

  const EditStudent: React.FC<any> = (props) => {
    const [student, setStudent] = useState<Student>({
      _id: '',
      firstname: '',
      lastname: '',
      email: '',
      registrationdate: new Date(),
      rollno: '',
      studentclass: '',
      gender: '',
      parentsname: '',
      parentsmobilenumber: '',
      dateofbirth: new Date(),
      bloodgroup: '',
      healthissues: '',
      address: '',
    });



 useEffect(() => {
    axios
      .get(`/students/${props.match.params.id}`)
      .then((response) => {
        const data = response.data;
        setStudent({
          ...data,
          registrationdate: new Date(data.registrationdate),
          dateofbirth: new Date(data.dateofbirth),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, firstname: e.target.value });
  };

  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, lastname: e.target.value });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, email: e.target.value });
  };

  const onChangeRegistrationDate = (registrationdate: Date) => {
    setStudent({ ...student, registrationdate: registrationdate});
  };

  const onChangeRollNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, rollno: e.target.value });
  };

  const onChangeStudentClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudent({ ...student, studentclass: e.target.value });
  };

  const onChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudent({ ...student, gender: e.target.value });
  };
  const onChangeParentsName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, parentsname: e.target.value });
  };
  const onChangeParentsMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, parentsmobilenumber: e.target.value });
  };
  const onChangeDateOfBirth = (dateofbirth: Date) => {
    setStudent((prevState) => ({
        ...prevState,
        dateofbirth: dateofbirth,
    }));
};
  const onChangeBloodGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudent({ ...student, bloodgroup: e.target.value });
  };
  const onChangeHealthIssues = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStudent({ ...student, bloodgroup: e.target.value });
  };
  const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStudent({ ...student, bloodgroup: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`/students/update/${props.match.params.id}`, student)
      .then((res) => {
        console.log(res.data);
        console.log(student);
        console.log('Student successfully updated');
        swal('Good job', 'Student successfully updated', 'success');
        props.history.push('/all-students');
      })
      .catch((error) => {
        console.log(error);
        swal("Couldn't update student", 'Please input or check all fields properly', 'error');
      });
  };



 return (
    <div className="content-body">
     <div className="container-fluid">
 
      <div className="row page-titles mx-0">
       <div className="col-sm-6 p-md-0">
        <div className="welcome-text">
         <h4>Edit Student</h4>
        </div>
       </div>
       <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol className="breadcrumb">
         <li className="breadcrumb-item"><Link to="/">Home</Link></li>
         <li className="breadcrumb-item active"><Link to="/all-students">Students</Link></li>
         <li className="breadcrumb-item active"><Link to="/add-student">Add Student</Link></li>
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
          <form onSubmit={handleSubmit}>
           <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" value={student.firstname} onChange={onChangeFirstName} required />
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" value={student.lastname} onChange={onChangeLastName} required />
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" value={student.email} onChange={onChangeEmail} required />
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Registration Date</label><br />
              <DatePicker
               selected={student.registrationdate}
               onChange={onChangeRegistrationDate}
              />
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Roll No.</label>
              <input type="number" className="form-control" value={student.rollno} onChange={onChangeRollNo} required />
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Class</label>
              <select className="form-control" value={student.studentclass} onChange={onChangeStudentClass} required>
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
              <label className="form-label">Gender</label>
              <select className="form-control" value={student.gender} onChange={onChangeGender} required>
               <option value="Gender">Please select a gender</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
              </select>
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Parents Name</label>
              <input type="tel" className="form-control" value={student.parentsname} onChange={onChangeParentsName} required />
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Parents Mobile Number (+234)</label>
              <input type="text" className="form-control" value={student.parentsmobilenumber} onChange={onChangeParentsMobileNumber} required />
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Date of Birth</label><br />
              <DatePicker
               selected={student.dateofbirth}
               onChange={onChangeDateOfBirth}
              />
             </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
             <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-control" value={student.bloodgroup} onChange={onChangeBloodGroup}>
               <option value="Gender">Please select a blood group</option>
               <option value="O-">O-</option>
               <option value="O+">O+</option>
               <option value="A-">A-</option>
               <option value="A+">A+</option>
               <option value="B-">B-</option>
               <option value="B+">B+</option>
               <option value="AB-">AB-</option>
               <option value="AB-">AB+</option>
              </select>
             </div>
            </div>
 
            <div className="col-lg-12 col-md-12 col-sm-12">
             <div className="form-group">
              <label className="form-label" style={{color: 'red'}}>Health issues:</label>
              <textarea className="form-control" rows={5} placeholder="If any health issues kindly student" value={student.healthissues} onChange={onChangeHealthIssues} required></textarea>
             </div>
            </div>
 
            <div className="col-lg-12 col-md-12 col-sm-12">
             <div className="form-group">
              <label className="form-label">Address</label>
              <textarea className="form-control" rows={5} value={student.address} onChange={onChangeAddress} required></textarea>
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

export default EditStudent