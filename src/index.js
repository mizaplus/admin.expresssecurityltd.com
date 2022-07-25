//Importing helper functions
import React from "react";
import ReactDOM from "react-dom";

//Importing styles
import "./index.css";
import "./icofont/icofont.min.css";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.min.css";
import "react-activity/dist/Dots.css";

//Importing Redux setup
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reducer from "./store/Reducer/Reducer";
import thunk from "redux-thunk";
import config from "./aws-exports";

//Importing aws-amplify setup
import { Amplify } from "aws-amplify";

//Importing core components
import Root from "./App";

Amplify.configure(config);

const composeEnhancers = composeWithDevTools({
  name: `WDN Admin`,
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
