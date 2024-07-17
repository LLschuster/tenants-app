import React from 'react';
import './App.css';

type StepProps = {
  onSubmit: () => void
}

const WelcomeStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }
  return (
    <>
      <h2>Welcome to Tenants app</h2>
      <input type='submit' value='Begin Registration' onClick={goToNextStep}/>
    </>
  )
}

const PersonalInfoStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }

  return (
    <>
      <h2>Please provide the following personal information</h2>
      <form action="">
        <label htmlFor="input_fullname">Enter your full name*</label>
        <input type="text" id='input_fullname' name='input_fullname' required />
        <label htmlFor="input_phone">Enter your phone number*</label>
        <input type="text" id='input_phone' name='input_phone' required />
        <label htmlFor="input_email">Enter your email*</label>
        <input type="email" id='input_email' name='input_email' required />
      <input type='button' value='Submit' onClick={goToNextStep} />
      </form>
    </>
  )
}

const SalaryStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }
  return (
    <>
      <h2>Please provide your salary range</h2>
      <form action="">

      <input type="radio" id="range_1000" name="salary_range" value="range_1000" />
      <label htmlFor="range_1000">0 - 1.000</label>
      <input type="radio" id="range_2000" name="salary_range" value="range_2000" />
      <label htmlFor="range_2000">1.000 - 2.000</label>
      <input type="radio" id="range_3000" name="salary_range" value="range_3000" />
      <label htmlFor="range_3000">2.000 - 3.000</label>
      <input type="radio" id="range_4000" name="salary_range" value="range_4000" />
      <label htmlFor="range_4000">3.000 - 4.000</label>
      <input type="radio" id="range_4000+" name="salary_range" value="range_4000+" />
      <label htmlFor="range_4000+">more than 4.000</label>
      <input type='button' value='Submit' onClick={goToNextStep}/>
      </form>
    </>
  )
}

const LocationInfoStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }
  return (
    <>
      <h2>Please provide the where do you want to live</h2>
      <ul>
        <li onClick={goToNextStep}>Berlin</li>
        <li onClick={goToNextStep}>Hamburg</li>
        <li onClick={goToNextStep}>Frankfurt</li>
      </ul>
    </>
  )
}

const SummaryStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }
  return (
    <>
      <h2>Please review your provided info</h2>
      <label>fullname:</label>
      <p>A name </p>
      <label>E-mail: </label>
      <p>test@email.com</p>
      <label>Phone: </label>
      <p>237498234</p>
      <label>Salary range: </label>
      <p>1000 - 2000</p>
      <label>location: </label>
      <p>Berlin</p>
      <input type='button' value='Submit' onClick={goToNextStep}/>
    </>
  )
}

function App() {
  const [currentStep, setCurrentStep] = React.useState(0)

  const _renderCurrentStep = () => {
    switch(currentStep){
      case 0: 
        return <WelcomeStep onSubmit={() => setCurrentStep(1)}/> 
      case 1: 
        return <PersonalInfoStep onSubmit={() => setCurrentStep(2)}/> 
      case 2: 
        return <SalaryStep onSubmit={() => setCurrentStep(3)}/> 
      case 3: 
        return <LocationInfoStep onSubmit={() => setCurrentStep(4)}/>
      case 4: 
        return <SummaryStep onSubmit={() => setCurrentStep(5)}/> 
      default:
        return <WelcomeStep onSubmit={() => setCurrentStep(1)}/>
    }
  }
    return (
    <main id='main_content'>
      {_renderCurrentStep()}
      <progress id="registration_progress" max="100" value="70">70%</progress>
    </main>
  );
}

export default App;
