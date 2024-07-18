import React from 'react';
import './App.css';

const totalSteps = 5

type StepProps = {
  onSubmit: () => void
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

const PersonalInfoStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }

  return (
    <div className='personalInfoContainer'>
      <h2>Please provide the following personal information</h2>
      <form action="">
        <fieldset>
        <label htmlFor="input_fullname">Enter your full name*</label>
        <input type="text" id='input_fullname' name='input_fullname' required />
        </fieldset>
        <fieldset>

        <label htmlFor="input_phone">Enter your phone number*</label>
        <input type="text" id='input_phone' name='input_phone' required />
        </fieldset>
        <fieldset>
        <label htmlFor="input_email">Enter your email*</label>
        <input type="email" id='input_email' name='input_email' required />
        </fieldset>
      <input type='button' value='Submit' onClick={goToNextStep} />
      </form>
    </div>
  )
}

const SalaryStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }
  return (
    <div className='salaryContainer'>
      <h2>Please provide your salary range</h2>
      <form action="">
      <fieldset>
        <input type="radio" id="range_1000" name="salary_range" value="range_1000" />
        <label htmlFor="range_1000">0 - 1.000</label>
        <br />
        <input type="radio" id="range_2000" name="salary_range" value="range_2000" />
        <label htmlFor="range_2000">1.000 - 2.000</label>
        <br />
        <input type="radio" id="range_3000" name="salary_range" value="range_3000" />
        <label htmlFor="range_3000">2.000 - 3.000</label>
        <br />
        <input type="radio" id="range_4000" name="salary_range" value="range_4000" />
        <label htmlFor="range_4000">3.000 - 4.000</label>
        <br />
        <input type="radio" id="range_4000+" name="salary_range" value="range_4000+" />
        <label htmlFor="range_4000+">more than 4.000</label>
      </fieldset>
      <input type='button' value='Submit' onClick={goToNextStep}/>
      </form>
    </div>
  )
}

const LocationInfoStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }
  return (
    <div className='locationContainer'>
      <h2>Please provide the where do you want to live</h2>
      <ul>
        <li onClick={goToNextStep}>Berlin</li>
        <li onClick={goToNextStep}>Hamburg</li>
        <li onClick={goToNextStep}>Frankfurt</li>
      </ul>
    </div>
  )
}

const SummaryStep = ({onSubmit}: StepProps) => {
  const goToNextStep = () => {
    onSubmit()
  }
  return (
    <div className='summaryContainer'>
      <h2>Please review your provided info</h2>
      <p>
      <label>fullname:</label>
      <i>A name </i>
      </p>

<p>
<label>E-mail: </label>
<i>test@email.com</i>
</p>

<p>
<label>Phone: </label>
<i>237498234</i>
</p>

<p>
<label>Salary range: </label>
<i>1000 - 2000</i>
</p>

<p>
<label>location: </label>
<i>Berlin</i>
</p>

      <input type='button' value='Submit' onClick={goToNextStep}/>
    </div>
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
      <div className='card'>
        {_renderCurrentStep()}
      </div>
      <footer>
      <progress id="registration_progress" max="100" value={((currentStep + 1) * 100) / totalSteps}></progress>
      </footer>
    </main>
  );
}

export default App;
