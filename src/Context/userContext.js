import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const userContext = React.createContext()

export const ContextUserContextProvider = ({ children }) => {
  const [user, setUser] = useState(1)
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </userContext.Provider>
  )
}

ContextUserContextProvider.propTypes = {
  children: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.any])
  ).isRequired,
}