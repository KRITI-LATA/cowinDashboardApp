// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstant.initial, vaccinationData: {}}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProcess})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const fetchData = await response.json()
      const UpdatedData = {
        last7DaysVaccination: fetchData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchData.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),
        vaccinationByGender: fetchData.vaccination_by_gender.map(
          eachGender => ({
            count: eachGender.count,
            gender: eachGender.count,
          }),
        ),
      }
      this.setState({
        vaccinationData: UpdatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderVaccinationStats = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageData={vaccinationData.last7DaysVaccination}
        />

        <VaccinationByGender
          vaccinationGenderDetails={vaccinationData.vaccinationByGender}
        />

        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderViewsBasedOnStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderVaccinationStats()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Dashboard-container">
        <div className="heading-container">
          <div className="dashboard-icons-heading">
            <img
              className="cowin-image"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="cowin-heading">Co-WIN</h1>
          </div>
          <h1 className="cowin-text">CoWIN Vaccination in India</h1>
        </div>
        {this.renderViewsBasedOnStatus()}
      </div>
    )
  }
}

export default CowinDashboard
