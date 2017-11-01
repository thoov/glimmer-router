import Component from '@glimmer/component';
import getRouter from '../../../utils/get-router';

export default class GlimmerRouter extends Component {
  linkTo() {
    return getRouter(this).transitionTo('/emails/compose');
  }

  linkToDynamic() {
    return getRouter(this).transitionTo('/emails/1234');
  }

  linkToDynamicFoo() {
    return getRouter(this).transitionTo('/emails/foo-bar-baz');
  }
}
