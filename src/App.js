import { useCallback, useEffect, useState } from "react"
import _ from "lodash"
import {
  hasSomeNull,
  isJsonPropertiesCorrect,
  isValidJsonString,
  levragingTransactionData,
} from "./utils/utils"
import { transactionsRequest } from "./services/transactions/transactions.services"
import CustomTable from "./components/customTable/CustomTable.component"
import "./App.css"
import Spinner from "./components/spinner/Spinner.component"
import Button from "./components/button/Button.component"
import ErrorPage from "./pages/errorPage/ErrorPage.component"

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [typeOfTransaction, setTypeOfTransaction] = useState()
  const [selectTransactionType, setSelectTransactionType] = useState("medium")
  const [usersTransaction, setUsersTransaction] = useState([])
  const [jsonObjectsTypes] = useState(["Small", "Medium", "Large"])
  const [tHeads] = useState(["User ID", "GBP", "USD", "EUR", "Last Activity"])

  // Get response from the API mock call then populate the state with that JSON file or throw error incase of any
  useEffect(() => {
    setIsLoading(true)
    setTypeOfTransaction(selectTransactionType)
    //Mimicking the Endpoint call with 1s delay
    setTimeout(() => {
      transactionsRequest(typeOfTransaction)
        .then((response) => {
          const hasSomeNulls = response.some(hasSomeNull)
          if (
            isJsonPropertiesCorrect(response) &&
            isValidJsonString(response) &&
            hasSomeNulls === false
          ) {
            setTransactions(response)
          } else {
            setError({ msg: "Json Malformated!" })
            setTransactions([])
            setIsLoading(false)
          }
        })
        .catch((err) => {
          setTransactions([])
          setIsLoading(false)
          setError(err)
        })
    }, 1000)
  }, [selectTransactionType, transactions, typeOfTransaction])

  //Won't make a huge difference in this exercice but it will save around ±.2ms based on Profiling data
  const levTransactionData = useCallback(
    () => levragingTransactionData(_, transactions),
    [transactions]
  )

  // Populating the usersTransaction state after leveraging the data
  useEffect(() => {
    // const levTransactionData = levragingTransactionData(_, transactions)
    setIsLoading(true)
    try {
      setUsersTransaction(levTransactionData)
      setIsLoading(false)
    } catch (error) {
      setUsersTransaction(null)
      setIsLoading(false)
      setError(error)
    }
  }, [levTransactionData, transactions])

  if (error) {
    return <ErrorPage />
  }

  return (
    <div className="app-container">
      <div className="button-container">
        {jsonObjectsTypes.map((js, index) => (
          <Button
            key={index}
            content={js}
            type="submit"
            setSelectTransactionType={setSelectTransactionType}
            isLoading={isLoading}
          />
        ))}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <CustomTable usersTransaction={usersTransaction} tHeads={tHeads} />
      )}
    </div>
  )
}

export default App
