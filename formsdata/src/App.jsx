import './App.css'
import EmployeeData from './components/EmployeeData'
import GetEmployeeDetails from './components/GetEmployeeDetails'
import GetTeamDetails from './components/GetTeamDetails'
import TeamData from './components/TeamData'

function App() {

  return (
    <div className='app-container'>
      <h1 className='heading'> React Forms Project </h1>
        <EmployeeData />
        <TeamData />
        <GetEmployeeDetails />
        <GetTeamDetails />
    </div>
  )
}

export default App
