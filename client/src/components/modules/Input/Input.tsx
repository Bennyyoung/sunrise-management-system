import { IInput } from "../../Interface/IInput"


const Input = ({ label, type, placeholder, className, onChange, name, value, required }: IInput) => {
     return (
          <>
               <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                         <label className="form-label">{label}</label>
                         <input
                              type={type}
                              placeholder={placeholder}
                              className={className}
                              onChange={onChange}
                              name={name}
                              value={value}
                              required={required}
                         />
                    </div>
               </div>
          </>
     )
}

export default Input