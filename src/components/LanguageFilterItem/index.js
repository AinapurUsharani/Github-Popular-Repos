import './index.css'

const LanguageFilterItem = props => {
  const {Details, changeTabList, isActive} = props
  const {language, id} = Details

  const changeAllList = () => {
    changeTabList(language, id)
  }

  const style = isActive ? 'special-button' : 'button'

  return (
    <>
      <button type="button" onClick={changeAllList} className={style}>
        <li className="list-item">{language}</li>
      </button>
    </>
  )
}

export default LanguageFilterItem
