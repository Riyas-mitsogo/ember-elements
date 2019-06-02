
import Component from '@ember/component';
// @ts-ignore: Ignore import of compiled template
import template from './template';
import Ember from 'ember';
import { set, action, computed, get } from '@ember/object';
import * as Classes from '../../-private/common/classes';
import { readOnly } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
export default class MultiSelect extends Component {
  layout = template;
  tagName = 'span';
  classNameBindings = [`INPUT`, `TAG_INPUT`, `open:${Classes.POPOVER_OPEN}`];
  attributeBindings = [`inlineStyle:style`];

  @readOnly('open') Open!: boolean;

  @computed('style')
  get inlineStyle() {
    return htmlSafe(this.style);
  }

  open = false;
  _popperTarget: any;
  ESC: number = 27;
  selectedKey: number = -1;
  selected: any;
  selectedItem: any;
  classNameAssigned: string = `${Classes.TEXT_OVERFLOW_ELLIPSIS} ${Classes.FILL}`;
  select: any[] = this.selected || [];
  isDBrequired!: boolean;

  tagInput: string = Classes.TAG_INPUT_VALUES;
  INPUT_GHOST: string = Classes.INPUT_GHOST;
  BUTTON: string = Classes.BUTTON;
  MINIMAL: string = Classes.MINIMAL;
  TRANSITION_CONTAINER: string = Classes.TRANSITION_CONTAINER;
  POPOVER: string = Classes.POPOVER;
  POPOVER_CONTENT: string = Classes.POPOVER_CONTENT;
  POPOVER_DISMISS: string = Classes.POPOVER_DISMISS;
  MENU: string = Classes.MENU;
  MENU_ITEM: string = Classes.MENU_ITEM;
  TEXT_OVERFLOW_ELLIPSIS: string = Classes.TEXT_OVERFLOW_ELLIPSIS;
  TAG: string = Classes.TAG;
  FILL: string = Classes.FILL;
  INPUT = Classes.INPUT;
  TAG_INPUT = Classes.TAG_INPUT;

  placement: string = get(this, 'placement') == undefined ? 'bottom' : get(this, 'placement');
  popperClass: string = 'popper';
  popOverArrow!: boolean;
  minimalPopover: boolean = false;
  defaultSelected: string = '';
  filteredList: any[] = [];
  isDefaultOpen!: boolean;
  popperContainerId!: string;
  data: any;
  style?: any;

  onSelect!: (item: object[]) => void;
  onDelete!: (item: object[]) => void;

  init() {
    super.init();
    this._closeOnClickOut = this._closeOnClickOut.bind(this);
    this._closeOnEsc = this._closeOnEsc.bind(this);
  }

  didInsertElement() {
    set(this, '_popperTarget', this.element);
    set(this, 'popperContainerId', this.elementId + "popper-container");
  }

  async didReceiveAttrs() {
    this.set('select', this.selected || []);
    if (this.get('isDBrequired'))
      this.set('isDBrequired', true);
    else
      this.set('isDBrequired', false);
    await set(this, '_popperTarget', this.element);
    this.set('filteredList', this.get('data'));
    if (this.get('isDefaultOpen')) {
      this.set('open', this.get('isDefaultOpen'));
      this.addToFilterList();
    }
    if (this.get('minimalPopover')) {
      this.set('popOverArrow', false);
      this.set('popperClass', 'popper');
    }
    else {
      this.set('popperClass', 'popper popper-arrow-active');
      this.set('popOverArrow', true);
    }
  }


  didRender() {
    Ember.run.next(this, this.detachClickHandler);
  }

  @action
  close() {
    this._close();
  }

  @action
  async togglePopover() {
    await this.addToFilterList();
    await this.toggleProperty('open');
  }

  async  addToFilterList() {
    let data: [] = JSON.parse(JSON.stringify(this.get('data') || []));
    let arr = [];
    if (this.get('select')) {
      for (let index = 0; index < data.length; index++) {
        const element: any = data[index];
        let isfind = await this.get('select').find((data: any) => {
          return data == element
        });
        if (!isfind) {
          arr.push(element);
        }
      }
      this.set('filteredList', arr);
    }
  }

  @action
  async onMouseSelect(data: any) {
    await this.set('open', false);
    Ember.A(this.select);
    Ember.A(this.filteredList);
    if (this.select && this.select.filter(e => e === data).length > 0) {
      (this.get('select') as any).removeObject(data); // not found type for removeObject
      (this.get('filteredList') as any).pushObject(data);
    }
    else {
      (this.get('select') as any).pushObject(data);
      (this.get('filteredList') as any).removeObject(data);
    }
    this.send('onSelected');
    this.set('open', true);
  }

  @action
  delete(value: string, index: any) {
    value = value;
    Ember.A(this.get('select'));
    if (index != null) {
      let removeObj = this.get('select')[index];
      (this.get('select') as any).removeObject(removeObj);
    } else {
      this.set('select', []);
    }
    var arr = JSON.parse(JSON.stringify(this.get('data') || []));
    Ember.A(arr);
    this.get('select').forEach((element) => {
      arr.removeObject(element);
    })
    this.set('filteredList', arr);
    this.send('onSelected');
  }

  @action
  onSelected() {

    if (this.get('onSelect'))
      this.get('onSelect')(this.select);
    if (this.get('onDelete'))
      this.get('onDelete')(this.select);
  }

