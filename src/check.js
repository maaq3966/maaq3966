import React, { useEffect } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from './actions/userActions.js';
import { history } from './history/index.js';
import Loading from "react-fullscreen-loading";
import { store } from './store/index.js';
import { useIdleTimer } from 'react-idle-timer';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

const detectBrowserLanguage = require('detect-browser-language');
const rtlDetect = require('rtl-detect');

const Layout = React.lazy(() => import('./containers/Layout'));
const Login = React.lazy(() => import('./modules/Authentication/Login'));
const Register = React.lazy(() => import('./modules/Authentication/Register'));
const ForgetPassword = React.lazy(() => import('./modules/Authentication/ForgetPassword'));
const ResetPassword = React.lazy(() => import('./modules/Authentication/ResetPassword'));
const TokenExpired = React.lazy(() => import('./modules/Authentication/TokenExpired'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const DeleteAccount = React.lazy(() => import('./components/DeleteAccount'));
const Dashboard = React.lazy(() => import('./modules/Dashboard/Dashboard'));
const Account = React.lazy(() => import('./modules/User/Account'));
const CaseDetail = React.lazy(() => import('./modules/Case/CaseDetail'));
const CaseListing = React.lazy(() => import('./modules/Case/CaseListing'));
const TagListing = React.lazy(() => import('./modules/Tag/TagListing'));
const ShareCaseHandler = React.lazy(() => import('./modules/Case/ShareCaseHandler'));
const Settings = React.lazy(() => import('./modules/Settings/Settings'));
const CaseHistory = React.lazy(() => import('./modules/Case/CaseHistory'));
const SourceLisiting = React.lazy(() => import('./modules/Source/SourceListing'));
const AddSource = React.lazy(() => import('./modules/Source/AddSource'));
const SourceDetail = React.lazy(() => import('./modules/Source/SourceDetail'));

const IssueReports = React.lazy(() => import('./modules/Authentication/IssueReports'));

const loading = (
  <div className="pt-3 text-center">
      <Loading loading={true} background={'rgba(255,255,255, 0.9)'} loaderColor="#5E81F4" />
  </div>
);

// Loading system supported languages
const availableLanguages = ['en-US', 'ur-PK', 'ja', 'en', 'ko', 'ar', 'cn', 'es', 'de', 'fr', 'he'];

// Loading icons to fontawesome
library.add(fas);

function App(props) {

  const cookies = new Cookies();
  const state = store.getState();
  const loggedIn = state.authentication.loggedIn;
  const { i18n } = useTranslation();

  const handleOnActive = (event) => {
    if (getRemainingTime() === 0) {
      props.logout()
    }
  }

  const handleOnIdle = (event) => {
    // console.log('user is idle')
    // console.log('last active', getLastActiveTime());
  }

  const handleOnAction = (event) => {
    // console.log('user did something', event);
  }

  const { getRemainingTime, getLastActiveTime, reset } = useIdleTimer({
    timeout: cookies.get('sessionTime') || 3600000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 10,
    crossTab: {
      emitOnAllTabs: true
    }
  });

  useEffect(() => {
    console.log('User language :', detectBrowserLanguage());
    console.log('Lang direction :', rtlDetect.isRtlLang(detectBrowserLanguage()));

    localStorage.setItem('user-lang', detectBrowserLanguage())
    setUserLanguage(detectBrowserLanguage());
    handleConnectionChange();

    if (loggedIn) {
      reset();
      setApplicationAppearance();
      
      if (props.user && props.user.lang) {
        setUserLanguage(props.user.lang);
      }

    } else {
      setApplicationAppearnceAccordingToSystem();
    }

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    }
  }, []);

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    console.log('Internet connection :', condition);

    props.setUserInternetConnectionState(condition);
  }

  const setUserLanguage = (lang)
 => {
    if (availableLanguages.includes(lang)) {
      i18n.changeLanguage(lang)
;
      localStorage.setItem('user-lang', lang);
      const body = document.body;
  
      if (rtlDetect.isRtlLang(lang)) {
        body.classList.add("rtl");
      } else {
        body.classList.remove("rtl");
      }
    }
  }

  const setApplicationAppearnceAccordingToSystem = () => {
    if (checkSystemDarkMode()) {
      document.body.classList.add('darkmode');
    } else {
      document.body.classList.remove('darkmode');
    }
  }

  const setApplicationAppearance = () => {
    const darkMode = parseInt(props.user.Setting.dark_mode);

    if (darkMode === 1) {
        if (checkSystemDarkMode()) {
            document.body.classList.add('darkmode');
        } else {
            document.body.classList.remove('darkmode');
        }
    } else if (darkMode === 2) {
        document.body.classList.add('darkmode');
    } else {
        document.body.classList.remove('darkmode');
    }
  }

  const checkSystemDarkMode = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
    }

    return false;
  }

  return (
    <Router history={history}>
      <React.Suspense fallback={loading}>
        <Switch>
          <PublicRoute exact path='/login' name="Login Page" component={<Login {...props}/>} />
          <PublicRoute exact path='/register' name="Register Page" component={<Register {...props}/>} />
          <PublicRoute exact path='/forget-password' name="Forget Password" component={<ForgetPassword {...props}/>} />
          <PublicRoute exact path='/reset-password/:token' name="Reset Password" component={<ResetPassword {...props}/>} />
          <PublicRoute exact path='/token-expired' name="URL expired" component={<TokenExpired {...props}/>} />
          <PublicRoute exact path='/404' name="Page Not Found" component={<NotFound {...props}/>} />
          <PublicRoute exact path='/issue-report' name="Issue Report" component={<IssueReports {...props}/>} />

          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/cases' component={CaseListing} />
          <PrivateRoute path='/case/detail/:id' component={CaseDetail} />
          <PrivateRoute path='/case/share/:id' component={ShareCaseHandler} />
          <PrivateRoute path='/account' component={Account} />
          <PrivateRoute path='/settings' component={Settings} />
          <PrivateRoute path='/case/:id/history' component={CaseHistory} />
          <PrivateRoute path='/tags' component={TagListing} />
          <PrivateRoute path='/account-deleted' component={DeleteAccount} />
          <PrivateRoute path='/sources' component={SourceLisiting} />
          <PrivateRoute path='/source/add' component={AddSource} />
          <PrivateRoute path='/source/detail/:id/:type' component={SourceDetail} />
          
          <Redirect exact from="/" to={{ pathname: '/login', state: { from: props.location } }} /> 
          <Route path="*" name="Not Found" component={NotFound} />
        </Switch> 
      </React.Suspense>
    </Router>
  );
}

