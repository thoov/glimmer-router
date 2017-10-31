import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';

const app = new App();

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

/* Define your routes */
app.defineRoutes([
  { path: '/', component: 'glimmer-router' },
  { path: '/emails', component: 'emails' },
  { path: '/emails/compose', component: 'emails/compose' }
]);

app.boot();