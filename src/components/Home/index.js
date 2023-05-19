import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="bg-container">
      <div className="card-container">
        <h1 className="home-main-heading">Find The Job That Fits Your Life</h1>
        <p className="home-main-description">
          Millions of people are searching for jobs,salary <br />
          information,company reviews.Find the job that fits your <br />
          abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
