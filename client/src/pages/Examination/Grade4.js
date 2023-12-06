import React, { Component } from 'react'
import axios from 'axios'
import ReactJson from 'react-json-view'
import { Link } from 'react-router-dom'

const Result = props => (
  <tr>
    <td>{props.result.studentfullname}</td>

    <td>{props.result.subject}</td>

    <td>{props.result.test}</td>
    <td>{props.result.exam}</td>
    <td>{props.result.exam + props.result.test}</td>
    <td>{props.result.resultdate.substring(0, 10)}</td>
    <td>{props.result.session}</td>
    <td>{props.result.term}</td>
    <td>{props.result.responsible}</td>

  </tr>
)


export default class Grade4 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      students: []
    };


  }
  componentDidMount() {
    axios.get('/results')
      .then(response => {
        this.setState({ results: response.data })
        // console.log("results:" + JSON.stringify(this.state.results))
      })
      .catch((error) => {
        console.log(error)
      })

    axios.get('/students')
      .then(response => {
        this.setState({ students: response.data })
        // console.log("response.data from student class:" + JSON.stringify(this.state.studentclass));

      })
      .catch((error) => {
        console.log(error)
      })

  }

  // resultList() {
  //   return (this.state.results.map(
  //     currentresult => {
  //       return <Result result={currentresult} deleteResult={this.deleteResult} key={currentresult._id} />
  //     }
  //   ))
  // }

  resultList() {
    return (this.state.results.filter(currentresult => currentresult.studentclass === 'Grade 4' && currentresult).map(
      currentresult => {
        return <Result result={currentresult} deleteResult={this.deleteResult} key={currentresult._id} />
      }
    ))
  }

  render() {
    const print = () => {
      window.print()
    }

    return (
      <div className="content-body">
        <div className="container-fluid">
          {/* <h4>Heading before 4</h4>
     I'm students array: <ReactJson src={this.state.students} />
     I'm results array: <ReactJson src={this.state.results} /> */}


          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Grade 4 Results</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active"><Link to="/all-results">Results</Link></li>
                <li className="breadcrumb-item active"><Link to="/grade-4">Grade 4 Results</Link></li>
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
                            {this.resultList()}
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
       return student.studentclass === 'Grade 4' && student.firstname + ' ' + student.lastname
      }
     )
    } */}

        {/* {
     this.state.results.map(
      result => {
       return result.studentclass === 'Grade 4' && result.studentfullname
      }
     )
    } */}





      </div>
    )
  }
}
