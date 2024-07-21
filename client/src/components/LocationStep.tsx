import { locations } from "../utils/constants"
import { Action, StepProps } from "../utils/types"

type LOProps = StepProps & {
    location: string
    dispatch: React.Dispatch<Action>
  }
  
export const LocationInfoStep = ({onSubmit, location, dispatch}: LOProps) => {
    const handleSelectLocation = (newLocation: string) => {
      const allSelectables = document.getElementsByTagName('li');
      let selectedElem: HTMLLIElement;

      const handleSubmit = () => {
        dispatch({
          type: "SET_LOCATION",
          payload: newLocation
        })
        selectedElem.removeEventListener("animationend", handleSubmit)
        onSubmit()
      }

      for (let i = 0; i < allSelectables.length; i++){
        const elem = allSelectables.item(i)
        if (!elem){
          continue
        }

        if (elem.id === newLocation){
          selectedElem = elem;
          selectedElem.addEventListener("animationend", handleSubmit)
          selectedElem.className += "translateAndScale"
          continue
        }
        elem.className = "hidden"
      }
    }

    return (
      <div className='locationContainer'>
        <h2>Please provide the where do you want to live</h2>
        <ul>
          {
            locations.map(loc => {
              return (
                <li key={loc}  id={loc} data-checked={location === loc ? '1' : '0'} onClick={() => handleSelectLocation(loc)}>{loc}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }