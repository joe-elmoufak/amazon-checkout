# CYPRESS Amazon Shopping Basket Test

## Project setup
Run the following command at the root of the project. This will install all dependencies.
```
npm install
```

### To run a full suite of tests locally
At the root of the project....
```
npm run cy:test
```

### To run test in the cypress application

```
npx cypress open
```

I also created an actions file that will kick off the test in a github actions runner when a push is made to the repo.

If test fails, then a video playback of the test is stored as part of the build.

###  NOTES
The test fails at the point when I assert that there should be 9 items displayed in the shopping basket list (I add 3 * 3 items over the course of the test).

While the number of items is correctly displayed as 9, there only appear to be 8 items in the shopping basket.

If I ignore this assetion, then the test will go on to remove the first item and then assert that the number has reduced from 9 to 8 (items in the basket)

Interestingly, when the tests are run in the github runner, the Prime logo on the each search result item is missing so no items are ever added to the basket. This is not the case when the tests are run locally so would need more time to investigate why this is.
