import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LoginForm from './LoginForm';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <LoginForm />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
