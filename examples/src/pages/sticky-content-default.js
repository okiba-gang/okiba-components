import { qs } from '@okiba/dom'
import Component from '@okiba/component'
import StickyContent from '@okiba/sticky-content'
import EventManager from '@okiba/event-manager'

class StickyComponent extends StickyContent {
  constructor(args) {
    super(args)
    EventManager.on('scroll', () => this.update({ y: window.scrollY }))
  }
}

const app = new Component({
  el: qs('#app'),
  components: [
    {
      selector: '#sticky',
      type: StickyComponent
    }
  ]
})