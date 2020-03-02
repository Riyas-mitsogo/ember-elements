import Component from '@glimmer/component';
import { action, set } from '@ember/object';

interface TestArgs {}

export default class Test extends Component<TestArgs> {
  popperTargetValue!: HTMLElement;
  propsObject = {
    active: true,
    large: true,
    fill: false,
    intent: 'primary',
    icon: 'calendar',
    rightIcon: 'add'
  };
  text = 'button';
  className = 'hii';
  propsValue = {
    className: 'hgh',
    intent: 'primary',
    icon: 'tick'
  };
  size = 100;
  calloutText = `The component is a simple wrapper around the CSS API that provides props for modifiers and optional title element. Any additional HTML props will be spread to the rendered `;
  elevationText = 'elevationText';
  elevation = 4;
  value = 0.4;
  options = [
    { value: 'a' },
    { value: 'b', className: 'foo' },
    { value: 'c', disabled: true },
    { label: 'Dog' }
  ];
  switchLabel = 'Privacy setting';
  textIG = 'hi';
  value1 =
    'asdfsdafasdfsdfsdfsdfsdfsdafasdfdsafasdfdsfadsfadsfdsfdsfdsfdsfsdfsdfdsfsdfsdfsd';
  tagText = 'hii';
  values = ['hii', 'hii2'];
  @action
  onClick() {
    set(this.propsObject, 'active', !this.propsObject.active);
    set(this.propsObject, 'intent', 'success');
    set(this, 'className', '123');
    set(this.propsValue, 'icon', 'add');
    set(this, 'elevation', 2);
    set(this, 'size', 200);
    set(this, 'value', 0.8);
    set(this, 'textIG', 'hii1212');
    set(this, 'valueNI', 'eee');
  }
  @action
  onKeyDown() {
    // console.log('onKeyDown');
  }
  @action
  onKeyUp() {
    // console.log('onKeyUp');
  }
  @action
  handleEnabledChange() {
    // console.log('hii');
  }

  @action
  handleChange(values: Array<string>) {
    // console.log(values);
    set(this, 'values', values);
  }

  //numeric input
  disabled = false;
  fill = false;
  large = false;
  leftIcon = '';
  allowNumericCharactersOnly = true;
  selectAllOnFocus = false;
  selectAllOnIncrement = false;
  min = 0;
  intent = 'none';
  max = 100;
  valueNI = '';
  buttonPosition = 'right';

  isOpen = false;
  keepChildrenMounted = false;
  collapseText = `[11:53:30] Finished 'typescript-bundle-blueprint' after 769 ms
    <br />
    [11:53:30] Starting 'typescript-typings-blueprint'...
    <br />
    [11:53:30] Finished 'typescript-typings-blueprint' after 198 ms
    <br />
    [11:53:30] write ./blueprint.css
    <br />
    [11:53:30] Finished 'sass-compile-blueprint' after 2.84 s`;
  show = 'Show';
  hide = 'Hide';
  build = 'build logs';
  @action
  onClickButton() {
    //mouse event action
    set(this, 'isOpen', !this.isOpen);
  }

  @action
  doFuction() {
    set(this, 'keepChildrenMounted', !this.keepChildrenMounted);
  }

  isOpenOverlay = false;
  hasBackdrop = true;
  autoFocus = true;
  enforceFocus = true;
  canEscapeKeyClose = true;
  usePortal = true;
  canOutsideClickClose = true;
  useTallContent = false;
  isOpenPopper = false;
  @action
  onOverlayToggle() {
    set(this, 'isOpenOverlay', !this.isOpenOverlay);
  }
  @action
  onOverlayToggle1() {
    set(this, 'isOpenPopper', !this.isOpenPopper);
  }

  @action
  onClose() {
    set(this, 'isOpenOverlay', false);
    set(this, 'isOpenPopper', false);
    set(this, 'isOpenDialog', !this.isOpenDialog);
  }

  @action
  handleClose() {
    set(this, 'isOpenOverlay', false);
    set(this, 'useTallContent', false);
  }
  @action
  focusButton() {
    (document.querySelector('.focus-button') as HTMLElement).focus();
  }
  @action
  toggleScrollButton() {
    set(this, 'useTallContent', !this.useTallContent);
  }
  @action
  onPropsChangeEvent(type: string) {
    if (type == 'autoFoucs') {
      set(this, 'autoFocus', !this.autoFocus);
    } else if (type == 'enforceFocus') {
      set(this, 'enforceFocus', !this.enforceFocus);
    } else if (type == 'usePortal') {
      set(this, 'usePortal', !this.usePortal);
    } else if (type == 'canOutsideClickClose') {
      set(this, 'canOutsideClickClose', !this.canOutsideClickClose);
    } else if (type == 'canEscapeKeyClose') {
      set(this, 'canEscapeKeyClose', !this.canEscapeKeyClose);
    } else if (type == 'hasBackdrop') {
      set(this, 'hasBackdrop', !this.hasBackdrop);
    }
  }

  isOpenDialog = false;
  @action
  onDialogToggle() {
    set(this, 'isOpenDialog', !this.isOpenDialog);
  }

  @action
  didInsertPopper(element: HTMLElement) {
    this.popperTargetValue = element;
  }
}
