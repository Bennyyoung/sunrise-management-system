import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const ViewByClass = () => {
    return (
      <div className="content-body">
        <div className="container-fluid">

          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Class Results</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active"><Link to="/view-by-class">Class Results</Link></li>
                <li className="breadcrumb-item active"><Link to="/add-new-result">Add New Result</Link></li>
              </ol>
            </div>
          </div>

          <div className="center">

            <ul className="list-group center">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/grade-5" className="btn btn-primary">Grade 5 Results</Link>

                <span className="badge badge-primary badge-pill">14</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/grade-4" className="btn btn-primary">Grade 4 Results</Link>

                <span className="badge badge-primary badge-pill">2</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/grade-3" className="btn btn-primary">Grade 3 Results</Link>

                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/grade-2" className="btn btn-primary">Grade 2 Results</Link>

                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/grade-3" className="btn btn-primary">Grade 3 Results</Link>

                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/grade-2" className="btn btn-primary">Grade 2 Results</Link>

                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/grade-2" className="btn btn-primary">Grade 2 Results</Link>

                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/grade-1" className="btn btn-primary">Grade 1 Results</Link>

                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/nursery-3" className="btn btn-primary">Nursery 3 Results</Link>


                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/nursery-2" className="btn btn-primary">Nursery 2 Results</Link>


                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/nursery-1" className="btn btn-primary">Nursery 1 Results</Link>


                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/creche" className="btn btn-primary">Creche Results</Link>



                <span className="badge badge-primary badge-pill">1</span>
              </li>

            </ul>

          </div>

        </div>
      </div>
    )
  }

export default ViewByClass