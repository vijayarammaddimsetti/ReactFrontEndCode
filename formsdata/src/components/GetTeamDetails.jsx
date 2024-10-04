import React from 'react'
import './GetTeamDetails.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const GetTeamDetails = () => {

  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [outputData, setOutputData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [employeeData, setEmployeeData] = useState([]);

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      console.log(data.Id);
      const parsedId = parseInt(data.Id);
      const URL = `http://localhost:8080/team/${parsedId}`;
    
      const response = await axios.get( 
        URL
      ); 
      setOutputData(response.data);
      setEmployeeData(response.data.employee);
      console.log(employeeData);
      setFlag(true);
      setError(false);
    }
    catch (error){
      setErrorMessage(error.response?.data?.message || "An unknown error occurred");
      setError(true);
      setFlag(false);
    }
  }


  return (
    <div className='container'>
        <form className='team-data' onSubmit={handleSubmit(submitHandler)}>
            <fieldset className='field-data'>
                <legend className='legend'>Get Team Details By ID</legend>
                <div>
                    <div className='details'>
                        <label> Enter Your Team ID here : </label>
                        <input type='text' className='inputlength' id="Id" {...register("Id", { required: true })}/>
                    </div>
                    <br/>
                    {errors.Id && <p id='errors'><sup>*</sup>Team Id is mandatory</p>}
                </div>
                <div className='submit-button'>
                    <input type='submit' />
                </div>
                
                {error && <p className='outputcontainer' id='errors' >{errorMessage}</p>}
                {flag && 

                  <div className='outputcontainer1' >
                      <div id='data-output'>
                        <h4>Given Team Id : </h4>
                        <p>{outputData.teamId}</p>
                      </div>
                      <div id='data-output'>
                        <h4>Team Name : </h4>
                        <p>{outputData.teamName}</p>
                      </div>
                      <div id='data-output'>
                        <h4>Team Description : </h4>
                        <p>{outputData.teamDescription}</p>
                      </div>

                      <br/>
                      <br/>

                      <h4>Employees:</h4>

                      <div id='employee-data'>
                        {employeeData.map((employee) => (
                          <div key={employee.employeeId} className="employee-card">
                            <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                            <p><strong>Name:</strong> {employee.employeeName}</p>
                            <p><strong>Email:</strong> {employee.employeeEmailId}</p>
                            <p><strong>Job Title:</strong> {employee.employeeJobTitle}</p>
                          </div>
                        ))}
                      </div>

                  </div>

                }

            </fieldset>
        </form>
    </div>
  )
}

export default GetTeamDetails
