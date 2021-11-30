// START - Handling if JSON is valid, hasNoNulls as in values and has no Wrong properties
export const isJsonPropertiesCorrect = (jsonObject) => {
  let result = true
  jsonObject.map((trx) => {
    if (
      !trx.hasOwnProperty("user_id") ||
      !trx.hasOwnProperty("amount") ||
      !trx.hasOwnProperty("currency") ||
      !trx.hasOwnProperty("timestamp")
    ) {
      result = false
    }
    return result
  })
  return result
}

export const isValidJsonString = (json) => {
  const jsonString = JSON.stringify(json)
  if (!(jsonString && typeof jsonString === "string")) {
    return false
  }

  try {
    JSON.parse(jsonString)
    return true
  } catch (error) {
    return false
  }
}

export const hasSomeNull = (element) => {
  return (
    element.user_id === null ||
    element.amount === null ||
    element.currency === null ||
    element.timestamp === null
  )
}
// END - Handling if JSON is valid, hasNoNulls as in values and has no Wrong properties

export const groupByKey = (array, key) => {
  return array.reduce((acc, currVal) => {
    const myAttribute = currVal[key]
    acc[myAttribute] = [...(acc[myAttribute] || []), currVal]
    return acc
  }, {})
}

export const getObjectItems = (objectProvided, emptyArray) => {
  let objKeys = Object.keys(objectProvided)

  for (let item of objKeys) {
    emptyArray?.push(objectProvided[item])
  }
  return emptyArray
}

export const calculateCurrencyAmount = (amountCurrency, total, _) => {
  amountCurrency = total.map((tl) => Number(tl?.amount))
  let finalAmount = amountCurrency
    .reduce((acc, currVal) => parseFloat(acc + currVal), 0)
    .toFixed(2)

  let finalAmountWithSign =
    Math.sign(Number(finalAmount)) === 1
      ? `+${Number(finalAmount)}`
      : Number(finalAmount)

  // Sum with loadash
  // finalAmount = _.sum(amountCurrency).toFixed(2)

  return finalAmountWithSign
}

export const isValidTimestamp = (time) => new Date(time).getTime() > 0

export const calculateHigherTimestamp = (timestamp, groupedCurrency, _) => {
  timestamp = groupedCurrency.map((gc) => gc?.timestamp)

  timestamp = _.max(timestamp)

  return timestamp
}

// Should not be here, but to make it cleaner in the main code, i have placed it here for now
// TO CHANGE IT'S PLACE LATER
export const levragingTransactionData = (_, jsonObj) => {
  const groupedByUserId = _(jsonObj)
    .groupBy((userId) => userId?.user_id)
    .toArray()
    .value()

  let elements = groupedByUserId.map((gp_users) => gp_users)
  let users = []

  elements.map((item) => {
    let total = []
    let timestamp
    let timestampGBP
    let timestampUSD
    let timestampEUR
    let amountGBP = 0,
      amountEUR = 0,
      amountUSD = 0

    var groupingElement = item.map((subItem) => subItem)
    var groupedByCurrency = _(groupingElement)
      .groupBy((grpEle) => grpEle?.currency)
      .toArray()
      .value()

    groupedByCurrency.forEach((groupedCurrency) => {
      total = _(groupedCurrency)
        .map((grpItem) => grpItem)
        .value()

      let currency = total[0]?.currency

      if (currency === "GBP") {
        amountGBP = calculateCurrencyAmount(amountGBP, total, _)
        timestampGBP = calculateHigherTimestamp(
          timestampGBP,
          groupedCurrency,
          _
        )
      }
      if (currency === "USD") {
        amountUSD = calculateCurrencyAmount(amountUSD, total, _)
        timestampUSD = calculateHigherTimestamp(
          timestampUSD,
          groupedCurrency,
          _
        )
      }
      if (currency === "EUR") {
        amountEUR = calculateCurrencyAmount(amountEUR, total, _)
        timestampEUR = calculateHigherTimestamp(
          timestampEUR,
          groupedCurrency,
          _
        )
      }
    })

    timestamp = _.max([timestampEUR, timestampGBP, timestampUSD])
    timestamp = new Date(timestamp).toLocaleDateString().replaceAll("/", "-")

    let finalUserObject = {
      user_id: item[0]?.user_id,
      timestamp: timestamp,
      amountEUR: amountEUR,
      amountUSD: amountUSD,
      amountGBP: amountGBP,
    }

    users.push(finalUserObject)
    return users
  })
  return users
}
