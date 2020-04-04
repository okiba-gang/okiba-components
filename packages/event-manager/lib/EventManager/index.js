/**
 * @module EventManager
 * @package event-manager
 * @description A singleton to manage centralized event listeners
 */

import EventEmitter from '@okiba/core/event-emitter'
import { EventHandler } from '../handlers'

/**
 * The global event emitter
 * @type {EventEmitter}
 * @private
 */
const emitter = new EventEmitter()

/**
 * The collection of global events handlers
 * @type {Object}
 * @private
 */
const handlers = {}

/**
 * Handles global event subscription
 * @private
 * @param {Object} config The event handling configuration
 *  @schema
 *  {
 *    handler: EventHandler (default) or an extension of it (must implement subscribe/unsubscribe interface)
 *    type: The (native) event type to be listened
 *    alias: The global event type (native event type as default)
 *    target: The (native) event target
 *    debounce: The callback debounce time
 *    payloadFilter: A function to manipulate event data before passing it to the event callback
 *  }
 * @param {Boolean} quiet If true, suppresses logs
 */
function subscribe({ handler: Handler = EventHandler, type, alias = type, ...config }, quiet) {
  if (handlers.hasOwnProperty(alias)) {
    !quiet && console.warn(`[EventManager error]: a global event "${alias}" has been already subscribed. Skipping...`)
    return
  }

  handlers[alias] = new Handler({
    ...config,
    type,
    alias,
    dispatch: (alias, payload) => emitter.emit(alias, payload)
  })

  if (emitter.hasListeners(type)) {
    handlers[alias].listen()
  }
}

/**
 * Removes a global event
 * @private
 * @param {String} types The event (alias) to be removed from global events
 */
function unsubscribe(type) {
  if (!handlers.hasOwnProperty(type)) return

  if (handlers[type].listening) {
    handlers[type].unlisten()
  }

  delete handlers[type]
}

class EventManager {
  /**
   * Global events list getter
   */
  static get subscribedEvents() {
    return Object.keys(handlers)
  }

  /**
   * Checks if global event has registered callbacks
   * @param {String} type The event type
   */
  static hasListeners(type) {
    return !!emitter.hs[type] && !!emitter.hs[type].length
  }

  /**
   * Adds a global event(s)
   * @param {Object|Object[]} config Event(s) configuration(s)
   */
  static subscribe(config) {
    if (Array.isArray(config)) {
      config.forEach(entry => subscribe(entry))
      return
    }

    subscribe(config)
  }

  /**
   * Removes a global event
   * @param {String|String[]} types The event(s) to be removed
   */
  static unsubscribe(type) {
    if (Array.isArray(type)) {
      type.forEach(entry => unsubscribe(entry))
      return
    }

    unsubscribe(type)
  }

  /**
   * Updates an existing global event
   * @param {String} type The event to be removed
   * @param {Object|Object[]} config Event(s) configuration(s)
   */
  static update(type, config) {
    EventManager.unsubscribe(type)
    EventManager.subscribe(config)
  }

  /**
   * Adds a global event listener
   * @param {String} type The event type
   * @param {Function} callback The event callback
   */
  static on(type, callback) {
    emitter.on(type, callback)

    if (handlers.hasOwnProperty(type) && !handlers[type].listening) {
      handlers[type].listen()
    }
  }

  /**
   * Removes a global event listener
   * @param {String} type The event type
   * @param {Function} callback The event callback
   */
  static off(type, callback) {
    emitter.off(type, callback)

    if (handlers.hasOwnProperty(type) && handlers[type].listening) {
      handlers[type].unlisten()
    }
  }

  /**
   * Proxies event dispatching
   * @param {String} type The event type
   * @param {*} payload The event payload
   */
  static emit(type, payload) {
    if (!handlers.hasOwnProperty(type)) return

    emitter.emit(type, payload)
  }

  /**
   * Clears all registered callbacks
   * @param {Array} events The global events to clear
   */
  static clear(events = EventManager.subscribedEvents) {
    if (!Array.isArray(events)) return

    events.forEach(type => {
      if (!emitter.hs[type]) return
      emitter.hs[type].clear()
    })
  }

  /**
   * Destroys all listeners, callbacks and handlers
   * @param {Array} events The global events to destroy
   */
  static destroy(events = EventManager.subscribedEvents) {
    EventManager.clear(events)
    EventManager.unsubscribe(events)
  }
}

export default EventManager
