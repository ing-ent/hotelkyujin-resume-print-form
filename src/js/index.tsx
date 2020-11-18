import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import "core-js/stable";
import "regenerator-runtime/runtime";
import 'isomorphic-fetch';
import * as React from 'react';
import { render } from 'react-dom';
// @ts-ignore
import Root from './Containers/Root';

render(<Root />, (document.getElementById('root')));