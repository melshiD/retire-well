import { Router, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import type { Component } from 'solid-js';
import Layout from './components/Layout';

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const MyActivities = lazy(() => import('./pages/MyActivities'));
const Chat = lazy(() => import('./pages/Chat'));
const Profile = lazy(() => import('./pages/Profile'));

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/" component={Layout}>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/recommendations" component={Recommendations} />
        <Route path="/my-activities" component={MyActivities} />
        <Route path="/chat" component={Chat} />
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
  );
};

export default App;
