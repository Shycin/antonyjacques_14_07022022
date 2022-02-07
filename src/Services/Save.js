export const Save = (employee) =>
    new Promise((resolve) => {
        let employees = localStorage.getItem('employees')
        employees = employees ? JSON.parse(employees) : []
        localStorage.setItem('employees', JSON.stringify([...employees, employee]))
        resolve(employee)
})

export const getSave = () => {
    const employees = localStorage.getItem('employees')
    if(employees)
      return JSON.parse(employees)

    return []
}