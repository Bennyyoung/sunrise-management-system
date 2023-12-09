import { Link } from "react-router-dom"
import IPageHeaders from "../../Interface/IPageHeaders"

const PageHeaders = (
    {
        heading,
        
        link1Href,
        link1Label,

        link2Href,
        link2Label,

        link3Href,
        link3Label,
    }: IPageHeaders) => {

    return (
        <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                    <h4>{heading}</h4>
                </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={link1Href}>{link1Label}</Link></li>
                    <li className="breadcrumb-item active"><Link to={link2Href}>{link2Label}</Link></li>
                    <li className="breadcrumb-item active"><Link to={link3Href}>{link3Label}</Link></li>
                </ol>
            </div>
        </div>
    )
}

export default PageHeaders