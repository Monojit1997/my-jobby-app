import './index.css'

const EmploymentFilter = props => {
  const {eachItem, changeEmploymentType} = props
  const {employmentTypeId} = eachItem

  const selectEmploymentType = event => {
    changeEmploymentType(event.target.value)
  }
  return (
    <li className="employment-filterlist">
      <input
        type="checkBox"
        value={employmentTypeId}
        onChange={selectEmploymentType}
      />
      <label className="label-style">{eachItem.label}</label>
    </li>
  )
}
export default EmploymentFilter
