import React from 'react'
import './GetEmployeeDetails.css'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const GetEmployeeDetails = () => {

  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [outputData, setOutputData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      console.log(data.Id);
      const parsedId = parseInt(data.Id);
      const URL = `http://localhost:8080/employee/${parsedId}`;
    
      const response = await axios.get( 
        URL
      ); 
      setOutputData(response.data);
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
                <legend className='legend'>Get Employee Details By ID</legend>
                <div>
                    <div className='details'>
                        <label> Enter Your Employee ID here : </label>
                        <input type='text' className='inputlength' id="Id" {...register("Id", { required: true })}/>
                    </div>
                    <br/>
                    {errors.Id && <p id='errors'><sup>*</sup>Employee Id is mandatory</p>}
                </div>
                <div className='submit-button'>
                    <input type='submit' />
                </div>
                
                {error && <p className='outputcontainer' id='errors' >{errorMessage}</p>}
                {flag && 

                  <div className='outputcontainer1' >
                      <div id='data-output'>
                        <h4>Employee Id : </h4>
                        <p>{outputData.employeeDTOId}</p>
                      </div>
                      <div id='data-output'>
                        <h4>Employee Name : </h4>
                        <p>{outputData.employeeDTOName}</p>
                      </div>
                      <div id='data-output'>
                        <h4>Employee Email ID : </h4>
                        <p>{outputData.employeeDTOEmailId}</p>
                      </div>
                      <div id='data-output'>
                        <h4>Employee Job Title : </h4>
                        <p>{outputData.employeeDTOJobTitle}</p>
                      </div>
                      <div id='data-output'>
                        <h4>Employee Team Name : </h4>
                        <p>{outputData.getEmployeeDTOTeamName}</p>
                      </div>
                  </div>

                }

            </fieldset>
        </form>
    </div>
  )
}

export default GetEmployeeDetails
