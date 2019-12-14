# Ricky and Marty

### Steps for development setup
- Clone repo
- cd into the cloned folder
- run 'npm i'
- run 'npm start'

The application should be running at: http://localhost:9000

### Deployment
- run 'npm run prod' to build a distributed package

### Note
- Filtering and Search by name is done on the server side using https://rickandmortyapi.com/api/character endpoint
- Rick and Marty api supports filtering on single values on species and gender.So Only one value will work for each filter category at a time(no multiple selection of checkbox inside a filter category)
- Sorting is done on the frontend.Sorts only the characters in the current page.