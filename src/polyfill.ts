import 'whatwg-fetch';

// @ts-ignore
import smoothscroll from 'smoothscroll-polyfill';

// @ts-ignore
if (!window._babelPolyfill) {
    require('babel-polyfill');
}

smoothscroll.polyfill();
