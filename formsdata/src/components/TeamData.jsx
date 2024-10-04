import React from 'react'
import './TeamData.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'

const TeamData = () => {

    const URL = `http://localhost:8080/team`;
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState(false);
    const [Id, setID] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async (data) => {
        try{
            const response = await axios.post(URL, data);
            console.log(data);
            setID(response.data.teamDTOId);
            setError(false);
            setFlag(true);
        }
        catch(error){
            const errorMsg = error.response?.data?.message || "An unknown error occurred";
            setErrorMessage(errorMsg);
            setFlag(false);
            setError(true);
        }
    }


  return (
    <div className='container'>

        <form className='team-data' onSubmit={handleSubmit(submitHandler)} >
            <fieldset className='field-data'>
                <legend className='legend'>Create a new Team</legend>
                
                <div>
                    <div className='details'>
                        <label> Enter Your Team Name : </label>
                        <input type='text' className='inputlength' id="teamDTOName" {...register("teamDTOName", { required: true })}/>
                    </div>
                    <br/>
                    {errors.teamDTOName && <p id='errors'><sup>*</sup>Team Name is required</p>}
                </div>
                <br/>

                <div>
                    <div className='details'>
                        <label> Enter Your Team Description : </label>
                        <input type='text' className='inputlength' id="teamDTODescription" {...register("teamDTODescription")}/>
                    </div>
                    <br/>
                </div>
                <br/>

                <div className='submit-button'>
                    <input type='submit' />
                </div>

                {flag && <p className='outputcontainer' id='messages'>Team Created with ID :  {Id}</p>}
                {error && <p className='outputcontainer' id='errors' >{errorMessage}</p>}

            </fieldset>
        </form>
      
    </div>
  )
}

export default TeamData
