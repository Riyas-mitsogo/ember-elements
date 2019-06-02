import Controller from '@ember/controller';
import { action } from '@ember/object';


export default class DocsCoreTabs extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  animate: boolean = false;
  vertical: boolean = false;
  heading: string = "Home";
  renderActiveTabPanelOnly: boolean = false;
  @action
  onAnimate() {
    this.set('animate', !this.animate);
  }
  @action
  onVertical() {
    this.set('vertical', !this.vertical);
  }
  @action
  onActivePanel() {
    this.set('renderActiveTabPanelOnly', !this.renderActiveTabPanelOnly);
  }
  @action
  onChange(newTabIndex: number) {
    if (newTabIndex == 1)
      this.set('heading', "Home");
    else if (newTabIndex == 2)
      this.set('heading', "Files");
    else
      this.set('heading', "Builds");



  }


  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'docs/core/tabs': DocsCoreTabs;
  }
}
