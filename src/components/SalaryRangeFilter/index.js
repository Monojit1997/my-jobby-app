const SalaryRangeFilter = props => {
  const {eachItem, changeSalaryRange} = props
  const onChangeSalaryRange = event => {
    changeSalaryRange(event.target.value)
  }
  return (
    <li className="employment-filterlist">
      <input
        type="radio"
        value={eachItem.salaryRangeId}
        name="salary"
        onChange={onChangeSalaryRange}
      />
      <label className="label-style">{eachItem.label}</label>
    </li>
  )
}
export default SalaryRangeFilter
