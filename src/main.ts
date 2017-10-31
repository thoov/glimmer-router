import Application from '@glimmer/application';
import Resolver, { BasicModuleRegistry } from '@glimmer/resolver';
import moduleMap from '../config/module-map';
import resolverConfiguration from '../config/resolver-configuration';
import Router from './utils/router';

export default class App extends Application {
  constructor() {
    let moduleRegistry = new BasicModuleRegistry(moduleMap);
    let resolver = new Resolver(resolverConfiguration, moduleRegistry);

    const old = resolver.identify;
    resolver.identify = function(i, s) {
      if (i.includes('template') && i.includes('/') && s.includes('-application')) {
        return `template:/glimmer-router/components/${i.split(':')[1]}`;
      }

      return old.call(resolver, ...arguments);
    }

    super({
      rootName: resolverConfiguration.app.rootName,
      resolver
    });
  }

  /* override boot method */
  boot() {
    Application.prototype.boot.call(this);

    if (this.router) {
      this.router.urlChangeHandler();
    } else {
      // todo support not having a router
    }
  }

  router: Router;
  defineRoutes(routes) {
    if (!this.router) {
      this.router = new Router(this);
    }

    routes.forEach(route => {
      this.router.add({ path: route.path, handler: () => route.component });
    });
  }
}
