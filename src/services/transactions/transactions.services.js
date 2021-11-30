import { mocks } from "./mock"

export const transactionsRequest = (typeOfTransaction = "small") => {
  if (
    typeOfTransaction === null ||
    typeOfTransaction === undefined ||
    typeof typeOfTransaction !== "string"
  ) {
    typeOfTransaction = "small"
  }

  return new Promise((resolve, reject) => {
    const mock = mocks[typeOfTransaction.toLowerCase()]
    if (!mock) {
      reject("transactions not found")
    }
    resolve(mock)
  })
}
