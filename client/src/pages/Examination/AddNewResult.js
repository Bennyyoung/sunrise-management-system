import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import swal from 'sweetalert'

export default class AddNewResult extends Component {
  constructor(props) {
    super(props)

    this.onChangeStudentFullName = this.onChangeStudentFullName.bind(this)
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeStudentClass = this.onChangeStudentClass.bind(this);
    this.onChangeTest = this.onChangeTest.bind(this);
    this.onChangeExam = this.onChangeExam.bind(this);
    this.onChangeResultDate = this.onChangeResultDate.bind(this);
    this.onChangeSession = this.onChangeSession.bind(this);
    this.onChangeTerm = this.onChangeTerm.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      studentfullname: '',
      subject: '',
      studentclass: '',
      test: '',
      exam: '',
      resultdate: new Date(),
      session: '',
      term: '',
      responsible: '',
      snames: [],
    };
  }

  componentDidMount() {
    axios.get('/students')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            snames: response.data.map(sname => sname.firstname + ' ' + sname.lastname),
            studentfullname: response.data[0].firstname + ' ' + response.data[0].lastname
          })
          console.log("Data Response from JSON:" + JSON.stringify(response.data[0].firstname + ' ' + response.data[0].lastname));
          console.log("Response data length:" + response.data.length)

        }
      })
  }

  onChangeStudentFullName(e) {
    this.setState({
      studentfullname: e.target.value
    })
  }

  onChangeStudentClass(e) {
    this.setState({
      studentclass: e.target.value
    })
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    })
  }

  onChangeTest(e) {
    this.setState({
      test: e.target.value
    })
  }

  onChangeExam(e) {
    this.setState({
      exam: e.target.value
    })
  }
  
  onChangeResultDate(resultdate) {
    this.setState({
      resultdate: resultdate
    })
  }

  onChangeSession(e) {
    this.setState({
      session: e.target.value
    })
  }
  onChangeTerm(e) {
    this.setState({
      term: e.target.value
    })
  }

  onChangeResponsible(e) {
    this.setState({
      responsible: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const result = {
      studentfullname: this.state.studentfullname,
      studentclass: this.state.studentclass,
      subject: this.state.subject,
      test: this.state.test,
      exam: this.state.exam,
      resultdate: this.state.resultdate,
      session: this.state.session,
      term: this.state.term,
      responsible: this.state.responsible
    }


    axios.post('/results/add', result)
      .then(res => {
        console.log(res.data)
        swal("Good job", "Student Result Successfully Uploaded", "success")

      })
      .catch(function (error) {
        console.log(error)
        swal("Couldn't upload student result", "Please input or check all fields properly", "error")
      })

    console.log(result);



    this.setState({
      studentfullname: '',
      studentclass: '',
      subject: '',
      test: '',
      exam: '',
      resultdate: new Date(),
      session: '',
      term: '',
      responsible: ''
    })
  }

  render() {
    return (
      <div className="content-body">
        <div className="container-fluid">

          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Add New Result</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active"><Link to="/all-result">Exam Grade</Link></li>
                <li className="breadcrumb-item active"><Link to="/add-new-result">Add New Result</Link></li>
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
                  <form onSubmit={this.onSubmit}>
                    <div className="row">

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Student Name</label>
                          <select className="form-control" value={this.state.studentfullname} onChange={this.onChangeStudentFullName} required>
                            {
                              this.state.snames.map(function (sname) {
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



                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Class</label>
                          <select className="form-control" value={this.state.studentclass} onChange={this.onChangeStudentClass} required>
                            <option value="Class">Please select a class</option>
                            <option value="creche">Creche/Pre-School</option>
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
                          <label className="form-label">Subject</label>
                          <select className="form-control" value={this.state.subject} onChange={this.onChangeSubject} required>
                            <option value="Class">Please select a subject</option>
                            <option value="Diction">Diction</option>
                            <option value="Language Skill">Language Skill</option>
                            <option value="Mathematics Skill">Mathematics Skill</option>
                            <option value="Social Habits">Social Habits</option>
                            <option value="Handwriting">Handwriting</option>
                            <option value="Nature Studies">Nature Studies</option>
                            <option value="Bible Study">Bible Study</option>
                            <option value="Language Arts">Language Arts</option>
                            <option value="Expresses Idea/Story Telling">Expresses Idea/Story Telling</option>
                            <option value="Quantitative Reasoning">Quantitative Reasoning</option>
                            <option value="Verbal Reasoning">Verbal Reasoning</option>
                            <option value="Health Habits">Health Habits</option>
                            <option value="Creative Arts Aptitude">Creative Arts Aptitude</option>
                            <option value="Rhymes">Rhymes</option>
                            <option value="Phonics">Phonics</option>
                            <option value="Reading">Reading</option>
                            <option value="Projects">Projects</option>


                            <option value="Scribling">Scribling</option>
                            <option value="Bible Knowledge">Bible Knowledge</option>
                            <option value="Colouring">Colouring</option>
                            <option value="Civic Education">Civic Education</option>
                            <option value="Igbo">Igbo</option>
                            <option value="Non Verbal Reasoning">Non Verbal Reasoning</option>

                            <option value="English Language">English Language</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Social Studies">Social Studies</option>
                            <option value="Basic Science">Basic Science</option>
                            <option value="CRK">CRK</option>
                            <option value="Home Economics">Home Economics</option>
                            <option value="Agric Science">Agric Science</option>
                            <option value="French">French</option>
                            <option value="Creative Arts">Creative Arts</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="P.H.E">P.H.E</option>
                            <option value="Vocational Aptitude">Vocational Aptitude</option>
                            <option value="History">History</option>


                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Test (40)</label>
                          <input type="number" className="form-control" value={this.state.test} onChange={this.onChangeTest} required />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Exam (60)</label>
                          <input type="number" className="form-control" value={this.state.exam} onChange={this.onChangeExam} required />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Result Date</label><br />
                          <DatePicker
                            selected={this.state.resultdate}
                            onChange={this.onChangeResultDate}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Session</label>
                          <select className="form-control" value={this.state.session} onChange={this.onChangeSession} required>
                            <option value="Select a session">Please select a Session</option>
                            <option value="2020/2021">2020/2021</option>
                            <option value="2021/2022">2021/2022</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Term</label>
                          <select className="form-control" value={this.state.term} onChange={this.onChangeTerm} required>
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
                          <input type="text" className="form-control" value={this.state.responsible} onChange={this.onChangeResponsible} required />
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
}
