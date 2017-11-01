import RouteRecognizer from 'route-recognizer';
import Application from '@glimmer/application';

function highjack(type) {
  const original = history[type];
  return function () {
    const returnValue = original.apply(this, arguments);
    window.dispatchEvent(new Event(type));
    return returnValue;
  };
};

export default class Router {
  app: Application;
  router: RouteRecognizer;

  constructor(app) {
    this.app = app;
    this.router = new RouteRecognizer();

    history.pushState = highjack('pushState'); // TODO: add replaceState
    window.onpopstate = () => this.urlChangeHandler.call(this);
    window.addEventListener('pushState', () => this.urlChangeHandler.call(this));
  }

  add(route) {
    this.router.add([route]);
  }

  urlChangeHandler() {
    const pathname = window.location.pathname;
    const results = this.router.recognize(pathname);
    const yieldSections = document.querySelectorAll('[data-outlet]');
    const componentName = results[0].handler();
    const nestedLevel = window.location.pathname.substr(1).split('/');
    const containerElement = (yieldSections.length > 0 && pathname !== '/') ? yieldSections[nestedLevel.length - 1] : document.getElementById('app');
    containerElement.innerHTML = '';

    this.app.renderComponent(componentName, containerElement, null);
  }

  transitionTo(pathname: string, state = {}) {
    const results = this.router.recognize(pathname);
    state = Object.assign({}, state, results[0].params);
    window.history.pushState(state, '', pathname);
  }

  params() {
    return window.history.state;
  }
}