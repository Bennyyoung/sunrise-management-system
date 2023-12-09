import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { backendUrl } from '../../http/env';

interface IClassResult {
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

interface ResultData {
    _id: string;
    studentclass: string;
    studentfullname: string;
    subject: string;
    test: number;
    exam: number;
    resultdate: string;
    session: string;
    term: string;
    responsible: string;
    // ... other properties
}

interface IFormData {
    results: ResultData[],
    students: any[]
}

const Result: React.FC<IClassResult> = ({ result }) => (
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


const IndividualClassResult = () => {
    const { pathname } = useLocation() // /grade-1-result

    console.log('location from IndividualClassResult', location)

    const firstValue = pathname.split('-')[0] // /grade
    const secondValue = pathname.split('-')[1] // `1`
    const transformedStudentClass = `${firstValue.split('/')[1].charAt(0).toUpperCase()}${firstValue.slice(2)} ${secondValue}` // 'Grade 1'
    const link3Label = `${transformedStudentClass} Result` // 'Grade 1 Result'
    const h4 = `${link3Label} List` // Grade 1 Result List
    const link3Href = `${firstValue}-${secondValue}` // '/grade-1'


    const [formData, setFormData] = useState<IFormData>({
        results: [],
        students: []
    })

    const fetchResults = async () => {
        const response = await axios.get(`${backendUrl}/results`)
        setFormData(prevState => ({
            ...prevState,
            results: response.data,
        }))
    }
    const fetchStudents = async () => {
        const response = await axios.get(`${backendUrl}/students`)
        setFormData(prevState => ({
            ...prevState,
            students: response.data,
        }))
    }

    useEffect(() => {
        fetchResults()
        fetchStudents()
    }, []);

    const resultList = () => {
        return formData.results
            .filter(currentresult => currentresult.studentclass === `${transformedStudentClass}` && currentresult)
            .map(currentresult => (
                <Result result={currentresult} key={currentresult._id} />
            ));
    };

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>{link3Label}</h4>
                        </div>
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active"><Link to="/all-results">Results</Link></li>
                            <li className="breadcrumb-item active"><Link to={`${link3Href}`}>{link3Label}</Link></li>
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
                                        <h4 className="card-title">{h4}</h4>

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
        </div>
    )
}

export default IndividualClassResult