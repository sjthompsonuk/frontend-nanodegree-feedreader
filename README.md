# Jasmine Testing  - Udacity Nanodegree Project

## How to run the test code

Ensure the entire repo is downloaded then open the `index.html` file in a web browser such as Chrome.

The tests should take a few seconds and the results will be displayed at the bottom of the loaded webpage. Green indicates test passes, red will indicate failures.

## Asynchronous resources

The specfile is locally written `feedreader.js` operating on the included Jasmine v2.1.2 framework. However external resources are referenced (such as a Google API handler and the blog resources), so an internet connection is required.

## Tests included

1. RSS Feeds
    *  are defined
    * should have URLs
    * should have names
2. The Menu
    * Menu hidden by default
    * Clicking menu icon toggles menu being displayed
3. Initial Entries
    * Should have at least one article loaded
4. New Feed Selection
    * Min 2 feeds available
    * When switching feeds, content changes
