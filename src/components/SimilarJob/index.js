import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBagFill} from 'react-icons/bs'
import './index.css'

const SimilarJob = props => {
  const {eachJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJobs
  return (
    <li className="similar-job-list-container">
      <div className="companylogo-and-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-container">
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="job-description">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-title">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-container">
        <GoLocation className="icon-style" />
        <p className="job-description">{location}</p>
        <BsFillBagFill className="icon-style" />
        <p className="job-description">{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJob
