/* globals SecondaryToolbar, updateViewarea */

var HorizontalScrollingTool = {
  initialize: function horizontalScrollingToolInitialize(options) {
    this.toggleElement = options.toggleElement;
    this.viewerElement = options.viewerElement;
    this.disabledClassName = options.disabledClassName || 'horizontal-scrolling-disabled';

    if (!this.toggleElement) {
      return;
    }

    this.toggleElement.addEventListener('click', this.toggleElementClicked.bind(this));
  },

  toggleElementClicked: function horizontalScrollingToolToggleElementClicked() {
    this.toggle();
    updateViewarea();
  },

  setHorizontalScrollingEnabled: function horizontalScrollingToolSetHorizontalScrollingEnabled(isHorizontalScrollingEnabled) {
    this.isHorizontalScrollingEnabled = isHorizontalScrollingEnabled;

    if (this.isHorizontalScrollingEnabled) {
      this.enableHorizontalScrolling();
    } else {
      this.disableHorizontalScrolling();
    }

    SecondaryToolbar.close();
  },

  setTitle: function horizontalScrollingToolSetTitle(title) {
    this.toggleElement.title = title;
    this.toggleElement.firstElementChild.textContent = title;
  },

  toggle: function horizontalScrollingToolToggle() {
    this.setHorizontalScrollingEnabled(!this.isHorizontalScrollingEnabled);
    updateViewarea();
  },

  enableHorizontalScrolling: function horizontalScrollingToolEnableHorizontalScrolling() {
    this.setTitle('Disable horizontal scrolling');
    this.viewerElement.classList.remove(this.disabledClassName);
  },

  disableHorizontalScrolling: function horizontalScrollingToolDisableHorizontalScrolling() {
    this.setTitle('Enable horizontal scrolling');
    this.viewerElement.classList.add(this.disabledClassName);
  }
};
