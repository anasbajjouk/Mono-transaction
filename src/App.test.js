import { render } from "@testing-library/react"
import App from "./App"
import CustomTableComponent from "./components/customTable/CustomTable.component"

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

const tableHeads = ["User ID", "GBP", "USD", "EUR", "Last Activity"]

test("renders App exists", () => {
  const app = render(<App />)

  //useless but to check
  expect(app).toBeTruthy()
})

test("renders App and checked if the table is present", () => {
  const { getByTestId } = render(
    <CustomTableComponent
      usersTransaction={expectedResult}
      tHeads={tableHeads}
    />
  )

  expect(getByTestId("table-test")).toBeInTheDocument()
})
