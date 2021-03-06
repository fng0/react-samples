"use strict";

import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import {Router, browserHistory} from "react-router"
import {syncHistoryWithStore} from "react-router-redux"
import configureStore from "./store/configureStore"
import routes from "./routes"

const jsonString = document.getElementById("initial-state").getAttribute("data-json");
const store = configureStore(browserHistory, JSON.parse(jsonString));
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
