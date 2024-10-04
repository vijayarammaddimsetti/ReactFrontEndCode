import React, { useState } from 'react'
import './EmployeeData.css'
import { useForm } from "react-hook-form";
import axios from 'axios';

const EmployeeData = () => {

    const URL = `http://localhost:8080/employee`;
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState(false);
    const [Id, setID] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(URL, data);
            console.log(data);
            setID(response.data.employeeDTOId);
            setError(false);
            setFlag(true);
        } 
        catch (error) {
            const errorMsg = error.response?.data?.message || "An unknown error occurred";
            setErrorMessage(errorMsg);
            setFlag(false);
            setError(true);
        }
    };


  return (
    <div className='container'>

        <form className='topcontainer'  onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='field-data-employee'>
                <legend className='legend'>Add a new Employee</legend>

                <div>
                    <div className='details'>
                        <label> Enter Your Employee Name here : </label>
                        <input type='text'  className='inputlength'  id="employeeDTOName" {...register("employeeDTOName", { required: true })} /> 
                    </div>
                    <br/>
                    {errors.employeeDTOName && <p id='errors'><sup>*</sup>Employee Name is required</p>}
                </div>
                <br/>
                
                <div>
                    <div className='details'>
                        <label> Enter Your Employee Email ID : </label>
                        <input type='text' className='inputlength' id="employeeDTOEmailId" {...register("employeeDTOEmailId", { required: true })}/>
                    </div>
                    <br/>
                    {errors.employeeDTOEmailId && <p id='errors'><sup>*</sup>Employee Email ID is required</p>}
                </div>
                <br/>

                <div>
                    <div className='details'>
                        <label> Enter Your Employee Job Title : </label>
                        <input type='text'  className='inputlength' id="employeeDTOJobTitle" {...register("employeeDTOJobTitle", { required: true })} />
                    </div>
                    <br/>
                    {errors.employeeDTOJobTitle && <p id='errors'><sup>*</sup>Employee Job Title is required</p>}
                </div>
                <br/>
                
                <div className='details'>
                    <label> Enter Your Team Id : </label>
                    <input type='text'  className='inputlength' id="employeeTeamId" {...register("employeeTeamId")} />
                </div>
                <br/>
                <br/>

                <div className='submit-button'>   
                    <input type='submit'/>
                </div>

                {flag && <p className='outputcontainer' id='messages'>Employee Created with ID :  {Id}</p>}
                {error && <p className='outputcontainer' id='errors' >{errorMessage}</p>}

            </fieldset>
        </form>
      
    </div>
  )
}

export default EmployeeData
