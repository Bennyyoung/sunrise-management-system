import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const Result = props => (
  <tr>
    <td>{props.result.studentfullname}</td>
    <td>{props.result.subject}</td>
    <td>{props.result.test}</td>
    <td>{props.result.exam}</td>
    {/* Cummulative of All total */}
    {/* Average */}
    <td>
      {props.result.exam + props.result.test}
    </td>
    {/* <td>{(props.result.exam + props.result.test) / 3}</td> */}
    <td>{props.result.resultdate.substring(0, 10)}</td>
    <td>{props.result.session}</td>
    <td>{props.result.term}</td>
    <td>{props.result.responsible}</td>

    <td style={{ textAlign: 'center', padding: '0 1rem 0 1rem' }}>
      <Link to={"/edit-result/" + props.result._id} className="btn btn-sm btn-primary"><i className="la la-pencil"> </i> </Link>
      <Link to="#" onClick={() => { props.deleteResult(props.result._id) }} className="btn btn-sm btn-danger"><i className="la la-trash-o"></i></Link>
    </td>
  </tr>
)

export default class AllResult extends Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };



    this.deleteResult = this.deleteResult.bind(this)

  }

  componentDidMount() {
    axios.get('/results')
      .then(response => {
        this.setState({ results: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  deleteResult(id) {
    axios.delete('/results/' + id)
      .then(res => {
        console.log(res.data);
        console.log('Results successfully deleted')
        swal("Nice one", "Results successfully deleted, please refresh the page", "success")
      });

    this.setState({
      result: this.state.results.filter(el => el._id !== id)
    })

    this.props.history.push('/all-results')
  }

  resultList() {
    return (this.state.results.map(
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
      </div>
    )
  }
}
