import { levragingTransactionData } from "./utils"
import _ from "lodash"

const INITIAL_STATE = [
  {
    user_id: "4a1b84f7-9756-4549-837e-9574c7ffc142",
    timestamp: "1970-01-01T00:00:00Z",
    currency: "GBP",
    amount: "+12.00",
  },
  {
    user_id: "4a1b84f7-9756-4549-837e-9574c7ffc142",
    timestamp: "1971-01-01T00:00:00Z",
    currency: "GBP",
    amount: "-12.00",
  },
  {
    user_id: "4a1b84f7-9756-4549-837e-9574c7ffc142",
    timestamp: "1970-01-01T00:00:00Z",
    currency: "USD",
    amount: "-12.00",
  },
  {
    user_id: "faf4a6fe-c839-4ee3-ac11-ee3957ac6332",
    timestamp: "1970-01-01T00:00:00Z",
    currency: "EUR",
    amount: "-3.99",
  },
]

const expectedResult = [
  {
    amountEUR: 0,
    amountGBP: 0,
    amountUSD: -12,
    timestamp: "01-01-1971",
    user_id: "4a1b84f7-9756-4549-837e-9574c7ffc142",
  },
  {
    amountEUR: -3.99,
    amountGBP: 0,
    amountUSD: 0,
    timestamp: "01-01-1970",
    user_id: "faf4a6fe-c839-4ee3-ac11-ee3957ac6332",
  },
]

describe("Levraging Transactions", () => {
  it("Should give correct object to be printed", () => {
    expect(levragingTransactionData(_, INITIAL_STATE)).toEqual(expectedResult)
  })
})