  @action
  onActive() {
    let container: any = document.querySelector(`.${this.TRANSITION_CONTAINER}`);

    if (this.filteredList.length && container) {
      let list: any[] = container.querySelectorAll(`.${this.POPOVER_CONTENT} ul li`);
      list.forEach(element => {
        element.querySelector('a').className = `${this.MENU_ITEM} ${this.POPOVER_DISMISS}`;
      });
      list[this.selectedKey].querySelector('a').className += ' ' + Classes.ACTIVE;
    }
  }

  @action
  async handleKeydown(e: any) {
    this.set('open', true);
    let element = this.get('element').querySelectorAll(`.${Classes.TAG_INPUT_VALUES} .${this.TAG}`);
    let textbox: any = this.get('element').querySelector('input');
    if (e.keyCode === 8) {
      if (this.selectedItem > -1 && textbox.value.length == 0) {
        if (this.selectedItem == null) this.selectedItem = element.length - 1;
        else {
          this.send('delete', '', this.selectedItem);
          await this.set('open', false);
          if (this.selectedItem > 0)
            this.selectedItem--;
          this.set('open', true);

        }
      }
    } else if (e.keyCode === 37) {
      if (this.selectedItem == null) this.selectedItem = element.length - 1;
      else if (this.selectedItem > 0)
        this.selectedItem--;
    }
    else if (e.keyCode === 39) {
      if (this.selectedItem == null) this.selectedItem = 0;
      else if (this.selectedItem < element.length - 1)
        this.selectedItem++;
    }
    if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 8) {
      if (this.selectedItem > -1 && textbox.value.length == 0) {
        element.forEach((item) => {
          if (item.className) {
            if (item.className.search(Classes.ACTIVE))
              item.className = item.className.replace(Classes.ACTIVE, '');
          }
        });
        element[this.selectedItem].className += ' ' + Classes.ACTIVE;
      }
    }
    if (e.keyCode === 40 || e.keyCode === 38) {
      let container: any = document.querySelector(`.${this.TRANSITION_CONTAINER}`);
      if (this.filteredList.length && container) {
        let scrollContainer = container.querySelector('ul');
        let list = container.querySelectorAll(`.${this.POPOVER_CONTENT} ul li`);
        if (e.keyCode === 40) {
          if (this.selectedKey < list.length - 1)
            this.selectedKey++;
          if (container.getBoundingClientRect().bottom <= list[this.selectedKey].querySelector('a').getBoundingClientRect().bottom)
            scrollContainer.scrollTop += 30;
        } else if (e.keyCode === 38) {
          if (this.selectedKey > 0)
            this.selectedKey--;
          if (container.getBoundingClientRect().top - 40 <= list[this.selectedKey].querySelector('a').getBoundingClientRect().top - 40)
            scrollContainer.scrollTop -= 30;
        }
        this.send('onActive');
      }
    } else if (e.keyCode === 13) {

      Ember.A(this.select);
      Ember.A(this.filteredList);
      if (this.get('select').includes(this.filteredList[this.selectedKey])) {
        (this.get('select') as any).removeObject(this.filteredList[this.selectedKey]);
        (this.get('filteredList') as any).pushObject(this.filteredList[this.selectedKey]);
      }
      else {
        if (this.filteredList[this.selectedKey]) {
          (this.get('select') as any).pushObject(this.filteredList[this.selectedKey]);
          (this.get('filteredList') as any).removeObject(this.filteredList[this.selectedKey]);
        }
      }
      this.set('selectedKey', 0);
      this.send('onActive');
      await this.set('open', false);
      this.send('onSelected');
      this.set('open', true);

    }
  }

  @action
  onSearchElement(e: any) { //search value
    let keys: Array<Number> = [37, 38, 39, 40, 13];
    Ember.A(this.get('data'));
    let element: any = this.element;
    let keyword = element.querySelector('input').value;
    if (!keys.includes(e.keyCode)) {
      var temp = JSON.parse(JSON.stringify(this.get('data') || []));
      Ember.A(temp);
      this.get('select').forEach((element) => {
        temp.removeObject(element);
      })
      let arr = [];
      for (var i = 0; i < temp.length; i++) {
        let txt = temp[i];
        if (txt.substring(0, keyword.length).toLowerCase() !== keyword.toLowerCase() && keyword.trim() !== '') {
        } else {
          this.selectedKey = -1;
          arr.push(txt);
        }
      }
      this.set('filteredList', arr);
    }
  }

  detachClickHandler() {
    const method = this.get('open') ? 'on' : 'off';
    if (method == 'on') {
      window.addEventListener('click', this._closeOnClickOut);
      window.addEventListener('keyup', this._closeOnEsc);
    }
    else {
      window.removeEventListener('click', this._closeOnClickOut);
      window.removeEventListener('keyup', this._closeOnEsc);
    }
  }
  _closeOnClickOut(e: any) {

    if (e.target.className != `${Classes.MENU_ITEM} ${this.POPOVER_DISMISS}` && e.target.className != this.classNameAssigned) { this._close(); }
  }
  _closeOnEsc(e: any) {
    if (e.keyCode === this.ESC) { this._close(); }
  }
  _close() {
    if (this.isDestroyed || this.isDestroying)
      return;
    set(this, 'open', false);
  }


};


