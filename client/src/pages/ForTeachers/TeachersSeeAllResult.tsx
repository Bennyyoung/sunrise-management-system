import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

interface ResultProps {
  _id: string;
  studentname: string;
  subject: string;
  classtest: string;
  midtermtest: string;
  midtermtotal: string;
  exam: string;
  examtotal: string;
  average: string;
  position: string;
  resultdate: string;
  responsible: string;
}

const Result: React.FC<{ result: ResultProps }> = ({ result }) => (
  <tr>
    <td>{result.studentname}</td>
    <td>{result.subject}</td>
    <td>{result.classtest}</td>
    <td>{result.midtermtest}</td>
    <td>{result.midtermtotal}</td>
    <td>{result.exam}</td>
    <td>{result.examtotal}</td>
    <td>{result.average}</td>
    <td>{result.position}</td>
    <td>{result.resultdate.substring(0, 10)}</td>
    <td>{result.responsible}</td>
    <td style={{ textAlign: 'center', padding: '0 1rem 0 1rem' }}>
      <Link to={`/edit-result/${result._id}`} className="btn btn-sm btn-primary">
        <i className="la la-pencil"> </i>
      </Link>
    </td>
  </tr>
);

const TeachersSeeAllResult: React.FC = () => {
  const [results, setResults] = useState<ResultProps[]>([]);

  useEffect(() => {
    axios.get<ResultProps[]>(`${process.env.BACK_END}/results/`)
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const resultList = () => {
    return results.map(currentResult => <Result result={currentResult} key={currentResult._id} />);
  };

  return (
    <div className="content-body">
     <div className="container-fluid">
 
      <div className="row page-titles mx-0">
       <div className="col-sm-6 p-md-0">
        <div className="welcome-text">
         <h4>All Result</h4>
        </div>
       </div>
       <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol className="breadcrumb">
         <li className="breadcrumb-item"><Link to="/">Home</Link></li>
         <li className="breadcrumb-item active"><Link to="/all-results">Results</Link></li>
         <li className="breadcrumb-item active"><Link to="/all-results">All Results</Link></li>
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
            <a href="/add-new-result" className="btn btn-primary">+ Add new</a>
           </div>
           <div className="card-body">
            <div className="table-responsive">
             <table id="example3" className="display" style={{ minWidth: "845px" }}>
              <thead>
               <tr>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Student Name</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Subject</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Class Test</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Mid Term Test</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Mid Term Total</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Exam</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>All Total</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Average</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Position</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Result Date</th>
                <th style={{ textAlign: 'center', padding: '0 2rem 0 2rem' }}>Responsible</th>
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
    </div>
   )
}

export default TeachersSeeAllResult