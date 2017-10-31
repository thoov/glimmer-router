import Component from '@glimmer/component';

export default class GlimmerRouter extends Component {
  next() {
    window.history.pushState({}, "page 2", "/emails/compose");
  }
}
