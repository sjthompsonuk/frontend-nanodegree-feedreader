/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* PROJECT WORK STARTS HERE
         * This spec checks for a non-empty defined string
         * on each object in allFeeds
         */

         it('should have URLs', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.url).toBeDefined();
                 expect(feed.url).not.toBe('');
                 expect(typeof feed.url).toBe('string');
             })
         });

        /* Similar functionaity to the above spec
         * but on the 'name' property
         *
         */

         it('should have names', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name).not.toBe('');
                 expect(typeof feed.name).toBe('string');
             })
         });
    });


    /* New test SUITE named "The menu" */

    describe('The Menu', function() {

        /* To check that the menu is hidden by default, a check
         * that the 'body' has the appropriate class attribute
         * assigned to it on load.
         */

         it('Menu hidden by default', function() {
             expect($('body').hasClass('menu-hidden')).toBe(true);
         })

         /* Check to ensure clicking the menu icon toggles its hidden
          * status. Must test both directions (hidding and displaying)
          */

         it('Clicking menu icon toggles menu being displayed', function() {

             /*Set the menu to hidden, then simulate the icon being clicked*/
             $('body').addClass('menu-hidden');
             $('.menu-icon-link').click();
             /*Test to ensure menu is no longer hidden*/
             expect($('body').hasClass('menu-hidden')).toBe(false);

             /*Set the menu to not-hidden, then simulate the icon being clicked*/
             $('body').removeClass('menu-hidden');
             $('.menu-icon-link').click();
             /*Test to ensure menu is no longer hidden*/
             expect($('body').hasClass('menu-hidden')).toBe(true);
         })
    });

    /* New test SUITE named "Initial Entries". Refers to asynchronous function
    * so beforeEach and done() need to be used, to ensure correct order of code run.
    */

    describe('Initial Entries', function() {

        /* Make sure loadFeed has completed then check that an .entry class
         * element exists within the .feed class.
         *
         * When no articles are loaded, this will return null, so check that
         * is not the case also.
         */

        let firstArticle;

        beforeEach(function(done) {
            loadFeed(0);
            done();

        });

        it('Should have at least one article loaded', function(done) {
            firstArticle = $('.feed .entry');
            expect(firstArticle).toBeDefined();
            expect(firstArticle).not.toBe(null);
            done();
        })
    });

    /* New test SUITE named "New Feed Selection" -also Asynchronous*/

    describe('New Feed Selection', function() {

        /* This function will need to use 2 callbacks
         * in order to allow both runs of 'loadFeed' to occur
         * and the approprate variables captured for comparison
         *
         */

        let titleA;
        let titleB;

        beforeEach(function(done) {
            //set the 2nd feed as live and get html
            loadFeed(1, function() {
                titleA = $(".feed h2").html();
                //set 1st feed back to live
                loadFeed(0, function() {
                    done();
                });
            });
        });

        // Enssure there is an active 2nd feed for comparison
        it('Min 2 feeds available', function(done) {
             expect(titleA).toBeDefined();
             expect(titleA).not.toBe(null);
             done();
        })

        //Make a comparison between the 2 content titles in both load states
        it('When switching feeds, content changes', function(done) {
             titleB = $(".feed h2").html();
             expect(titleB).toBeDefined();
             expect(titleB).not.toBe(null);
             expect(titleA != titleB).toBe(true);
             done();
        })

    });

}());
