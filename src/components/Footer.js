import React from 'react'
import {Link} from 'react-router-dom'
const footer_menu = [{
  name: 'About',
  link: '/about'
},
  {
    name: 'Contact',
    link: '/contact',
  },
]

const Footer = ({footer}) => {
  let items = footer_menu.map((item, i) => (
      <div className="flex-item" key={'f_' + i}>
        <button className="btn btn-default">
          <Link style={{display:'block'}} to={item.link}>
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            {  `${item.name}`}
          </Link>
        </button>
      </div>
    )
  )
  return (
    <footer>
      <div className="flex-container">
        {items}
      </div>
      <p {...footer}>&copy; 2017 - William Jiang</p>
    </footer>
  )
}
export default Footer;