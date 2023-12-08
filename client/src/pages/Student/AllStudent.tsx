import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

interface StudentProps {
  student: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    registrationdate: string;
    rollno: string;
    studentclass: string;
    gender: string;
    parentsname: string;
    parentsmobilenumber: string;
    dateofbirth: string;
    bloodgroup: string;
    healthissues: string;
    address: string;
  };
  deleteStudent: (id: string) => void;
}

const Student: React.FC<StudentProps> = ({ student, deleteStudent }) => (
  <tr>
    <td>{student.firstname}</td>
    <td>{student.lastname}</td>
    <td>{student.email}</td>
    <td>{student.registrationdate.substring(0, 10)}</td>
    <td>{student.rollno}</td>
    <td>{student.studentclass}</td>
    <td>{student.gender}</td>
    <td>{student.parentsname}</td>
    <td>{student.parentsmobilenumber}</td>
    <td>{student.dateofbirth.substring(0, 10)}</td>
    <td>{student.bloodgroup}</td>
    <td>{student.healthissues}</td>
    <td>{student.address}</td>


    <td style={{ textAlign: 'center', padding: '0 1rem 0 1rem' }}>
      <Link to={"/edit-student/" + student._id} className="btn btn-sm btn-primary"><i className="la la-pencil"> </i> </Link>
      <Link to="#" onClick={() => { deleteStudent(student._id) }} className="btn btn-sm btn-danger"><i className="la la-trash-o"></i></Link>
    </td>
  </tr>
)

const AllStudent: React.FC = () => {
  const [students, setStudents] = useState<Array<any>>([]);

  useEffect(() => {
    axios
      .get('/students/')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteStudent = (id: string) => {
    axios.delete('/students/' + id).then((res) => {
      console.log(res.data);
      console.log('Student successfully deleted');
      swal('Nice one', 'Student successfully deleted', 'success');
      setStudents(students.filter((el) => el._id !== id));
    });
  };

  const studentList = () => {
    return students.map((currentstudent) => {
      return (
        <Student
          student={currentstudent}
          deleteStudent={deleteStudent}
          key={currentstudent._id}
        />
      );
    });
  };

  return (
    <div className="content-body">
      <div className="container-fluid">

        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>All Student</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active"><Link to="/all-students">Students</Link></li>
              <li className="breadcrumb-item active"><Link to="/all-students">All Student</Link></li>
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
                    <h4 className="card-title">All Students List  </h4>
                    <a href="/add-student" className="btn btn-primary">+ Add new</a>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>First Name</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Last Name</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Parents Email</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Admission Date</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Roll No.</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Class</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Gender</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Parents Name</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Parents Number</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>DOB</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Blood Group</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Health Issues</th>
                            <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem', justifyContent: 'right' }}>Address</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center', paddingLeft: '2rem' }}>
                          {studentList()}

                        </tbody>
                      </table>
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

export default AllStudent
