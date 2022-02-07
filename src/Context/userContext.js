import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { getSave } from '../Services/Save';

export const usersContext = React.createContext()

export const ContextUserContextProvider = ({ children }) => {
  const [users, setUsers] = useState(getSave())

  return (
    <usersContext.Provider
      value={{
        users,
        setUsers,
      }}>
      {children}
    </usersContext.Provider>
  )
}

ContextUserContextProvider.propTypes = {
  children: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.any])
  ).isRequired,
}