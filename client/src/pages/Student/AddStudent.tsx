import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import swal from 'sweetalert'

const AddStudent: React.FC = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
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


    const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, firstname: e.target.value });
      };
    
      const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, lastname: e.target.value });
      };

      const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, email: e.target.value });
      };

      const onChangeRegistrationDate = (registrationdate: Date) => {
        setState({ ...state, registrationdate: registrationdate});
      };

      const onChangeRollNo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, rollno: e.target.value });
      };

      const onChangeStudentClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, studentclass: e.target.value });
      };

      const onChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, gender: e.target.value });
      };
      const onChangeParentsName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, parentsname: e.target.value });
      };
      const onChangeParentsMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, parentsmobilenumber: e.target.value });
      };
      const onChangeDateOfBirth = (dateofbirth: Date) => {
        setState((prevState) => ({
            ...prevState,
            dateofbirth: dateofbirth,
        }));
    };
      const onChangeBloodGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, bloodgroup: e.target.value });
      };
      const onChangeHealthIssues = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, bloodgroup: e.target.value });
      };
      const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, bloodgroup: e.target.value });
      };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const student = {
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email,
            registrationdate: state.registrationdate,
            rollno: state.rollno,
            studentclass: state.studentclass,
            gender: state.gender,
            parentsname: state.parentsname,
            parentsmobilenumber: state.parentsmobilenumber,
            dateofbirth: state.dateofbirth,
            bloodgroup: state.bloodgroup,
            healthissues: state.healthissues,
            address: state.address,
        };

        console.log(student);

        axios
            .post('/students/add', student)
            .then(res => {
                console.log(res.data);
                swal('Good job', 'Student successfully added', 'success');
                setState({
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
                navigate('/all-students');
            })
            .catch(function (error) {
                console.log(error);
                swal("Couldn't add students", 'Please input or check all fields properly', 'error');
            });
    };

    return (
        <div className="content-body">
            <div className="container-fluid">

                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Add Student</h4>
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
                                                <input type="text" className="form-control" value={state.lastname} onChange={onChangeLastName} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Parent Email</label>
                                                <input type="email" className="form-control" value={state.email} onChange={onChangeEmail} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Registration Date</label><br />
                                                <DatePicker
                                                    selected={state.registrationdate}
                                                    onChange={onChangeRegistrationDate}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Roll No.</label>
                                                <input type="number" className="form-control" value={state.rollno} onChange={onChangeRollNo} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Class</label>
                                                <select className="form-control" value={state.studentclass} onChange={onChangeStudentClass} required>
                                                    <option value="Class">Please select a class</option>
                                                    <option value="creche">Creche</option>
                                                    <option value="preschool">Pre School</option>
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
                                                <select className="form-control" value={state.gender} onChange={onChangeGender} required>
                                                    <option value="Gender">Please select a gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Parents Name</label>
                                                <input type="tel" className="form-control" value={state.parentsname} onChange={onChangeParentsName} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Parents Mobile Number (+234)</label>
                                                <input type="text" className="form-control" value={state.parentsmobilenumber} onChange={onChangeParentsMobileNumber} required />
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
                                                <label className="form-label">Blood Group</label>
                                                <select className="form-control" value={state.bloodgroup} onChange={onChangeBloodGroup}>
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
                                                <label className="form-label" style={{ color: 'red' }}>Health issues:</label>
                                                <textarea className="form-control" rows={5} placeholder="If any health issues kindly state" value={state.healthissues} onChange={onChangeHealthIssues} required></textarea>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Address</label>
                                                <textarea className="form-control" rows={5} value={state.address} onChange={onChangeAddress} required></textarea>
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

export default AddStudent