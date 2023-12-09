import { ISelect } from "../../Interface/ISelect"

const Select = ({ name, label, value, className, onChange, required, options }: ISelect) => {
  return (
    <>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <label className="form-label">{label}</label>
          <select name={name} className={className} value={value} onChange={onChange} required={required}>
            {options.map((el, index) => {
              const { value, data } = el
              return (
                <option key={index} value={value}>{data}</option>
              )
            })}
          </select>
        </div>
      </div>
    </>
  )
}



export default Select