function PublicRoute ({component: Component, ...rest}) {
  const state = store.getState();
  const final = state.authentication.loggedIn;
  var isAuthenticated = false;

  if (final) {
    isAuthenticated = true
  }

  return (
    <Route
      {...rest}
      render={(props) => !isAuthenticated
        ? Component
        : <Redirect to={{pathname: '/dashboard', state: {from: props.location}}} />}
    />
  )
}

function PrivateRoute ({component: Component, authed, ...rest}) {-
  const token = localStorage.getItem('token');
  const state = store.getState();
  const isUserLoggedIn = state.authentication.loggedIn;
  const isUserAccountDeactivated = state.authentication.user ? state.authentication.user.deleted_at : null;
  const userSubscription = state.authentication.user ? state.authentication.user.subscription.allowAccess : false;

  var isAuthenticated = false;

  if (isUserLoggedIn) {
    isAuthenticated = true
  }

  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated
        ? isUserAccountDeactivated ? props.location.pathname == '/account-deleted' ? <DeleteAccount {...props} /> : <Redirect to={{pathname: '/account-deleted', state: {from: props.location}}} />
        : !userSubscription ? props.location.pathname == '/account' ? <Layout {...props} componentToShow={Account}/> : <Redirect to={{pathname: '/account', state: {from: props.location}}} /> 
        : <Layout {...props} componentToShow={Component}/>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const actionCreators = {
  logout: userActions.logout,
  setUserInternetConnectionState: userActions.setUserInternetConnectionState
};

export default connect(mapState, actionCreators)(App);