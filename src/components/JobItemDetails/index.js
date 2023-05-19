import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBagFill} from 'react-icons/bs'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    currentJobDetails: {},
    similarJobDetails: [],
  }

  componentDidMount() {
    this.getCurrentJobDetails()
  }

  onClickGetResponse = () => {
    this.getCurrentJobDetails()
  }

  getCurrentJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.similar_jobs.map(eachJobs => ({
        companyLogoUrl: eachJobs.company_logo_url,
        employmentType: eachJobs.employment_type,
        id: eachJobs.id,
        jobDescription: eachJobs.job_description,
        location: eachJobs.location,
        rating: eachJobs.rating,
        title: eachJobs.title,
      }))
      this.setState({
        currentJobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          websiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
          skills: data.job_details.skills.map(eachSkill => ({
            name: eachSkill.name,
            imageUrl: eachSkill.image_url,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
        },
        similarJobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="button"
        onClick={this.onClickGetResponse}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {currentJobDetails} = this.state
    const {
      companyLogoUrl,
      websiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = currentJobDetails
    console.log(skills)
    return (
      <>
        <div className="list-container">
          <div className="companylogo-and-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="location-and-package-container">
            <h1 className="job-title">Description</h1>
            <a href={websiteUrl} target="_blank" rel="noreferrer">
              Visit
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="job-title">Skills</h1>
          <ul className="jobs-list">
            {skills.map(eachItem => (
              <li className="skills-container">
                <img src={eachItem.imageUrl} alt={eachItem.name} />
                <p className="job-description">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-title">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="job-description">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderJobResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSimilarJobs = () => {
    const {similarJobDetails} = this.state
    return (
      <div>
        <h1 className="job-title">Similar Jobs</h1>
        <ul className="jobs-list-similar-container">
          {similarJobDetails.map(eachJobs => (
            <SimilarJob eachJobs={eachJobs} key={eachJobs.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobResults()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
