var MarkerManager = {
  initialize: function() {
    document.onmousemove = this._onmousemove.bind(this);
    document.onmouseup = this._onmouseup.bind(this);
  },

  _onmousemove: function(event) {
    if (this.dragging) {
      var canvas = this.dragging.canvas;
      var viewport = this.dragging.viewport;
      var data = this.dragging.data;
      var el = this.dragging.el;
      var y = Math.max(0, Math.min(viewport.height, (event.y - canvas.getBoundingClientRect().top)));
      data.position = y / viewport.height * 100;
      el.style.top = data.position + '%';
    }
  },

  _onmouseup: function(event) {
    this.dragging = null;
  }
};
