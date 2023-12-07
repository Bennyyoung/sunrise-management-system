import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface ExpenseProps {
  name: string;
  expensetype: string;
  amount: number;
  phone: string;
  email: string;
  status: string;
  date: string;
  _id: string; 
}

const Expense: React.FC<{ expense: ExpenseProps; deleteExpense: (id: string) => void }> = ({ expense, deleteExpense }) => (
  <tr>
    <td>{expense.name}</td>
    <td>{expense.expensetype}</td>
    <td>{expense.amount}</td>
    <td>{expense.phone}</td>
    <td>{expense.email}</td>
    <td>{expense.status}</td>
    <td>{expense.date}</td>
  </tr>
);


const AllExpenses: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseProps[]>([]);

  useEffect(() => {
    axios.get('/expenses/')
      .then(response => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExpense = (id: string) => {
    axios.delete(`${process.env.BACK_END}/expenses/` + id)
      .then(res => console.log(res.data));

    setExpenses(prevExpenses => prevExpenses.filter(el => el._id !== id));
  };

  const expenseList = () => {
    return expenses.map((currentexpense) => (
      <Expense
        expense={currentexpense}
        deleteExpense={deleteExpense}
        key={currentexpense._id}
      />
    ));
  };

  return (
    <div className="content-body">
     {/* <!-- row --> */}
     <div className="container-fluid">
 
      <div className="row page-titles mx-0">
       <div className="col-sm-6 p-md-0">
        <div className="welcome-text">
         <h4>All Expenses</h4>
        </div>
       </div>
       <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol className="breadcrumb">
         <li className="breadcrumb-item"><Link to="/">Home</Link></li>
         <li className="breadcrumb-item active"><Link to="/all-expenses">Expenses</Link></li>
         <li className="breadcrumb-item active"><Link to="/all-expenses">All Expenses</Link></li>
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
            <h4 className="card-title">All Expenses  </h4>
            <Link to="/add-expense" className="btn btn-primary">+ Add new</Link>
           </div>
           <div className="card-body">
            <div className="table-responsive">
             <table className="display" style={{ minWidth: "845px" }}>
              <thead>
               <tr>
                <th style={{ textAlign: 'center', paddingLeft: '1rem' }}>Name</th>
                <th style={{ textAlign: 'center', paddingLeft: '1rem' }}>Expense Type</th>
                <th style={{ textAlign: 'center', paddingLeft: '1rem' }}>Amount</th>
                <th style={{ textAlign: 'center', paddingLeft: '1rem' }}>Phone</th>
                <th style={{ textAlign: 'center', paddingLeft: '1rem' }}>Email</th>
                <th style={{ textAlign: 'center', paddingLeft: '1rem' }}>Status</th>
                <th style={{ textAlign: 'center', paddingLeft: '1rem' }}>Date</th>
                {/* <td>Action</td> */}
               </tr>
              </thead>
              <tbody style={{ textAlign: 'center', paddingLeft: '1rem' }}>
               {expenseList()}
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

export default AllExpenses