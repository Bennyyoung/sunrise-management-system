import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import swal from 'sweetalert'

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
  const [studentfullname, setStudentFullName] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [studentclass, setStudentClass] = useState<string>('');
  const [test, setTest] = useState<string>('');
  const [exam, setExam] = useState<string>('');
  const [resultdate, setResultDate] = useState<Date>(new Date());
  const [session, setSession] = useState<string>('');
  const [term, setTerm] = useState<string>('');
  const [responsible, setResponsible] = useState<string>('');
  const [snames, setSnames] = useState<string[]>([]);

  useEffect(() => {
    axios.get('/students')
      .then(response => {
        if (response.data.length > 0) {
          setSnames(response.data.map((sname: any) => `${sname.firstname} ${sname.lastname}`));
          setStudentFullName(`${response.data[0].firstname} ${response.data[0].lastname}`);
        }
      });
  }, []);


  const onChangeStudentFullName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudentFullName(e.target.value);
  };

  const onChangeStudentClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudentClass(e.target.value);
  };

  const onChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const onChangeTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTest(e.target.value);
  };

  const onChangeExam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExam(e.target.value);
  };

  const onChangeResultDate = (resultdate: Date) => {
    setResultDate(resultdate);
  };

  const onChangeSession = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSession(e.target.value);
  };

  const onChangeTerm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTerm(e.target.value);
  };

  const onChangeResponsible = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponsible(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result: Result = {
      studentfullname,
      studentclass,
      subject,
      test,
      exam,
      resultdate,
      session,
      term,
      responsible,
    };

    axios.post('/results/add', result)
      .then(res => {
        console.log(res.data);
        swal("Good job", "Student Result Successfully Uploaded", "success");
      })
      .catch(function (error) {
        console.log(error);
        swal("Couldn't upload student result", "Please input or check all fields properly", "error");
      });

    setStudentFullName('');
    setStudentClass('');
    setSubject('');
    setTest('');
    setExam('');
    setResultDate(new Date());
    setSession('');
    setTerm('');
    setResponsible('');
  };

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
                <form onSubmit={onSubmit}>
                  <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Student Name</label>
                        <select className="form-control" value={studentfullname} onChange={onChangeStudentFullName} required>
                          {
                            snames.map(function (sname) {
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
                        <select className="form-control" value={studentclass} onChange={onChangeStudentClass} required>
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
                        <select className="form-control" value={subject} onChange={onChangeSubject} required>
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

                          <option value="English Language">English Language</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Social Studies">Social Studies</option>
                          <option value="Basic Science & Technology">Basic Science & Technology</option>
                          <option value="CRK">CRK</option>
                          <option value="Home Economics">Home Economics</option>
                          <option value="Agricultural Science">Agricultural Science</option>
                          <option value="Handwriting">Handwriting</option>
                          <option value="Foreign Languages (French)">Foreign Languages (French)</option>
                          <option value="Creative Arts">Creative Arts</option>
                          <option value="Computer/Info Tech">Computer/Info Tech</option>
                          <option value="Physical & Health Science">Physical & Health Science</option>
                          <option value="Vocational Aptitude">Vocational Aptitude</option>
                          <option value="History">History</option>
                          <option value="Civic Education/National Values">Civic Education/National Values</option>
                          <option value="National Language (Igbo)">National Language (Igbo)</option>
                          <option value="Non Verbal Reasoning">Non Verbal Reasoning</option>



                          <option value="Scribling">Scribling</option>
                          <option value="Bible Knowledge">Bible Knowledge</option>
                          <option value="Colouring">Colouring</option>




                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Test (40)</label>
                        <input type="number" className="form-control" value={test} onChange={onChangeTest} required />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Exam (60)</label>
                        <input type="number" className="form-control" value={exam} onChange={onChangeExam} required />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Result Date</label><br />
                        <DatePicker
                          selected={resultdate}
                          onChange={onChangeResultDate}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Session</label>
                        <select className="form-control" value={session} onChange={onChangeSession} required>
                          <option value="Select a session">Please select a Session</option>
                          <option value="2020/2021">2020/2021</option>
                          <option value="2021/2022">2021/2022</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Term</label>
                        <select className="form-control" value={term} onChange={onChangeTerm} required>
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
                        <input type="text" className="form-control" value={responsible} onChange={onChangeResponsible} required />
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