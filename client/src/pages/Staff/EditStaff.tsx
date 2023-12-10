import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link, useParams, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import swal from 'sweetalert'

interface Staff {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  joiningdate: Date;
  password: string;
  confirmpassword: string;
  mobilenumber: string;
  gender: string;
  designation: string;
  dateofbirth: Date;
  education: string;
}

interface RouteParams {
  id: string | undefined;
}

const EditStaff: React.FC = () => {
  const [state, setState] = useState<Staff>({
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    joiningdate: new Date(),
    password: '',
    confirmpassword: '',
    mobilenumber: '',
    gender: '',
    designation: '',
    dateofbirth: new Date(),
    education: '',
  });
  const navigate = useNavigate()

  const params = useParams();

  useEffect(() => {
    axios.get(`/staffs/${params.id}`)
      .then(response => {
        const {
          firstname,
          lastname,
          email,
          joiningdate,
          password,
          confirmpassword,
          mobilenumber,
          gender,
          designation,
          dateofbirth,
          education,
        } = response.data;
        setState({
          ...state,
          firstname,
          lastname,
          email,
          joiningdate: new Date(joiningdate),
          password,
          confirmpassword,
          mobilenumber,
          gender,
          designation,
          dateofbirth: new Date(dateofbirth),
          education,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [params.id, state]);

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, firstname: e.target.value });
  };

  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, lastname: e.target.value });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, email: e.target.value });
  };

  const onChangeJoiningDate = (date: Date) => {
    setState({ ...state, joiningdate: date });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value });
};
const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, confirmpassword: e.target.value });
};
const onChangeMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, mobilenumber: e.target.value });
};
const onChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, gender: e.target.value });
};
const onChangeDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, designation: e.target.value });
};
const onChangeDateOfBirth = (dateofbirth: Date) => {
    setState((prevState) => ({
        ...prevState,
        dateofbirth: dateofbirth,
    }));
};
const onChangeEducation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, education: e.target.value });
};


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const staffData = {
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      joiningdate: state.joiningdate,
      password: state.password,
      confirmpassword: state.confirmpassword,
      mobilenumber: state.mobilenumber,
      gender: state.gender,
      designation: state.designation,
      dateofbirth: state.dateofbirth,
      education: state.education,
    };

    axios.post(`/staffs/update/${params.id}`, staffData)
      .then(res => {
        console.log(res.data);
        console.log(staffData);
        console.log('Staff successfully updated');
        swal('Good job', 'Staff successfully updated', 'success');
      })
      .catch(error => {
        console.log(error);
        swal('Couldn\'t update staff', 'Please input or check all fields properly', 'error');
      });

    navigate('/all-staffs');
  };
  return (
   <div className="content-body">
    <div className="container-fluid">

     <div className="row page-titles mx-0">
      <div className="col-sm-6 p-md-0">
       <div className="welcome-text">
        <h4>Edit Staff</h4>
       </div>
      </div>
      <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
       <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item active"><Link to="/all-staffs">Staffs</Link></li>
        <li className="breadcrumb-item active"><Link to="/add-staff">Add Staff</Link></li>
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
             <label className="form-label">First Name</label>
             <input type="text" className="form-control" value={state.firstname} onChange={onChangeFirstName} required />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Last Name</label>
             <input type="text" className="form-control" value={state.lastname} onChange={onChangeLastName} />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Email Here</label>
             <input type="text" className="form-control" value={state.email} onChange={onChangeEmail} />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Joining Date:</label> <br />
             <DatePicker
              selected={state.joiningdate}
              onChange={onChangeJoiningDate}
             />

             {/* <input name="datepicker" className="datepicker-default form-control" id="datepicker" value={state.joiningdate} onChange={onChangeJoiningDate} /> */}
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Password</label>
             <input type="password" className="form-control" value={state.password} onChange={onChangePassword} />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Confirm Password</label>
             <input type="password" className="form-control" value={state.confirmpassword} onChange={onChangeConfirmPassword} />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Mobile Number (+234)</label>
             <input type="tel" className="form-control" value={state.mobilenumber} onChange={onChangeMobileNumber} />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Gender</label>
             <select className="form-control" value={state.gender} onChange={onChangeGender}>
              <option value="Gender">Please select a gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
             </select>
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Designation</label>
             <input type="text" className="form-control" value={state.designation} onChange={onChangeDesignation} />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Date of Birth</label><br />
             <DatePicker
              selected={state.dateofbirth}
              onChange={onChangeDateOfBirth}
             />
            </div>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
             <label className="form-label">Education</label>
             <input type="text" className="form-control" value={state.education} onChange={onChangeEducation} />
            </div>
           </div>
           <div className="col-lg-12 col-md-12 col-sm-12">
            <button type="submit" className="btn btn-primary">Update</button>
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

 export default EditStaff
