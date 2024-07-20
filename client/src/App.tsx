import React, { ChangeEvent, useReducer, useState } from 'react';
import './App.css';

const totalSteps = 5

type StepProps = {
  onSubmit: () => void
}

type SalaryRange =  "range_1000" |
                    "range_2000" |
                    "range_3000" |
                    "range_4000" |
                    "range_4000+"|
                    ""
type AppartmentInfo = {
  imageUrl: string
  name: string
  price: string
}

type AppState = {
  fullName: string
  email: string
  phoneNumber: string
  location: string
  salaryRange: string
  apartmentResults: AppartmentInfo[]
}

type Action =
  | { type: 'SET_FULLNAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONENUMBER'; payload: string }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'SET_SALARYRANGE'; payload: string }
  | { type: 'SET_APPARTMENTS'; payload: AppartmentInfo[] }
  | { type: 'RESET'; payload?: null };

const initialState: AppState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  location: 'Berlin',
  salaryRange: '',
  apartmentResults: []
};

const appStateStorageKey = 'appState'

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

const Toast = (props: {text: string, open: boolean}) => {
  const className = `${props.open ? 'show' : ''} toast`
  return (
    <div className={className}>
      <p>{props.text}</p>
      </div>
  )
}

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

type PIProps = StepProps & {
  fullname: string
  phoneNumber: string
  email: string

  errorHandler: (message: string) => void
  dispatch: React.Dispatch<Action>
}
const PersonalInfoStep = ({onSubmit, dispatch, errorHandler, fullname, phoneNumber, email}: PIProps) => {
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
        <input onChange={handleInputChange} type="text" id='input_fullname' name='input_fullname' value={fullname} required />
        </fieldset>
        <fieldset>

        <label htmlFor="input_phone">Enter your phone number*</label>
        <input onChange={handleInputChange} type="text" id='input_phoneNumber' name='input_phoneNumber' value={phoneNumber} required />
        </fieldset>
        <fieldset>
        <label htmlFor="input_email">Enter your email*</label>
        <input onChange={handleInputChange} type="email" id='input_email' name='input_email' value={email} required />
        </fieldset>
      <input type='button' value='Submit' onClick={goToNextStep} />
      </form>
    </div>
  )
}

type SAProps = StepProps & {
  salaryRange: string
  dispatch: React.Dispatch<Action>
}

const SalaryStep = ({onSubmit, salaryRange, dispatch}: SAProps) => {
  const goToNextStep = () => {
    onSubmit()
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({
      type: "SET_SALARYRANGE",
      payload: value,
    });
  };

  return (
    <div className='salaryContainer'>
      <h2>Please provide your salary range</h2>
      <form action="">
      <fieldset>
        <input onChange={handleInputChange} type="radio" id="range_1000" name="salary_range" value="range_1000" checked={salaryRange === "range_1000"} />
        <label htmlFor="range_1000">0 - 1.000</label>
        <br />
        <input onChange={handleInputChange} type="radio" id="range_2000" name="salary_range" value="range_2000" checked={salaryRange === "range_2000"}/>
        <label htmlFor="range_2000">1.000 - 2.000</label>
        <br />
        <input onChange={handleInputChange} type="radio" id="range_3000" name="salary_range" value="range_3000" checked={salaryRange === "range_3000"}/>
        <label htmlFor="range_3000">2.000 - 3.000</label>
        <br />
        <input onChange={handleInputChange} type="radio" id="range_4000" name="salary_range" value="range_4000" checked={salaryRange === "range_4000"}/>
        <label htmlFor="range_4000">3.000 - 4.000</label>
        <br />
        <input onChange={handleInputChange} type="radio" id="range_4000+" name="salary_range" value="range_4000+" checked={salaryRange === "range_4000+"}/>
        <label htmlFor="range_4000+">more than 4.000</label>
      </fieldset>
      <input type='button' value='Submit' onClick={goToNextStep}/>
      </form>
    </div>
  )
}

type LOProps = StepProps & {
  location: string
  dispatch: React.Dispatch<Action>
}

const locations = ["Berlin", "Hamburg", "Frankfurt"]
const LocationInfoStep = ({onSubmit, location, dispatch}: LOProps) => {
  const goToNextStep = (newLocation: string) => {
    dispatch({
      type: "SET_LOCATION",
      payload: newLocation
    })
    onSubmit()
  }
  console.log({location})
  return (
    <div className='locationContainer'>
      <h2>Please provide the where do you want to live</h2>
      <ul>
        {
          locations.map(loc => {
            return (
              <li  id={loc} data-checked={location === loc ? '1' : '0'} onClick={() => goToNextStep(loc)}>{loc}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

type SUProps = StepProps & {
  state: AppState
  onReset: () => void
}
const SummaryStep = ({onSubmit, state, onReset}: SUProps) => {
  const goToNextStep = () => {
    onSubmit()
  }

  const getSalaryRangeLabel = (range: SalaryRange) => {
    switch(range){
      case "range_1000":
        return "0 - 1.000"
          case "range_2000":
        return "1.000 - 2.000"
            case "range_3000":
        return "2.000 - 3.000"
            case "range_4000":
        return "3.000 - 4.000"
            case "range_4000+":
        return "more thn 4.000"
      default:
        return ""
    }
  }

  return (
    <div className='summaryContainer'>
      <h2>Please review your provided info</h2>
      <p>
      <label>fullname:</label>
      <i>{state.fullName}</i>
      </p>

<p>
<label>E-mail: </label>
<i>{state.email}</i>
</p>

<p>
<label>Phone: </label>
<i>{state.phoneNumber}</i>
</p>

<p>
<label>Salary range: </label>
<i>{getSalaryRangeLabel(state.salaryRange as SalaryRange) }</i>
</p>

<p>
<label>location: </label>
<i>{state.location}</i>
</p>

      <input type='button' value='Submit' onClick={goToNextStep}/>
      <input type="button" value="reset registration" onClick={onReset} />
    </div>
  )
}

type RentProps = {
  appartmentList: AppartmentInfo[]
  onReset: () => void
}

const RentView = ({appartmentList, onReset}: RentProps) => {
  return (<div>
  <ul>
  {
    appartmentList.map(result => {
      return (
        <li>
          <img src={result.imageUrl} alt="Apartment" />
          <p>{result.name}</p>
          <small>{result.price}</small>
        </li>
      )
    })
  }
  </ul>
  <input type="button" value="reset registration" onClick={onReset} />
</div>)
}

const initialToastState = {
  text: "",
  open: false
}

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [toastState, _setToastState] = useState(initialToastState)
  const [state, dispatch] = useReducer(appReducer, initialState, appStateInit);

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
  
  console.log(result, appartments)
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
{   state.apartmentResults.length <= 0 ?  (<div className='card'>
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
