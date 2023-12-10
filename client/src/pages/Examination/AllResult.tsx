import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { backendUrl } from '../../Http/env';
import { print } from '../../Utils/utils';

interface ResultProps {
  result: {
    _id: string;
    studentfullname: string;
    subject: string;
    test: number;
    exam: number;
    resultdate: string;
    session: string;
    term: string;
    responsible: string;
  };
  deleteResult: (id: string) => void;
}

const Result: React.FC<ResultProps> = ({ result, deleteResult }) => (
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
    <td style={{ textAlign: 'center', padding: '0 1rem' }}>
      <Link to={`/edit-result/${result._id}`} className="btn btn-sm btn-primary">
        <i className="la la-pencil"> </i>
      </Link>
      <Link
        to="#"
        onClick={() => {
          deleteResult(result._id);
        }}
        className="btn btn-sm btn-danger"
      >
        <i className="la la-trash-o"></i>
      </Link>
    </td>
  </tr>
);

const AllResult: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchResults = async () => {

    try {
      const response = await axios.get(`${backendUrl}/results`)
      setResults(response.data);
    } catch (error) {
      console.error(error)
    }

  };

  useEffect(() => {
    fetchResults();
  }, []);

  const deleteResult = async (id: string) => {
    await axios.delete(`/results/${id}`)
    console.log('Results successfully deleted');
    swal('Nice one', 'Results successfully deleted, please refresh the page', 'success');

    setResults(results.filter((el) => el._id !== id));

    navigate('/all-results');
  };

  const resultList = () => {
    return results.map((currentresult: any) => {
      return <Result result={currentresult} deleteResult={deleteResult} key={currentresult._id} />;
    });
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
                    <h4 className="card-title">All Students Results  </h4>

                    <div>
                      <button onClick={() => print()} className=' btn btn-primary'>
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
                            <th scope="col" style={{ textAlign: 'center', transform: 'rotate(-90deg)', padding: '1.5rem 0' }}>Test (40)</th>

                            <th scope="col" style={{ textAlign: 'center', transform: 'rotate(-90deg)' }}>Exam (60)</th>
                            <th scope="col" style={{ textAlign: 'center', transform: 'rotate(-90deg)' }}>Total (100%)</th>
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
    </div>
  )
}

export default AllResult
