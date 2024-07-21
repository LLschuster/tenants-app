import { AppartmentInfo } from "../utils/types"

type Props = {
    appartmentList: AppartmentInfo[]
    onReset: () => void
  }
  
export const RentView = ({appartmentList, onReset}: Props) => {
    return (<div className="RentView">
    <ul>
    {
      appartmentList.map(result => {
        return (
          <li key={result.name}>
            <img height={250} width={250} src={result.imageUrl} alt="Apartment" />
            <p>{result.name}</p>
            <small>{result.price}$ Euro</small>
          </li>
        )
      })
    }
    </ul>
    <input type="button" value="reset registration" onClick={onReset} />
  </div>)
  }