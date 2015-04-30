# Chimp

Chimp is a PDF viewer written using Mozilla's amazing PDF.js library. It takes their PDF viewer demo application and adds some bells and whistles like:

* Location/page sync using Dropbox (read on one device, pick up where you left off on another)
* Open PDFs directly from your Dropbox account (no need to have Dropbox installed - you can even open from your mobile device)
* A history of PDF files read from Dropbox (quickly access your most recently read PDFs)

My grand vision for Chimp is to make it a Dropbox-connected PDF Library.

## Attribution

* PDF.js and original PDF viewer created by Mozilla.
* Monkey icon (`/images/ico/*` and `favicon.io`) by Zille Sophie Bostinius from the Noun Project: https://thenounproject.com/term/monkey/14063/
* Refresh icon (`/images/refresh.png`) created by Joris Hoogendoorn from the Noun Project: https://thenounproject.com/term/refresh/2223/
* History icon (`/images/history.png`) created by iconoci from the Noun Project: https://thenounproject.com/term/books/82248/

## TODO

* Fix ' | Chimp' duplication in the title (when more than one PDF is opened without refreshing the window).
* Make zoom +/- buttons change zoom value in increments of 5% or 10%.
* Add a manager for pdf metadata that is saved to dropbox.
  * Metadata should be stored in a map from `path -> Metadata` at `/Apps/Chimp/metadata.json`.
* Add the ability to mark PDFs as "read" and "unread".
* Add the ability to remove PDFs from history.
* Make the history view indicate when a PDF is read.
* Add a sidebar view that is a Dropbox tree.
  * The tree should indicate when a PDF is read.
  * Add search to the tree.
  * Add a refresh button to refresh the currently-selected directory.
  * Once this is done, get rid of the chooser drop-in.
* Layout sidebar icons vertically on the left (or right, configurable) of the application (the icons are always visible - clicking the icon of the visible panel will close it).
* Location history with back/forward buttons (for example, follow a link to another part of the PDF, hit "back" to go back to where you were).
* Add a settings page (saved to Dropbox).
* Starred folders.
* Starred PDFs.
* Collections (named groups of PDFs).
* Rethink the entire layout/design.
* Add a light theme (configurable in settings).
* Digital book darts (add a marker anywhere on the left or right side of a page - useful for marking where in a page your are reading, especially for multi-column pages).
  * Click+drag a marker to move it.
  * Click a marker's "x" (only visible on hover) to delete it.
  * Save markers to Dropbox along with the the PDF's saved location/config.
* Saved searches (usually, PDFs don't change so you should only have to perform a serach once - save searches and their results).
* Note taking (not like sticky notes, just a list of notes in the sidebar that you can add to or edit).
