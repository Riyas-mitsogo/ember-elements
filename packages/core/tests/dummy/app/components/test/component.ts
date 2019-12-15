import Component from '@glimmer/component';
import { action, set } from '@ember/object';

interface TestArgs {}

export default class Test extends Component<TestArgs> {
  propsObject = {
    active: true,
    large: true,
    fill: false,
    intent: 'primary',
    icon: 'calendar',
    rightIcon: 'add',
  };
  text = 'button';
  className = 'hii';
  propsValue = {
    className: 'hgh',
    intent: 'primary',
    icon: 'tick',
  };
  calloutText = `The component is a simple wrapper around the CSS API that provides props for modifiers and optional title element. Any additional HTML props will be spread to the rendered `;
  @action
  onClick() {
    set(this.propsObject, 'active', !this.propsObject.active);
    set(this.propsObject, 'intent', 'success');
    set(this, 'className', '123');
    set(this.propsValue, 'icon', 'add');
  }
  @action
  onKeyDown() {
    // console.log('onKeyDown');
  }
  @action
  onKeyUp() {
    // console.log('onKeyUp');
  }
}
