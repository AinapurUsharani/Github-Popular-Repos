import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusContents = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    RepositoryList: [],
    apiStatus: apiStatusContents.initial,
    languageItem: languageFiltersData[0].id,
    currentLanguage: languageFiltersData[0].language,
  }

  componentDidMount() {
    this.renderRepository()
  }

  changeTabList = (language, id) => {
    this.setState(
      {languageItem: id, currentLanguage: language},
      this.renderRepository,
    )
  }

  renderRepository = async () => {
    this.setState({apiStatus: apiStatusContents.inProgress})

    const {languageItem} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${languageItem}`

    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        RepositoryList: updatedData,
        apiStatus: apiStatusContents.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusContents.failure})
    }
  }

  renderList = () => {
    const {RepositoryList} = this.state

    return (
      <ul className="courses-list-container">
        {RepositoryList.map(eachCourse => (
          <RepositoryItem course={eachCourse} key={eachCourse.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-paragraph">Something Went Wrong</p>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderCurrentPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContents.success:
        return this.renderList()
      case apiStatusContents.failure:
        return this.renderFailure()
      case apiStatusContents.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {currentLanguage} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="tab-items-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              Details={each}
              changeTabList={this.changeTabList}
              key={each.id}
              isActive={currentLanguage === each.language}
            />
          ))}
        </ul>

        <ul>
          <div>{this.renderCurrentPage()}</div>
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
