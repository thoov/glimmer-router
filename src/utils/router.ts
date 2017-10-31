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
    const yieldSections = document.getElementsByTagName('section');
    const componentName = results[0].handler();
    const nestedLevel = window.location.pathname.substr(1).split('/');

    const containerElement = (yieldSections.length > 0 && pathname !== '/') ? yieldSections[nestedLevel.length - 1] : document.getElementById('app')
    containerElement.innerHTML = '';

    console.log('Yield sections: ' + yieldSections.length);
    console.log('Nested level: ' + nestedLevel.length);

    // TODO: we will need to look at the results to determine if we need to remove a section

    this.app.renderComponent(componentName, containerElement, null);
  }

}