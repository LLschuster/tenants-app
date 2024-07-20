import { AppState, SalaryRange, StepProps } from "../utils/types"

type Props = StepProps & {
    state: AppState
    onReset: () => void
  }
export const SummaryStep = ({onSubmit, state, onReset}: Props) => {
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