import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AddNewExpense = () => {
    const [expense, setExpense] = useState({
        name: '',
        expensetype: '',
        amount: '',
        phone: '',
        email: '',
        status: '',
        date: ''
      });
    
      const {
        name,
        expensetype,
        amount,
        phone,
        email,
        status,
        date
      } = expense;
    
      const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
      };
    
      const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        axios.post('/expenses/add', expense)
          .then(res => console.log(res.data))
          .catch(error => {
            console.log(error);
          });
    
        setExpense({
          name: '',
          expensetype: '',
          amount: '',
          phone: '',
          email: '',
          status: '',
          date: ''
        });
      };

      return (
        <div className="content-body">
         <div className="container-fluid">
     
          <div className="row page-titles mx-0">
           <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
             <h4>Add New Expense</h4>
            </div>
           </div>
           <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
            <ol className="breadcrumb">
             <li className="breadcrumb-item"><Link to="/">Home</Link></li>
             <li className="breadcrumb-item active"><Link to="/all-new-expense">Expense</Link></li>
             <li className="breadcrumb-item active"><Link to="/add-new-expense">Add New Expense</Link></li>
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
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => onChange(e)} name="name" required />
                 </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                 <div className="form-group">
                  <label className="form-label">Expense Type</label>
                  <select className="form-control" value={expensetype} onChange={(e) => onChange(e)} required>
                   <option value="Class">Please Select</option>
                   <option value="html">Salary</option>
                   <option value="css">Transport</option>
                   <option value="javascript">Maintenance</option>
                   <option value="angular">Purchase</option>
                   <option value="angular">Utilities</option>
                  </select>
                 </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                 <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input type="text" className="form-control" value={amount} onChange={(e) => onChange(e)} required />
                 </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                 <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="Number" className="form-control" value={phone} onChange={(e) => onChange(e)} required />
                 </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                 <div className="form-group">
                  <label className="form-label">E-Mail Address</label>
                  <input type="text" className="form-control" value={email} onChange={(e) => onChange(e)} required />
                 </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                 <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-control" value={status} onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(e)} required>
                   <option value="Please Select">Please Select</option>
                   <option value="paid">Paid</option>
                   <option value="due">Due</option>
                   <option value="others">Others</option>
                  </select>
                 </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                 <div className="form-group">
                  <label className="form-label">Date</label>
                  <input name="datepicker" className="datepicker-default form-control" id="datepicker" value={date} onChange={onChange} required />
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

export default AddNewExpense 