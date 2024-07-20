import { ChangeEvent } from "react"
import { Action, StepProps } from "../utils/types"

type Props = StepProps & {
    salaryRange: string
    dispatch: React.Dispatch<Action>
  }
  
export const SalaryStep = ({onSubmit, salaryRange, dispatch}: Props) => {
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