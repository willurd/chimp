/* globals DropboxHistory, PDFViewerApplication */

var DropboxHistoryView = {
  maxItems: 50,

  initialize: function dropboxHistoryViewInitialize(options) {
    DropboxHistoryView.container = options.container;
    DropboxHistoryView.maxItems = options.maxItems || DropboxHistoryView.maxItems;
    DropboxHistory.listen(DropboxHistoryView.onHistoryChange);
  },

  reset: function dropboxHistoryViewReset() {
    var container = DropboxHistoryView.container;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  },

  render: function dropboxHistoryViewRender() {
    var container = DropboxHistoryView.container;

    DropboxHistory.list().then(function(files) {
      DropboxHistoryView.reset();

      files.slice(0, DropboxHistoryView.maxItems).forEach(function(file) {
        var div = document.createElement('div');
        div.className = 'dropboxHistoryItem';

        var link = document.createElement('a');
        link.href = '#';
        link.onclick = function openPdfFile(e) {
          PDFViewerApplication.openDropboxFile(file);
          return false;
        };
        link.textContent = file.name;

        var path = document.createElement('span');
        path.textContent = '/' + file.path.replace(new RegExp('\\/' + file.name + '$'), '');
        link.appendChild(path);

        div.appendChild(link);

        container.appendChild(div);
      });
    });
  },

  onHistoryChange: function dropboxHistoryViewOnHistoryChange(list) {
    DropboxHistoryView.render();
  }
};
