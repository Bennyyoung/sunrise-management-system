import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import swal from 'sweetalert'
import { backendUrl } from '../../http/env'
import Select from '../../components/modules/Select/Select'
import classArray from '../../data/class'
import subjectArray from '../../data/subject'
import PageHeaders from '../../components/Headers/pages/PageHeaders'

interface Result {
  studentfullname: string;
  subject: string;
  studentclass: string;
  test: string;
  exam: string;
  resultdate: Date;
  session: string;
  term: string;
  responsible: string;
}

const AddNewResult = () => {
  const [newResult, setNewResult] = useState({
    studentfullname: "",
    subject: "",
    studentclass: "",
    test: "",
    exam: "",
    resultdate: new Date(),
    session: "",
    term: "",
    responsible: "",
    snames: []
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | Date | null) => {
    if (e === null) {
      setNewResult(prevState => ({
        ...prevState,
        resultdate: new Date()
      }))
    } else if ('target' in e) {
      const { name, value } = e.target as HTMLInputElement
      setNewResult(prevState => ({
        ...prevState,
        [name]: value
      }))
    } else {
      setNewResult(prevState => ({
        ...prevState,
        result: e
      }))
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backendUrl}/students`)
      if (response.data.length > 0) {
        const returnedNames = response.data.map((sname: any) => `${sname.firstname} ${sname.lastname}`)
        setNewResult(prevState => ({
          ...prevState,
          studentfullname: `${response.data[0].firstname} ${response.data[0].lastname}`,
          snames: returnedNames
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {

    fetchStudents()
  }, []);

  console.log('newResult', newResult)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/results/add`, newResult)
      console.log(res.data);
      swal("Good job", "Student Result Successfully Uploaded", "success");
    } catch (error) {
      console.log(error);
      swal("Couldn't upload student result", "Please input or check all fields properly", "error");
    }

    setNewResult({
      studentfullname: "",
      subject: "",
      studentclass: "",
      test: "",
      exam: "",
      resultdate: new Date(),
      session: "",
      term: "",
      responsible: "",
      snames: []
    })
  };



  return (
    <div className="content-body">
      <div className="container-fluid">
        <PageHeaders
          heading={"Add New Result"}
          link1Href={"/"}
          link1Label={"Home"}
          link2Href={"/all-result"}
          link2Label={"Exam Grade"}
          link3Href={"/add-new-result"}
          link3Label={"Add New Result"}
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

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Student Name</label>
                        <select className="form-control" value={newResult.studentfullname} name="studentfullname" onChange={(e) => handleChange(e)} required>
                          {
                            newResult.snames.map(function (sname) {
                              return <option
                                key={sname}
                                value={sname}
                              >
                                {sname}

                              </option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                    
                    <Select
                      name={newResult.studentclass}
                      label="Class"
                      className="form-control"
                      value={"studentclass"}
                      options={classArray}
                      onChange={(e) => handleChange(e)}
                      required
                    />

                    <Select
                      name="subject"
                      label="Subject"
                      className="form-control"
                      value={newResult.subject}
                      options={subjectArray}
                      onChange={(e) => handleChange(e)}
                      required
                    />

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Test (40)</label>
                        <input type="number" className="form-control" value={newResult.test} name="test" onChange={(e) => handleChange(e)} required />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Exam (60)</label>
                        <input type="number" className="form-control" value={newResult.exam} name="exam" onChange={(e) => handleChange(e)} required />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Result Date</label><br />
                        <DatePicker
                          selected={newResult.resultdate}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Session</label>
                        <select className="form-control" value={newResult.session} name="session" onChange={(e) => handleChange(e)} required>
                          <option value="Select a session">Please select a Session</option>
                          <option value="2020/2021">2020/2021</option>
                          <option value="2021/2022">2021/2022</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Term</label>
                        <select className="form-control" value={newResult.term} name="term" onChange={(e) => handleChange(e)} required>
                          <option value="Select a term">Please select the Term</option>
                          <option value="1st Term">1st Term</option>
                          <option value="2nd Term">2nd Term</option>
                          <option value="3rd Term">3rd Term</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Responsible</label>
                        <input type="text" className="form-control" value={newResult.responsible} name="responsible" onChange={(e) => handleChange(e)} required />
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

export default AddNewResult