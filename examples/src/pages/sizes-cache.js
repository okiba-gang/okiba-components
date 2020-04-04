import { qs } from '@okiba/core/dom'
import Component from '@okiba/core/component'
import SizesCache from '@okiba/sizes-cache'
import EventManager from '@okiba/event-manager'

class ResizeComponent extends Component {
  constructor({ el }) {
    super({ el })
    this.sizes = SizesCache.get(this.el)
    EventManager.on('resize', this.onResize)
    this.onResize()
  }

  onResize = () => {
    this.el.innerHTML = `width: ${this.sizes.width}px<br>height: ${this.sizes.height}px`
  }
}

const app = new Component({
  el: qs('#app'),
  components: [
    {
      selector: '#resize',
      type: ResizeComponent
    }
  ]
})
