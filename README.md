## Quick Start:

```bash
cd `this folder`
npm install
webpack-dev-server
```
then go to `http://localhost:8080`, it should be working there.

It is probably the smallest and compact independent `React-Redux` app to start with.


## Introduction:

This repository is original going throw Dan Abramov's Redux video:

[https://egghead.io/courses/getting-started-with-redux](https://egghead.io/courses/getting-started-with-redux)

There are total 7 branches, each branch response a certain point of the video, all works fine in JSBIN.

I added a branch `step-7` to make it work as a Webpage, by adding `es6` and `babel`.


## Original resource:

- https://egghead.io/lessons/javascript-redux-extracting-action-creators
- https://egghead.io/lessons/javascript-redux-react-todo-list-example-filtering-todos


## Work in jsbin.com:

In JSBIN, add the following in `HTML` tab:
```html
<!DOCTYPE html>
<html>
<head>
  <title>React+React TODO</title>
  <script src="https://fb.me/react-15.1.0.js"></script>
  <script src="https://fb.me/react-dom-15.1.0.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js"></script>
</head>
<body>
  <div id='root'>
</body>
</html>
```
and copy `step-1` to `step-6` branch to `JavaScirpt` tab, it should work fine.


## The branches:

I make it several steps branches to easily going through:

1. `step-1` branch is to till course 19.
2. `step-2` branch is from 19-20
...
3. branch `step-6` is the final:
  work through all 30 tutorials, it works fine in jsbin.


### 7. branch `step-7`:
  Add babel, webpack to generate a bundle.js, to make it works as an app.


the main entry: todoApp.js
currently: todoApp.js === step-7.js, the complete implementation of todoApp.


### 8. branch `step-8`:
  brand new version:  step-8: different from step-7. out of original todos. add step-8.js to test redux. it basically works.

### 9. branch `step-9`

a simple App for CRUD: list fake-people on the fly.

- sorting People  (mapDispatchToProps)
- pagination      (mapDispatchToProps)
- add Person      (mapDispatchToProps)
- delete Person   (dispatch)
- load People     (mapDispatchToProps)

- faker.js to generate JSON.
- bootstrap table style.
- lodash to sort.

It works properly. Good Stuff.

npm install redux-devtools

### 10. branch `main`

- merge individual branches together by adding `tabs`
- `npm install -S webpack-dev-server` so all-inclusive
  to start the app, just run `./node_modules/.bin/webpack-dev-server `
- `npm install -D eslint` for syntax checking

ReactiveX, RxJs example.

```bash
  npm i -S rxjs@5
```


### More steps on `main` branch

- create src/ folder, put the .js into, easily search and manage.
- react-router vs. react-router-dom: https://reacttraining.com/react-router/web/guides/quick-start
- redux-form
- add tictactoe, 2 issues:
  (1) wrong route: <Route path='/ttt' comment={TicTacToeApp}/>, no warning, I spent much time to correct `comment` to `component`
  (2) copy from original repository, only 1 place to change: reducer. notice instead of createStore(reducer), `reducer` now
    is a {...} instead of 1 function. 


## Advantage

1. only 1 js file - all inclusive: todoApp.js
2. this could be the mini-structure of a react-redux app.
3. default URL: http://localhost:8080/
4. use `webpack-dev-server` to start
5. .babelrc and webpack.config.js all needed.
6. plugin `transform-object-rest-spread` is for {...state}

7. add more steps for easy usage:
- step-1: simple counter with `subscribe` and no component.
- step-2: simple counter with component


## Reference:

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://redux-observable.js.org/
- http://reactivex.io/rxjs/manual/tutorial.html#react
- http://redux-form.com/6.6.2/

