Features Implemented
 - table component/subcomponents
 - fetch list of hawks and populate table
 - sort table (name, size, gender)
 - view and edit hawk details

Possible Future Enhancements
 - refactor hawkTable/row/header into generic components taking in a column config so that the table can be reused across the application, no matter what model/API is used
 - infinite scroll
 - input validation
 - more componentization
 - accessability enhancements (e.g. ensure user can nav with just keyboard, aria attributes)
 - error handling

Design Notes
  - You will notice that I used vanilla-javascript instead of typescript. This is just for speed - I have been on typescript projects before and it wouldn't take me long to get used to it again, but I have been writing vanilla-js react for the last couple of years.
  - I felt that using redux was a bit overkill for this simple CRUD app, but would obviously use it as the app scaled up for centralized state management and data caching