import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profile: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        profile: {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        },
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onButtonClick = () => {
    this.getProfileDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {profile} = this.state
    return (
      <div className="profile-container">
        <img src={profile.profileImageUrl} alt="profile" />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-description">{profile.shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <button className="button" type="button" onClick={this.onButtonClick}>
      Retry
    </button>
  )

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfile()}</div>
  }
}

export default Profile
