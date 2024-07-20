import { AppartmentInfo } from "../utils/types"

type Props = {
    appartmentList: AppartmentInfo[]
    onReset: () => void
  }
  
export const RentView = ({appartmentList, onReset}: Props) => {
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