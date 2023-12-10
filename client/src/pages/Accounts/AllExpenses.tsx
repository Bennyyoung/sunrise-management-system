import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PageHeaders from '../../components/Headers/pages/PageHeaders';
import { backendUrl } from '../../Http/env';

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

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${backendUrl}/expenses/`)
      setExpenses(response.data);

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getExpenses()
  }, []);

  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`${backendUrl}/expenses/${id}`)
      setExpenses(prevExpenses => prevExpenses.filter(el => el._id !== id));
    } catch (error) {
      console.error(error)
    }
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

        <PageHeaders
          heading={"All Expenses"}
          link1Href={"/"}
          link1Label={"Home"}
          link2Href={"/all-expenses"}
          link2Label={"Expenses"}
          link3Href={"/all-expenses"}
          link3Label={"All Expenses"}
        />

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