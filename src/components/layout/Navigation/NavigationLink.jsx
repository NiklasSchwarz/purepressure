import React from 'react'

const NavigationLink = ({text, active}) => {
  return (
    <li className={`layoutNavigationItem 
                    ${active ? "layoutNavigationItemActive bg-fg bg-opacity-10 text-xl" : ""}
                    ${(text == 'Übersicht' && active) ? "bg-light bg-opacity-20" : ""} `}>
        {text}
    </li>
  )
}

export default NavigationLink
