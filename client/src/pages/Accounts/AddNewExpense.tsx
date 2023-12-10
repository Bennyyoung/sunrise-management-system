import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { backendUrl } from '../../http/env';
import PageHeaders from '../../components/Headers/pages/PageHeaders';
import Select from '../../components/modules/Select/Select';
import expenseTypeArray from '../../data/expenseTypeArray';
import Input from '../../components/modules/Input/Input';
import expenseStatusArray from '../../data/expenseStatus';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setExpense(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/expenses/add`, expense)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }

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

        <PageHeaders
          heading={"Add New Expense"}
          link1Href={"/"}
          link1Label={"Home"}
          link2Href={"/all-new-expense"}
          link2Label={"Expense"}
          link3Href={"/add-new-expense"}
          link3Label={"Add New Expense"}
        />

        <div className="row">
          <div className="col-xl-12 col-xxl-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Basic Info</h5>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="row">

                    <Input
                      label='Name'
                      type={"text"}
                      placeholder={"Name"}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="name"
                      value={expense.name}
                      required
                    />

                    <Select
                      label="Expense Type"
                      name="expenseType"
                      className="form-control"
                      value={expense.expensetype}
                      options={expenseTypeArray}
                      onChange={(e) => handleChange(e)}
                      required
                    />

                    <Input
                      label='Amount'
                      type={"text"}
                      placeholder={"Amount"}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="amount"
                      value={expense.amount}
                      required
                    />

                    <Input
                      label='Phone'
                      type={"text"}
                      placeholder={"Phone"}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="phone"
                      value={expense.phone}
                      required
                    />

                    <Input
                      label='Email'
                      type={"email"}
                      placeholder={"Email"}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="email"
                      value={expense.email}
                      required
                    />

                    <Select
                      label="Status"
                      name="status"
                      className="form-control"
                      value={expense.status}
                      options={expenseStatusArray}
                      onChange={(e) => handleChange(e)}
                      required
                    />

                    <Input
                      label='Date'
                      type={"date"}
                      placeholder={"Email"}
                      className="datepicker-default form-control"
                      onChange={(e) => handleChange(e)}
                      name="datepicker"
                      value={expense.date}
                      required
                    />

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