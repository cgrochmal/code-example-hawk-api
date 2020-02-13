Features Implemented
 - table component/subcomponents
 - fetch list of hawks and populate table
 - sort table (name, size, gender)
 - create hawk
 - view and edit hawk details
 - filter hawks
 - infinite scroll/pagination

Design Notes
  - You will notice that I used vanilla-javascript instead of typescript. This is just for speed - I have been on typescript projects before and it wouldn't take me long to get used to it again, but I have been writing vanilla-js react for the last couple of years.
  - I felt that using redux was a bit overkill for this simple CRUD app, but would obviously use it as the app scaled up for centralized state management and data caching
  - using SCSS and BEM for styles

Future Enhancements
 - more unit test coverage! In addition to the initial snapshot tests, test component state changes.
 - refactor hawkTable/row/header into generic components taking in a column config so that the table can be reused across the application, no matter what model/API is used
 - input validation
 - more componentization
 - accessability enhancements (e.g. ensure user can nav with just keyboard, aria attributes)
 - error handling
 - loading indicators
 - better animations
 - show which sort field is currently selected with a different style arrow