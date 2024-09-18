# Term Deposit Calculator

## Requirements

- Node.js at least v18.16.0

## Getting Started

1. Clone the repository - `git clone https://github.com/chriswillphoto/term-deposit-calc.git`
2. Navigate to the project directory - `cd term-deposit-calc`
3. Run `npm install` to install dependencies
4. Run `npm dev` to start the development server
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

### `npm dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run test:coverage`

Launches the test runner and generates a coverage report.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `npm run start`

Builds then runs the app in the production mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build considerations

I built this project using React and Typescript because that is a front end stack I am familiar with. I chose to write this in the front end because in a real world scenario, the term deposit calculator would not require anything proprietary, nor is there a need to persist any data, so would not necessitate network calls to a backend; saving on traffic and compute costs. 

Business logic lives in a services directory, and tests are colocated with the services they test. React components live in a directory called components, and integration tests would be colocated with the components they test. Seperating business logic from the UI components makes the code easier to test and maintain. There was no need for utility functions in this project, but if there were a need for functions that would be used across different services or in different UI components, I would have put them in a utilities directory.

Right now there is only one page, but if the need arose it would be simple enough to add a pages directory, add react router, and add more pages.

I started with tests to cover the calculator service, covering a wide range of scenarios and probable errors. I have not added integration tests for the UI components, but I would do so if this were a real project.

