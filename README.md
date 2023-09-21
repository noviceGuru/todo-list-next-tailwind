# Description
A todo list, written using `NextJS` and `TailwindCSS`, tested with `React Testing Library` and `Jest` and `msw` to mock the fetch calls, for unit and integrated tests, and `Playwright` for end to end test.

<br/>

<img src="./public/todo-list.gif"/>

</br>

This was some self training exercise. I tried to challange myself in the things I knew, and also used some libraries for the first time, and loved them.


# Run
To run, you need to
1. Download the dependencies:
	```
	npm install
	```
	or
	```
	yarn
	```
2. Serve the mock data over a json server. I personally use [json-server](https://www.npmjs.com/package/json-server). You can use the mock data inside the `./mockData/data.json`. This way you can also run the end to end test, since `Playwright` cannot intercept calls in `server components` yet.
   
   This is how I serve my `json` over port `3001`
   ```
   npx json-server ./mockData/data.json --port 3001
   ```
3. Run the dev server
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

And it normally is served over the good old `http://localhost:3000`.

# Test

## Unit and Integration Tests
Mocked by `React Testing Library` and `msw`, and performed by `Jest`, you can use
```
npm run test
```
to simply run the tests, or
```
npm run test:coverage
```
to see the test coverage. You do not need to have your development server up and running to perform the tests.
## End to End Tests
Mocked and performed by `Playwright`, firstly you need to have the `json-server` and the `development server` running, by:

```
npx json-server ./mockData/data.json --port 3001
```
and
```
npm run dev
```
Once the servers or up, you can execute the tests by: 
```
npm run test:e2e
```
For debug mode, 
```
npm run test:e2e-debug
```
and to see the report
```
npm run test:e2e-report
```
will do the job.

# Lessons learned
I learned a lot of things that might seem minor, or have slipped my mind, but these should be the more important ones:

1. `TailwindCSS` is easy to use, smart (if you override classes it'll throw errors right in the editor), efficient and scalable. It will be my choice for _Single Page Applications_. 
   
   Happily, I didn't have to create any `css` or `scss` files and link them, or overthink on how to name a `css class`. Also, the distances and the colors where standardized and basic `animation` is provided with only a className.

	As a result, you end up having far less unnecessary `css` code, which would help you optimize your bundle, also at scale.
   
2. `Playwright` tests your code, over 4 different browsers, inside service workes. Sounds much better respect to `Cypress` that tests your code only in `Chrome`.
	
	It intercepts the API calls for you (so, no need to something like `msw`), and has very good development tools. The two things I learned:
      1. It cannot intercept the API calls inside the `server components`.
      2. It runs in the `development` environment, not `test`.
