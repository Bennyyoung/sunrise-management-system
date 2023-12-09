import { ReactNode } from "react"

interface AuthHeadersProps {
    children: ReactNode;
}

const AuthHeaders = ({ children }: AuthHeadersProps) => {

    return (
        <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthHeaders