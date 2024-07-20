import { locations } from "../utils/constants"
import { Action, StepProps } from "../utils/types"

type LOProps = StepProps & {
    location: string
    dispatch: React.Dispatch<Action>
  }
  
export const LocationInfoStep = ({onSubmit, location, dispatch}: LOProps) => {
    const goToNextStep = (newLocation: string) => {
      dispatch({
        type: "SET_LOCATION",
        payload: newLocation
      })
      onSubmit()
    }

    return (
      <div className='locationContainer'>
        <h2>Please provide the where do you want to live</h2>
        <ul>
          {
            locations.map(loc => {
              return (
                <li key={loc}  id={loc} data-checked={location === loc ? '1' : '0'} onClick={() => goToNextStep(loc)}>{loc}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }