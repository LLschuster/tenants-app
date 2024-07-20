export type StepProps = {
    onSubmit: () => void
  }
  
export type SalaryRange =  "range_1000" |
                      "range_2000" |
                      "range_3000" |
                      "range_4000" |
                      "range_4000+"|
                      ""
export  type AppartmentInfo = {
    imageUrl: string
    name: string
    price: string
  }
  
 export type AppState = {
    fullName: string
    email: string
    phoneNumber: string
    location: string
    salaryRange: string
    apartmentResults: AppartmentInfo[]
  }

export  type Action =
  | { type: 'SET_FULLNAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONENUMBER'; payload: string }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'SET_SALARYRANGE'; payload: string }
  | { type: 'SET_APPARTMENTS'; payload: AppartmentInfo[] }
  | { type: 'RESET'; payload?: null };