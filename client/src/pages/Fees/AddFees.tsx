import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AddFees: React.FC = () => {
  const [formData, setFormData] = useState({
    studentname: '',
    studentclass: '',
    feestype: '',
    amountpaid: '',
    collectiondate: '',
    paymenttype: '',
    paymentreferencenumber: '',
    status: '',
    paymentdetails: '',
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    axios.post('/fees/add', formData)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error);
      });

    setFormData({
      studentname: '',
      studentclass: '',
      feestype: '',
      amountpaid: '',
      collectiondate: '',
      paymenttype: '',
      paymentreferencenumber: '',
      status: '',
      paymentdetails: '',
    });
  };

 return (
  <div className="content-body">
   <div className="container-fluid">

    <div className="row page-titles mx-0">
     <div className="col-sm-6 p-md-0">
      <div className="welcome-text">
       <h4>Add Fees</h4>
      </div>
     </div>
     <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
      <ol className="breadcrumb">
       <li className="breadcrumb-item"><Link to="/">Home</Link></li>
       <li className="breadcrumb-item"><Link to="/add-fees">Fees</Link></li>
       <li className="breadcrumb-item active"><Link to="/add-fees">Add Fees</Link></li>
      </ol>
     </div>
    </div>

    <div className="row">
     <div className="col-xl-12 col-xxl-12 col-sm-12">
      <div className="card">
       <div className="card-header">
        <h5 className="card-title">Add Fees</h5>
       </div>
       <div className="card-body">
        <form onSubmit={onSubmit}>
         <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
           <div className="form-group">
            <label className="form-label">Student Name</label>
            <input type="text" className="form-control" value={formData.studentname} onChange={onChangeHandler}/>
           </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
           <div className="form-group">
            <label className="form-label">Student Class</label>
            <select className="form-control" value={formData.studentclass} onChange={onChangeHandler}>
             <option value="Class">Class</option>
             <option value="Computer">Computer</option>
             <option value="Arts">Arts</option>
             <option value="Commerce">Commerce</option>
            </select>
           </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
           <div className="form-group mb-4">
            <label className="form-label"></label>
            <select className="form-control" value={formData.feestype} onChange={onChangeHandler}>
             <option value="Fess Type">Fess Type</option>
             <option value="Annual">Annual</option>
             <option value="Exam">Exam</option>
             <option value="Other">Other</option>
            </select>
           </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
           <div className="form-group">
            <label className="form-label">Amount Paid</label>
            <input type="text" className="form-control" value={formData.amountpaid} onChange={onChangeHandler}/>
           </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
           <div className="form-group mb-4">
            <label className="form-label">Collection Date</label>
            <input name="datepicker" className="datepicker-default form-control" id="datepicker" value={formData.collectiondate} onChange={onChangeHandler} />
           </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
           <div className="form-group mb-4">
            <label className="form-label"></label>
            <select className="form-control" value={formData.paymenttype} onChange={onChangeHandler}>
             <option value="Payment Type">Payment Type</option>
             <option value="Annual">Cash</option>
             <option value="Exam">Cheque</option>
             <option value="Other">Other</option>
            </select>
           </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
           <div className="form-group">
            <label className="form-label">Payment Reference Number</label>
            <input type="text" className="form-control" value={formData.paymentreferencenumber} onChange={onChangeHandler} />
           </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
           <div className="form-group mb-4">
            <label className="form-label">Status</label>
            <select className="form-control" value={formData.status} onChange={onChangeHandler}>
             <option value="Status">Status</option>
             <option value="Annual">Paid</option>
             <option value="Exam">Unpaid</option>
             <option value="Exam">Pending</option>
            </select>
           </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
           <div className="form-group">
            <label className="form-label">Payment Details</label>
            <textarea className="form-control" rows={5} value={formData.paymentdetails} onChange={onChangeHandler}></textarea>
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
