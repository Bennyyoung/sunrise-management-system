import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { backendUrl } from '../../http/env'
import primarySchoolSubjectsArray from '../../data/primarySchoolSubject'

const UploadAssignment = () => {

  const [formData, setFormData] = useState({
    teachersname: '',
    subject: '',
    uploadedFile: undefined,
    staffs: []
  })

  const getStaffs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/staffs`)
      const staffsArray = response.data.map((staff: { firstname: string; lastname: string }) => `${staff.firstname} ${staff.lastname}`)

      if (response && response.data.length > 0) {
        setFormData(prevState => ({
          ...prevState,
          staffs: staffsArray,
          teachersname: `${response.data[0].firstname} ${response.data[0].lastname}`
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStaffs()
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    if (e.target.name === "uploadedFile" && e.target.type === "file") {
      const fileInput = e.target as HTMLInputElement
      const files = fileInput.files

      if (files && files.length > 0) {
        setFormData(prevState => ({
          ...prevState,
          [name]: files[0]
        }))
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('/upload', formData)
      swal("Good job", "Assignment Successfully Submitted", "success");
      
    } catch (error) {

      console.error(error);
      swal("Couldn't submit assignment", "Please input or check all fields properly", "error");
    }

    setFormData({
      teachersname: '',
      subject: '',
      uploadedFile: undefined,
      staffs: []
    })
  };


  return (
    <div className="content-body">
      <div className="container-fluid">

        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Assignment</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active"><Link to="/all-students">Students</Link></li>
              <li className="breadcrumb-item active"><Link to="/upload-assignment">Upload Assignment</Link></li>
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
                    <h4 className="card-title">Upload Assignments</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <form
                        encType="multipart/form-data"
                        onSubmit={(e) => onSubmit(e)}
                        id="form"
                      >
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Submit To</span>
                            </div>
                            <select className="form-control" value={formData.teachersname} onChange={(e) => handleChange(e)} required>
                              <option value="Class">Please select the teachers name</option>
                              {
                                formData.staffs.map(function (staff) {
                                  return <option
                                    key={staff}
                                    value={staff}
                                  >
                                    {staff}
                                  </option>
                                })
                              }
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Subject</span>
                            </div>
                            <select className="form-control" value={formData.subject} onChange={(e) => handleChange(e)} required>
                              {
                                primarySchoolSubjectsArray.map(el => {
                                  const { value, data } = el
                                  return (
                                    <option value={value}>{data}</option>
                                  )
                                })
                              }
                            </select>

                          </div>
                        </div>
                        <span className="input-group-text">Upload Assignment &nbsp;

                          <input
                            type="file"
                            name="uploadedFile"
                            className="form-control-file"
                            required
                            value={formData.uploadedFile}
                            onChange={(e) => handleChange(e)}
                          />

                        </span>
                        <div className="form-group">
                          <div className="summernote"></div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-lg-6">
                            <div className="fallback w-100">
                              {/* <Dropzone>
 
                  <p>Drag and drop a file OR click here to select a file</p>
                 </Dropzone> */}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <button type="submit" className="btn btn-primary float-right">
                              Send <i className="fa fa-paper-plane-o"></i>
                            </button>
                          </div>
                        </div>
                      </form>
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

export default UploadAssignment