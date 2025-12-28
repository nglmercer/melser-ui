/**
 * Global State Manager for coordinating active states across components
 */

export type StateType = 'tab' | 'accordion' | 'nav-item';

export interface StateItem {
  id: string;
  type: StateType;
  groupId?: string;
  element: Element;
}

export interface StateChangeEvent extends CustomEvent {
  detail: {
    type: StateType;
    groupId?: string;
    activeId: string;
    previousId?: string;
  };
}

/**
 * Global singleton for managing active states across components
 */
class StateManager {
  private groups = new Map<string, Set<StateItem>>();
  private listeners = new Map<string, Set<(e: StateChangeEvent) => void>>();

  /**
   * Register a component with the state manager
   */
  register(item: StateItem) {
    const groupId = item.groupId || 'default';
    
    if (!this.groups.has(groupId)) {
      this.groups.set(groupId, new Set());
    }
    
    const group = this.groups.get(groupId)!;
    group.add(item);

    console.log(`StateManager: Registered ${item.type} with id '${item.id}' in group '${groupId}'`);
  }

  /**
   * Unregister a component from the state manager
   */
  unregister(item: StateItem) {
    const groupId = item.groupId || 'default';
    const group = this.groups.get(groupId);
    
    if (group) {
      group.delete(item);
      
      if (group.size === 0) {
        this.groups.delete(groupId);
      }
    }
  }

  /**
   * Set active state for a component
   * This will deactivate all other components in the same group
   */
  setActive(item: StateItem) {
    const groupId = item.groupId || 'default';
    const group = this.groups.get(groupId);
    
    if (group) {
      // Find the currently active item in this group
      let previousId: string | undefined;
      
      group.forEach(groupItem => {
        if (groupItem.id !== item.id) {
          // Deactivate other items in the same group
          this._updateItemState(groupItem, false);
        } else {
          previousId = (groupItem.element as any).active ? groupItem.id : undefined;
          // Activate the new item
          this._updateItemState(groupItem, true);
        }
      });

      // Dispatch global state change event
      const event = new CustomEvent('global-state-change', {
        detail: {
          type: item.type,
          groupId,
          activeId: item.id,
          previousId
        },
        bubbles: true,
        composed: true
      }) as StateChangeEvent;

      this._notifyListeners(event);
    }
  }

  /**
   * Update the visual state of an element
   */
  private _updateItemState(item: StateItem, active: boolean) {
    const element = item.element;

    if (item.type === 'tab' || item.type === 'accordion') {
      (element as any).active = active;
      (element as any).expanded = active;
    } else if (item.type === 'nav-item') {
      (element as any).active = active;
    }
  }

  /**
   * Listen to state changes for a specific type or group
   */
  onStateChange(callback: (e: StateChangeEvent) => void, options?: { type?: StateType; groupId?: string }): () => void {
    const listenerId = `listener-${Date.now()}-${Math.random()}`;
    
    const wrappedCallback = (e: StateChangeEvent) => {
      const { type, groupId } = e.detail;
      
      if (options?.type && type !== options.type) {
        return;
      }
      
      if (options?.groupId && groupId !== options.groupId) {
        return;
      }
      
      callback(e);
    };

    if (!this.listeners.has(listenerId)) {
      this.listeners.set(listenerId, new Set());
    }
    
    this.listeners.get(listenerId)!.add(wrappedCallback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(listenerId);
      if (listeners) {
        listeners.delete(wrappedCallback);
        if (listeners.size === 0) {
          this.listeners.delete(listenerId);
        }
      }
    };
  }

  /**
   * Notify all listeners of a state change
   */
  private _notifyListeners(event: StateChangeEvent) {
    this.listeners.forEach(listeners => {
      listeners.forEach(listener => listener(event));
    });
  }

  /**
   * Get all items in a group
   */
  getGroup(groupId: string = 'default'): StateItem[] {
    const group = this.groups.get(groupId);
    return group ? Array.from(group) : [];
  }

  /**
   * Get the active item in a group
   */
  getActiveItem(groupId: string = 'default'): StateItem | undefined {
    const group = this.getGroup(groupId);
    return group.find(item => {
      const el = item.element;
      return (item.type === 'tab' && (el as any).active) ||
             (item.type === 'accordion' && (el as any).expanded) ||
             (item.type === 'nav-item' && (el as any).active);
    });
  }

  /**
   * Clear all groups and listeners
   */
  clear() {
    this.groups.clear();
    this.listeners.clear();
  }
}

// Export singleton instance
export const stateManager = new StateManager();

/**
 * Helper function to generate unique IDs for components
 */
let idCounter = 0;
export function generateId(prefix: string): string {
  return `${prefix}-${++idCounter}`;
}
