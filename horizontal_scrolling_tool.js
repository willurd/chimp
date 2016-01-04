/* globals SecondaryToolbar */

var HorizontalScrollingTool = {
  initialize: function horizontalScrollingToolInitialize(options) {
    this.toggleElement = options.toggleElement;

    if (!this.toggleElement) {
      return;
    }

    this.toggleElement.addEventListener('click', this.toggle.bind(this));
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
  },

  enableHorizontalScrolling: function horizontalScrollingToolEnableHorizontalScrolling() {
    this.setTitle('Disable horizontal scrolling');
  },

  disableHorizontalScrolling: function horizontalScrollingToolDisableHorizontalScrolling() {
    this.setTitle('Enable horizontal scrolling');
  }
};
