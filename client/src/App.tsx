import React, { useReducer, useState } from 'react';
import './App.css';
import { Toast } from './components/Toast';
import { PersonalInfoStep } from './components/PersonalInfoStep';
import { appStateStorageKey, totalSteps } from './utils/constants';
import { AppState, Action, StepProps } from './utils/types';
import { SalaryStep } from './components/SalaryStep';
import { LocationInfoStep } from './components/LocationStep';
import { RentView } from './components/RentView';
import { SummaryStep } from './components/SummaryStep';

const initialState: AppState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  location: '',
  salaryRange: '',
  apartmentResults: []
};

const appStateInit = () => {
  const persistedState = sessionStorage.getItem(appStateStorageKey)
  if (!persistedState){
    return initialState
  }

  try {
    return JSON.parse(persistedState)
  } catch (error) {
    return initialState;
  }
}

const appReducer = (state: AppState, action: Action) => {
  let newState = {...state}

  switch (action.type) {
    case 'SET_FULLNAME':
        newState.fullName = action.payload;
        break
    case 'SET_EMAIL':
      newState.email = action.payload;
      break
    case 'SET_PHONENUMBER':
      newState.phoneNumber = action.payload;
      break
    case 'SET_LOCATION':
      newState.location = action.payload;
      break
    case 'SET_SALARYRANGE':
      newState.salaryRange = action.payload;
      break
    case 'RESET':
      newState = initialState;
      break
    case 'SET_APPARTMENTS':
      newState.apartmentResults = action.payload;
      break
    default:
      return state;
  }

  sessionStorage.setItem(appStateStorageKey, JSON.stringify(newState))
  return newState;
};

const WelcomeStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }
  return (
    <div className='WelcomeContainer'>
      <h2>Welcome to Tenants app</h2>
      <input type='button' value='Begin Registration' onClick={goToNextStep}/>
    </div>
  )
}

const initialToastState = {
  text: "",
  open: false
}

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [toastState, _setToastState] = useState(initialToastState)
  const [state, dispatch] = useReducer(appReducer, initialState, appStateInit);

  const viewToDisplay = state.apartmentResults.length <= 0 ? 'registration' : 'renterlist'

  const increaceStep = React.useCallback(() => {
    setCurrentStep(prev => prev + 1)
  }, [setCurrentStep])

  const handleOnReset = React.useCallback(() => {
    dispatch({type: "RESET"})
    setCurrentStep(0)
}, [dispatch, setCurrentStep])

const handleErrorMessage = (message: string) => {
  _setToastState({
  text: message,
  open: true
})
setTimeout(() => {
  _setToastState(initialToastState)
}, 3000);
}

const handleSubmitRegistration = async () => {
  const requestBody = JSON.stringify({
    fullname: state.fullName,
    email: state.email,
    salaryRange: state.salaryRange,
    phoneNumber: state.phoneNumber,
    location: state.location
  })

  const result = await fetch('http://localhost:3000/v1/appartments', {
    method: 'POST',
    headers: {
      'content-type': 'Application/json'
    },
    body: requestBody
  })

  
  if (result.status !== 200){
    handleErrorMessage("Could not fetch appartments")
    return
  }
  
  const appartments = await result.json()
  
  dispatch({
    type: "SET_APPARTMENTS",
    payload: appartments
  })
}

  const _renderCurrentStep = () => {
    switch(currentStep){
      case 0: 
        return <WelcomeStep onSubmit={() => setCurrentStep(1)}/> 
      case 1: 
        return <PersonalInfoStep 
        onSubmit={() => setCurrentStep(2)} 
        fullname={state.fullName} 
        phoneNumber={state.phoneNumber} 
        email={state.email} 
        dispatch={dispatch}
        errorHandler={handleErrorMessage}
        /> 
      case 2: 
        return <SalaryStep onSubmit={() => setCurrentStep(3)} salaryRange={state.salaryRange} dispatch={dispatch}/> 
      case 3: 
        return <LocationInfoStep location={state.location} dispatch={dispatch} onSubmit={increaceStep}/>
      case 4: 
        return <SummaryStep state={state} onSubmit={handleSubmitRegistration} onReset={handleOnReset}/> 
      default:
        return <WelcomeStep onSubmit={() => setCurrentStep(1)}/>
    }
  }
    return (
    <main id='main_content'>
      {  viewToDisplay === 'registration'  ?  
      (<div className='card'>
        {_renderCurrentStep()}
      </div>) :
      <RentView appartmentList={state.apartmentResults} onReset={handleOnReset}/>}
      <footer>
      <progress id="registration_progress" max="100" value={((currentStep + 1) * 100) / totalSteps}></progress>
      </footer>
      <Toast text={toastState.text} open={toastState.open}/>
    </main>
  );
}

export default App;
