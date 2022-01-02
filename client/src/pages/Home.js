import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      staff: []
    }
  }


  componentDidMount() {
    axios.get('/students')
      .then(response => {
        this.setState({
          students: response.data.length,
        })
      })


    axios.get('/staffs')
      .then(response => {
        this.setState({
          staff: response.data.length
        })
        console.log('Data response: ' + this.state.staff);
      })

    console.log(`BACKEND_URL: ${process.env.REACT_APP_BACK_END}`);

  }

  render() {

    return (
      <div className="content-body">
        {/* <!-- row --> */}
        <div className="container-fluid">

          <div className="row">

            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <Link to="/all-students">
                <div className="widget-stat card bg-primary">
                  <div className="card-body">
                    <div className="media">
                      <span className="mr-3">
                        <i className="la la-users"></i>
                      </span>

                      <div className="media-body text-white">
                        <p className="mb-1">Total Students</p>
                        <h3 className="text-white">
                          {this.state.students}
                        </h3>
                        <div className="progress mb-2 bg-white">
                          <div className="progress-bar progress-animated bg-light" style={{ width: '80%' }}></div>
                        </div>
                        <small>5 intakes in 20 Days(From Jan)</small>
                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            </div>



            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <Link to="/all-staffs">
                <div className="widget-stat card bg-warning">
                  <div className="card-body">
                    <div className="media">
                      <span className="mr-3">
                        <i className="la la-user"></i>
                      </span>
                      <div className="media-body text-white">
                        <p className="mb-1">Total Staff</p>
                        <h3 className="text-white">
                          {this.state.staff}
                        </h3>
                        <div className="progress mb-2 bg-white">
                          <div className="progress-bar progress-animated bg-light" style={{ width: '80%' }}></div>
                        </div>
                        {/* <small>5 intakes in 20 Days(From Jan)</small> */}
                      </div>
                    </div>
                  </div>
                </div>

              </Link>
            </div>

            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card bg-warning">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-user"></i>
                    </span>
                    <div className="media-body text-white">
                      <p className="mb-1">New Students</p>
                      <h3 className="text-white">12</h3>
                      <div className="progress mb-2 bg-white">
                        <div className="progress-bar progress-animated bg-light" style={{ width: '50%' }}></div>
                      </div>
                      {/* <small>50% Increase in 25 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card bg-secondary">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-graduation-cap"></i>
                    </span>
                    <div className="media-body text-white">
                      <p className="mb-1">Total Subject</p>
                      <h3 className="text-white">19</h3>
                      <div className="progress mb-2 bg-white">
                        <div className="progress-bar progress-animated bg-light" style={{ width: '76%' }}></div>
                      </div>
                      {/* <small>76% Increase in 20 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card bg-danger">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-ngn"></i>
                    </span>
                    <div className="media-body text-white">
                      <p className="mb-1">Fees Collection</p>
                      <h3 className="text-white">1,625,000 NGN</h3>
                      <div className="progress mb-2 bg-white">
                        <div className="progress-bar progress-animated bg-light" style={{ width: '30%' }}></div>
                      </div>
                      <small>1st Term 2019/2020</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div >
    )
  }
}
