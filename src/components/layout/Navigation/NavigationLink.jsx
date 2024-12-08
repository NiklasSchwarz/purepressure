import React from 'react'

const NavigationLink = ({text, active}) => {
  return (
    <li className={`layoutNavigationItem
                    ${text == "Book now" ? 'layoutNavigationBooking' : null} 
                    ${active ? "active" : ""}`}>
        {text}
    </li>
  )
}

export default NavigationLink
