import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const [students, setStudents] = useState<number>(0);
  const [staff, setStaff] = useState<number>(0);

  useEffect(() => {
    axios.get('/students').then((response) => {
      setStudents(response.data.length);
    });

    axios.get('/staffs').then((response) => {
      setStaff(response.data.length);
    });

    console.log(`BACKEND_URL: ${process.env.REACT_APP_BACK_END}`);
  }, []);

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
                        {students}
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
                        {staff}
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

export default Home