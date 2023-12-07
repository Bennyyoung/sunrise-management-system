import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

interface Staff {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      joiningdate: string;
      mobilenumber: string;
      gender: string;
      designation: string;
      dateofbirth: string;
      education: string;
    }

const Staff: React.FC<{ staff: Staff; deleteStaff: (id: string) => void }> = ({ staff, deleteStaff }) => (
 <tr>
  <td>{staff.firstname}</td>
  <td>{staff.lastname}</td>
  <td>{staff.email}</td>
  <td>{staff.joiningdate.substring(0, 10)}</td>
  {/* <td>{staff.password}</td>
        <td>{staff.confirmpassword}</td> */}
  <td>{staff.mobilenumber}</td>
  <td>{staff.gender}</td>
  <td>{staff.designation}</td>
  <td>{staff.dateofbirth.substring(0, 10)}</td>
  <td>{staff.education}</td>

  <td style={{ textAlign: 'center', padding: '0 1rem 0 1rem' }}>
   <Link to={"/edit-staff/" + staff._id} className="btn btn-sm btn-primary"><i className="la la-pencil"> </i> </Link>
   <Link to="#" onClick={() => { deleteStaff(staff._id) }} className="btn btn-sm btn-danger"><i className="la la-trash-o"></i></Link>
  </td>
 </tr>
)


const AllStaffs: React.FC<{ history: any }> = ({ history }) => {
      const [staffs, setStaffs] = useState<Staff[]>([]);
    
      useEffect(() => {
        axios.get('/staffs')
          .then(response => {
            setStaffs(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
      const deleteStaff = (id: string) => {
        axios.delete(`/staffs/${id}`)
          .then(res => {
            console.log(res.data);
            console.log('Staff successfully deleted');
            swal('Nice one', 'Staff successfully deleted', 'success');
            setStaffs(prevStaffs => prevStaffs.filter(el => el._id !== id));
          })
          .catch(error => {
            console.log(error);
          });
      };
    
      const staffList = () => {
        return staffs.map(currentStaff => (
          <Staff staff={currentStaff} deleteStaff={deleteStaff} key={currentStaff._id} />
        ));
      };
      return (
       <div className="content-body">
        {/* <!-- row --> */}
        <div className="container-fluid">
    
         <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
           <div className="welcome-text">
            <h4>All Staffs</h4>
           </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
           <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active"><Link to="/all-teachers">Staffs</Link></li>
            <li className="breadcrumb-item active"><Link to="/all-teachers">All Staffs</Link></li>
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
               <h4 className="card-title">All Staffs  </h4>
               <Link to="/add-staff" className="btn btn-primary">+ Add new</Link>
              </div>
              <div className="card-body">
               <div className="table-responsive">
                <table className="table table-striped table-bordered" style={{ minWidth: "845px" }}>
                 <thead>
                  <tr>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>First Name</th>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Last Name</th>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Email</th>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Joining Date</th>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Mobile (+234)</th>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Gender</th>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Designation</th>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>DOB</th>
                   <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Education</th>
                   {/* <td>Action</td> */}
                  </tr>
                 </thead>
                 <tbody style={{ textAlign: 'center', paddingLeft: '2rem' }}>
                  {staffList()}
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

export default AllStaffs