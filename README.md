# Canvas Web App for React-Node-MySQL(Blue Sky)

This is a fully working canvas for a React Web App with the following characteristics:

* Based on [create-react-app](https://github.com/facebookincubator/create-react-app)
* Node/Express backend
* MySQL connection
* [Redux](https://redux.js.org) pattern for handling application-state
* [ReactRouter](https://github.com/ReactTraining/react-router) for handling routes
* [Reactstrap](https://reactstrap.github.io) for UI
* [Redux-Saga](https://github.com/redux-saga/redux-saga) for asynchronous tasks

<p align="center">
<img src="https://github.com/bcbi/Canvas-React-Node-MySQL/blob/master/screen-shot.png" width="350">
</p>

## Getting this App up and running

1. First of all [Install or update NVM and Node](#install-or-update-nvm-and-node) (if you haven't done so)

2. Clone this repository:

 ```
 git clone https://github.com/bcbi/Canvas-React-Node-MySQL.git MyWebApp
 ```

3. Set up testing database

 In the terminal log in as root and used the sample.sql file included in this repo
 ```
 mysql -u root
 mysql> source sample.sql;
 ```
 
 At this point you can test the actual connection to the database.
 ```
 mysql> use books;
 mysql> show tables;
 ```
 You should get:
 ```
 +-----------------+
 | Tables_in_books |
 +-----------------+
 | authors         |
 +-----------------+
 1 row in set (0.00 sec)
 ```

4. Install server and client packages
 ```
 cd YOUR_PATH/MyWebApp
 npm install
 cd client
 npm install
 ```

5. Start both server and client
 ```
 cd YOUR_PATH/MyWebApp
 npm start
 ```
 The last lines of the output should be
 ```
 Starting the development server... 

 Compiled successfully!

 The app is running at:

   http://localhost:3000/

 Note that the development build is not optimized.
 To create a production build, use npm run build.
 ```
 You can now point your browser to http://localhost:3000/!


If you are interested on re-creating this app from scratch, [we've documented most of the steps](#starting-from-scratch).
This app was initially based on [this great blog post](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and their [repository](https://github.com/fullstackreact/food-lookup-demo). It may be a good idea to follow that post first, before tackling ours -  which adds more features e.g., redux, sagas, routes...

## Install or update NVM and Node

#### NVM

I used homebrew - althrough not officially supported. But I have not yet run into any issues

```
brew update
brew install nvm
source $(brew --prefix nvm)/nvm.sh
```

Follow directions on screen

```
You should create NVM's working directory if it doesn't exist:

  mkdir ~/.nvm

Add the following to ~/.bash_profile or your desired shell
configuration file:

  export NVM_DIR="$HOME/.nvm"
  . "$(brew --prefix nvm)/nvm.sh"

You can set $NVM_DIR to any location, but leaving it unchanged from
/usr/local/Cellar/nvm/0.32.0 will destroy any nvm-installed Node installations
upon upgrade/reinstall.
```

#### Node

```
nvm install node
```

Follow any recommendations on screen e.g

```
nvm use --delete-prefix v6.6.0
```


### If your enviroment is not up-to-date

* Possibly NVM

```
brew update
```

* Get latest npm

```
npm install -g npm@latest
```

* Update global npm packages

```
npm update -g
```

## Starting from scratch

## Create your App folder, init repo

```
mkdir MyWebApp
cd MyWebApp
git init
...(add readme, commit, set up origin, push)
```


### Set up the SERVER

* MyWebApp/server.js

The file is an example of what it may look like for a server that:
	* Serves at port 3001
	* Uses static index.html when in production mode
	* Connects to a MySQL pool (pools allow handles reconnecting)
	* Has a server-api that the client side can talk to

* MyWebApp/package.json

Contents where borrowed and slightly modified from [this file](https://github.com/fullstackreact/food-lookup-demo/blob/master/package.json).
Note: Our local copy depends on MySQL instead of SQLite

* MyWebApp/start-client.js

Contents where borrowed from [this file](https://github.com/fullstackreact/food-lookup-demo/blob/master/start-client.js)

### Test the SERVER

* Minimal testing

Within the top directory

```
npm install -s
npm run server
```

At this point you should see:

```
NODE_ENV:  undefined
Find the server at: http://localhost:3001/
```

* Testing the database

In the terminal log in as root and used the sample.sql file included in this repo

```
mysql -u root
mysql> source sample.sql
```

At this point you can test the actual connection to the database.

Start your server again:

```
npm run server
```

Then, submit a query to your db - from another terminal window:

```
curl localhost:3001/api/books?firstName=William | jq '.'
```

You should see

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    71  100    71    0     0   2257      0 --:--:-- --:--:-- --:--:--  2290
[
  {
    "last_name": "Shakespeare",
    "first_name": "William",
    "middle_name": null
  }
]
```
### Set up the CLIENT

That's what we use create-react-app for:

```
create-react-app client
```

#### Test the CLIENT (bare-bones):

```
cd client
npm start
```


### Connect CLIENT and SERVER

The server is ready to receive queries but at this moment, there are no requests sent from the client.
To do so, we create a client interface

    * client/Client.js

The main function in this file doing the query is

```
    function search(query) {
      return fetch(`/api/books?firstName=${query}`, {
        accept: 'application/json',
      }).then(checkStatus)
        .then(parseJSON);
      }
```

    * [Bootstrap Table](http://allenfang.github.io/react-bootstrap-table/start.html)

Install module:

```
npm install react-bootstrap-table --save
```

Add CSS to public/index.html (inside body)
```
<link rel="stylesheet" src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.css">
</link>
```

### Add the proxy

We need Webpack development server proxy our API requests to our API server
```
// Inside client/package.json
"proxy": "http://localhost:3001/",
```

### Add Bootstrap, React Router, Redux and Redux-Saga

For Bootstrap follow [this instructions](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-bootstrap)

We will

React-Router hadles routing in our single-page application on the client side

```
npm install --save react-router
npm install --save react-router-bootstrap
```

Redux handles our Application (global) state

```
npm install --save react-redux
```

Redux-Saga handles waiting for our asychronous calls (similar to promises)

```
npm install --save redux-saga
```
