import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'
import Header from '../Header'
import EmploymentFilter from '../EmploymentFilter'
import SalaryRangeFilter from '../SalaryRangeFilter'
import JobCard from '../JobCard'
import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobList: [],
    searchInput: '',
    employmentType: '',
    minimumpackage: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onClickResponse = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentType, minimumpackage} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumpackage}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJobs => ({
        id: eachJobs.id,
        title: eachJobs.title,
        companyLogoUrl: eachJobs.company_logo_url,
        employmentType: eachJobs.employment_type,
        jobDescription: eachJobs.job_description,
        location: eachJobs.location,
        packagePerAnnum: eachJobs.package_per_annum,
        rating: eachJobs.rating,
      }))
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
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
      <button type="button" className="button" onClick={this.onClickResponse}>
        Retry
      </button>
    </div>
  )

  renderJobsListView = () => {
    const {jobList} = this.state
    const shouldShowJobssList = jobList.length > 0

    return shouldShowJobssList ? (
      <div className="all-products-container">
        <ul className="jobs-list">
          {jobList.map(eachJobs => (
            <JobCard eachJobs={eachJobs} key={eachJobs.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any Jobs. Try other filters.
        </p>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSalaryRange = () => (
    <div>
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="list-of-emploment">
        {salaryRangesList.map(eachItem => (
          <SalaryRangeFilter
            eachItem={eachItem}
            key={eachItem.salaryRangeId}
            changeSalaryRange={this.changeSalaryRange}
          />
        ))}
      </ul>
    </div>
  )

  renderEmployment = () => (
    <div>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="list-of-emploment">
        {employmentTypesList.map(eachItem => (
          <EmploymentFilter
            eachItem={eachItem}
            key={eachItem.employmentTypeId}
            changeEmploymentType={this.changeEmploymentType}
          />
        ))}
      </ul>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onSearchJobs = () => {
    this.getJobDetails()
  }

  changeEmploymentType = employment => {
    this.setState({employmentType: employment}, this.getJobDetails)
  }

  changeSalaryRange = salaryRange => {
    console.log(salaryRange)
    this.setState({minimumpackage: salaryRange}, this.getJobDetails)
  }

  render() {
    const {searchInput, employmentType} = this.state
    console.log(employmentType)
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="profile-and-filter-container">
            <Profile />
            <hr className="horizontal-line" />
            {this.renderEmployment()}
            <hr className="horizontal-line" />
            {this.renderSalaryRange()}
          </div>
          <div className="search-job-container">
            <div className="input-card">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSearchJobs}
                data-testid="searchButton"
              >
                <BsSearch className="search-Icons" />
              </button>
            </div>
            <div className="job-results-container">{this.renderAllJobs()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
