import './index.css'

const RepositoryItem = props => {
  const {course} = props

  const {name, issuesCount, forksCount, starsCount, avatarUrl} = course

  return (
    <li className="list-item1">
      <img src={avatarUrl} alt={name} className="image-course" />
      <h1 className="head">{name}</h1>
      <div className="star">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-image"
        />
        <p className="star-paragraph">{starsCount} stars</p>
      </div>

      <div className="star">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-image"
        />
        <p className="star-paragraph">{forksCount} forks</p>
      </div>

      <div className="star">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-image"
        />
        <p className="star-paragraph">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
