import Component from '@glimmer/component';
import getRouter from '../../../../utils/get-router';

export default class GlimmerRouter extends Component {
  get id() {
    return getRouter(this).params().id;
  }
}
