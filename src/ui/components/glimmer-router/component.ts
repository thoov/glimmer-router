import Component from '@glimmer/component';
import getRouter from '../../../utils/get-router';

export default class GlimmerRouter extends Component {
  linkTo() {
    getRouter(this).transitionTo('/emails');
  }
}
