import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ViewByClass extends Component {
  render() {
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

          <div className="row">
            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Grade 5</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/grade-5" className="btn btn-primary">Grade 5 Results</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Grade 4</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/grade-4" className="btn btn-primary">Grade 4 Results</Link>

                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Grade 3</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/grade-3" className="btn btn-primary">Grade 3 Results</Link>

                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Grade 2</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/grade-2" className="btn btn-primary">Grade 2 Results</Link>

                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Grade 1</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/grade-1" className="btn btn-primary">Grade 1 Results</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Nursery 3</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/nursery-3" className="btn btn-primary">Nursery 3 Results</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Nursery 2</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/nursery-2" className="btn btn-primary">Nursery 2 Results</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Nursery 1</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/nursery-1" className="btn btn-primary">Nursery 1 Results</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Creche</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/creche" className="btn btn-primary">Creche Results</Link>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}
