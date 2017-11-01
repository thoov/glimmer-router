# Glimmer Router

This project is currently just a thought experiment and should be considered early alpha. This
approach currently requires some hacks in order to work.

## How to Install

Currently a WIP.

## Setup

In `src/index.ts` you define your routes by calling `app.defineRoutes()` like so:

```ts
app.defineRoutes([
  { path: '/', component: 'glimmer-router' },
  { path: '/emails', component: 'emails' },
  { path: '/emails/compose', component: 'emails/compose' },
  { path: '/emails/:id', component: 'emails/view' }
]);
```

## Usage

In order for you to start transitioning you must do two things. First, you must define where you want components to render into by defining an element with a `data-outlet` property.

```hbs
<h1>Hi, I'm the parent component</h1>

<a onclick={{action linkTo}}>Link-To Child Route</a>

<section data-outlet="glimmer-router"></section>
```

Note the name you give does not matter right now but in the future could be used similar to named outlets. Next, you call transitionTo off of the router by passing in the path where you want to transition to. The component you have defined for this path (in app.defineRoutes) will be rendered into this `data-outlet` element.

```ts
import Component from '@glimmer/component';

 // NOTE this will change to something absolute in the future
import getRouter from '../../../utils/get-router';

export default class GlimmerRouter extends Component {
  linkTo() {
    getRouter(this).transitionTo('/emails/1234');
  }
}
```

## Params

If your route has dynamic segments then you grab them off of the router via the `getRouter(this).params()` method. This is different from say how ember passes props into the route directly.

```ts
import Component from '@glimmer/component';
import getRouter from '../../../../utils/get-router';

export default class GlimmerRouter extends Component {
  get id() {
    return getRouter(this).params().id;
  }
}
```

## Example

Look within `/src` to see a simple nested routing example.

## Future

There are a lot of concepts and ideas that I do not have great solutions for at the moment. Mainly around a missing / lacking container system within glimmer. If you run into any issues or have ideas around different approaches I am all ears.