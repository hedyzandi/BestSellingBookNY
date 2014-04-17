// Using jquery.xdomainajax.js to overvome the Cross-Origin access limitations.
// This plugin overrides jQuery's native AJAX implementation.

;(function scrape() {

    $(document).ready(function() {
        var baseURL = 'http://www.nytimes.com/best-sellers-books/overview.html', // URL we need to hit 
        className = '', // class name of the element we need
        $responseText, // storing a reference to the responseText wrapped as a jQuery object, incoming from AJAX call
        bestSellingTitle, // best selling book title
        bestSellingAuthor, // best selling author 
        $titlePlaceHolder = $('.best-selling-title'),
        $authorPlaceHolder = $('.best-selling-author'); // Storing references to the DOM elements on the page that we want to fill in using the text we get from scraping.

        // using jQuery's AJAX implementation.
        $.ajax({
            url: baseURL,
            type: 'GET',
            success: function(res) {
                $responseText = $(res.responseText);
                // traversing the $responseText jQuery Object to get to two DOM nodes. <strong> contains the title and <span> contains the author.
                // we use $.trim to eliminate whitespace
                // for bestSellingAuthor, we use a simple regex rule /by/gi to eliminate the strin "by : ..." from the author name.
                bestSellingTitle = $.trim($responseText.find('.bColumn .story:first-child ol>li').eq(0).find('strong').text());
                bestSellingAuthor = $.trim($responseText.find('.bColumn .story:first-child ol>li').eq(0).find('span').text().replace(/by/gi, ''));
                // fina step: fill the empty elements using the text we got from scraping NYTimes bestsellers.
                // We also use .empty() to remove the loader gifs.
                $titlePlaceHolder.empty().text(bestSellingTitle);
                $authorPlaceHolder.empty().text(bestSellingAuthor);
                console.log('Best selling title is: ', bestSellingTitle, ' and the author: ', bestSellingAuthor); // logging
            }
        });
    });

})();

