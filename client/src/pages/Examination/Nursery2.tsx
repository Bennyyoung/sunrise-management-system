import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactJson from 'react-json-view'
import { Link } from 'react-router-dom'


interface ResultProps {
  result: {
    studentfullname: string;
    subject: string;
    test: number;
    exam: number;
    resultdate: string;
    session: string;
    term: string;
    responsible: string;
    _id: string;
  };
}

const Result: React.FC<ResultProps> = ({ result }) => (
  <tr>
    <td>{result.studentfullname}</td>
    <td>{result.subject}</td>
    <td>{result.test}</td>
    <td>{result.exam}</td>
    <td>{result.exam + result.test}</td>
    <td>{result.resultdate.substring(0, 10)}</td>
    <td>{result.session}</td>
    <td>{result.term}</td>
    <td>{result.responsible}</td>
  </tr>
);

const Grade4: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/results')
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const resultList = () => {
    return results
      .filter(currentresult => currentresult.studentclass === 'Nursery 2' && currentresult)
      .map(currentresult => (
        <Result result={currentresult} key={currentresult._id} />
      ));
  };

  const print = () => {
    window.print();
  };

    return (
      <div className="content-body">
        <div className="container-fluid">
          {/* <h4>Heading before 2</h4>
     I'm students array: <ReactJson src={this.state.students} />
     I'm results array: <ReactJson src={this.state.results} /> */}


          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Nursery 2 Results</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active"><Link to="/all-results">Results</Link></li>
                <li className="breadcrumb-item active"><Link to="/nursery-2">Nursery 2 Results</Link></li>
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

                      <div>
                        <button onClick={print} className=' btn btn-primary'>
                          Print All
                        </button>
                      </div>
                      <Link to="/add-new-result" className="btn btn-primary">+ Add new</Link>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                      <table id="example3" className="table table-striped table-bordered" style={{ minWidth: "845px" }}>
                          <thead>
                            <tr>
                              <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Student Name</th>

                              <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Subject</th>
                              <th scope="col" style={{ textAlign: 'center', transform: 'rotate(-90deg)', padding: '1.5rem 0' }}>Test</th>

                              <th scope="col" style={{ textAlign: 'center', transform: 'rotate(-90deg)' }}>Exam</th>
                              <th scope="col" style={{ textAlign: 'center', transform: 'rotate(-90deg)' }}>Total</th>
                              {/* <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Average</th> */}
                              <th scope="col" style={{ textAlign: 'center', padding: '0 0.5rem 0 0.5rem' }}>Result Date</th>
                              <th scope="col" style={{ textAlign: 'center', padding: '0 0.8rem 0 0.8rem' }}>Session</th>
                              <th scope="col" style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Term</th>
                              <th scope="col" style={{ textAlign: 'center', padding: '0 1rem 0 1rem' }}>Responsible</th>
                              <th scope="col" style={{ textAlign: 'center', padding: '0 1rem 0 1rem' }}>Action</th>
                            </tr>
                          </thead>
                          <tbody style={{ textAlign: 'center', paddingLeft: '2rem' }}>
                            {resultList()}
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
        {/* {
     this.state.students.map(
      student => {
       return student.studentclass === 'Nursery 2' && student.firstname + ' ' + student.lastname
      }
     )
    } */}

        {/* {
     this.state.results.map(
      result => {
       return result.studentclass === 'Nursery 2' && result.studentfullname
      }
     )
    } */}





      </div>
    )
  }

  export default Grade4