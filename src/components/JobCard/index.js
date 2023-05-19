import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBagFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {eachJobs} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = eachJobs
  return (
    <Link to={`/jobs/${id}`} className="link-job-details">
      <li className="list-container">
        <div className="companylogo-and-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <div className="location-and-package-container">
          <div className="location-container">
            <GoLocation className="icon-style" />
            <p className="job-description">{location}</p>
            <BsFillBagFill className="icon-style" />
            <p className="job-description">{employmentType}</p>
          </div>
          <p className="job-description">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1 className="job-title">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
