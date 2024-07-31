import React from 'react'
import PrefixPath from '../../config/AppConfig';


const getLogo = () => {
  return 'https://workcentral.hestiasoftware.com/img/logo.svg'
}
export const Logo = (props) => {
  return (
    <div>
      <img src={getLogo(props)} alt={`${PrefixPath.APP_NAME} logo`} className="logo-design"/>
    </div>
  )
}



export default Logo;
