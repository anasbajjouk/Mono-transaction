import React from "react"
import "./CustomTable.style.css"

const CustomTable = ({ usersTransaction, tHeads }) => {
  return (
    <>
      <table className="tableFixHead" data-testid="table-test">
        <thead>
          <tr>
            {tHeads.map((tHead, index) => (
              <th key={index}>{tHead}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {usersTransaction.map((usr, i) => {
            return (
              <tr key={i}>
                <td>{usr.user_id}</td>
                <td>{usr.amountGBP === 0 ? "-" : usr.amountGBP}</td>
                <td>{usr.amountUSD === 0 ? "-" : usr.amountUSD}</td>
                <td>{usr.amountEUR === 0 ? "-" : usr.amountEUR}</td>
                <td>{usr.timestamp}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default React.memo(CustomTable)
