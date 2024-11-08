import React from 'react'

const NavigationLink = ({text, active}) => {
  return (
    <li className={`layoutNavigationItem 
                    ${active ? "layoutNavigationItemActive bg-light bg-opacity-40 text-xl rounded-full shadow-lg" : ""}`}>
        {text}
    </li>
  )
}

export default NavigationLink
