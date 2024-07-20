import { ChangeEvent } from "react"
import { Action, StepProps } from "../utils/types"

type Props = StepProps & {
    fullname: string
    phoneNumber: string
    email: string
  
    errorHandler: (message: string) => void
    dispatch: React.Dispatch<Action>
  }

export const PersonalInfoStep = ({onSubmit, dispatch, errorHandler, fullname, phoneNumber, email}: Props) => {
    const validateInputs = () => {
      if (!fullname){
        errorHandler("You need to provide your name")
        return false
      }
  
      if (!phoneNumber){
        errorHandler("You need to provide your phone number")
        return false
      }
  
      if (!email || !RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)){
        errorHandler("The provided email is invalid")
        return false
      }
  
      return true
    }
    
    const goToNextStep = () => {
      if (!validateInputs()){
        return
      }
      onSubmit()
    }
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const type = `SET_${name.replace("input_", "").toUpperCase()}`
      dispatch({
        type: type as 'SET_FULLNAME' | 'SET_EMAIL' | 'SET_PHONENUMBER',
        payload: value,
      });
    };
  
    return (
      <div className='personalInfoContainer'>
        <h2>Please provide the following personal information</h2>
        <form action="">
          <fieldset>
          <label htmlFor="input_fullname">Enter your full name*</label>
          <input onChange={handleInputChange} type="text" id='input_fullname' name='input_fullname' data-testid='input_fullname' value={fullname} required />
          </fieldset>
          <fieldset>
  
          <label htmlFor="input_phone">Enter your phone number*</label>
          <input onChange={handleInputChange} type="text" id='input_phoneNumber' data-testid='input_phoneNumber' name='input_phoneNumber' value={phoneNumber} required />
          </fieldset>
          <fieldset>
          <label htmlFor="input_email">Enter your email*</label>
          <input onChange={handleInputChange} type="email" id='input_email' data-testid='input_email' name='input_email' value={email} required />
          </fieldset>
        <input id="submit_btn" type='button' value='Submit' onClick={goToNextStep} />
        </form>
      </div>
    )
  }