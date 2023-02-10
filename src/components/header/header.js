import { Search } from '../../features/search/search'
import icon from '../../images/icon.jpg'

export const Header = () => {

  return (
    <div className = 'header'>
      <div className = 'title'>
      <img src= {icon} alt= "logo" className = 'headerIcon' />
        <h3>MiniReddit</h3>
      </div>
      <div className = 'searchBar'>
        <Search />
      </div>
      <div className='spacer'></div>
    </div>
  )
}