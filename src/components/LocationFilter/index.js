import './index.css'

const LocationFilter = props => {
  const {eachItem, changeLocationType} = props
  const {locationsId} = eachItem

  const selectLocationType = event => {
    changeLocationType(event.target.value)
  }

  return (
    <li className="employment-filterlist">
      <input
        type="checkBox"
        value={locationsId}
        onChange={selectLocationType}
      />
      <label className="label-style">{eachItem.label}</label>
    </li>
  )
}

export default LocationFilter
