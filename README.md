# Exercise - React

## The task
The results show excatly the desired outcome.

## Assumptions
- A user can have multiple transactions.
- A user can have transactions in multiple currencies.
- A user will have at least one transaction.
- There are no duplicated transactions. Two transactions with the same timestamp for the same user are 2 distinct transactions.
- We assume the currencies are limited to: GBP, EUR, USD.
- The dates will be valid so as the currencies and the amounts (unless if they are null - which handled)
- Json input is not in 1mil record.

## Approach
Logic was the first think to think of before the UI part.
The idea was to groupBy by user then by currency in order to have the data we need for each user.
Then calculating both higher timestamp within those objects and the sum of the amount after converting them to numbers instead of integers.
Once the logic part was finished, then unit tests took place then afterwards the UI.
Once all done, some performance tests were performed using Profiler and Lighthouse to add some optimization to the code with some refactoring, before building the solution and shipping it to production.

## Notes
- Loadash was used some times inleveraging general purpose tools like groupBy etc... for optimization issues and was not used for the sum, you will find the sum commented out.
- No UI library was used, only CSS.
- Loading Indicator is present so as HTTP mock - there is a mock and mimicking the API called with a delay of 1s - You can change it if you like, you will find it in the App.js (2nd useEffect).
- The mini project was meant to have a UI look and tried to make responsive as much as possible, some media queries are present but not much... just to show how to use them.
- Edge cases have been handled (Missing or malformated data or JSON properties or incase of some properties with a null value).
- Some basic test are available there, however, not that much. (Had to go through the jest docs to make them).
- The table is scollable - you can add the scrolling bar if you prefer that through CSS property in the CustomTable component.
- Lighthouse results in incognito mode: 
- # Performance: 98
- # Accessibilty: 94
- # Best Practices: 100
- # SEO: 100

## PS: Apologies if something was forgotten to be mentioned here.
## This solution is shipped via github pages.