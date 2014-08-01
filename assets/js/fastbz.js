$(document).ready(function() {
    function loadURL (bzURL) {
        var qb_query = '{"from":"public_bugs","select":["bug_id"]}';
        qb_query = $.parseJSON( qb_query );

        var qbString = bzSearchToQb( bzURL, (new Date).getTime(), (new Date).getTime(), 'public_bugs' );
        qb_query["esfilter"] = $.parseJSON(qbString)['esfilter'];

        qb_query["esfilter"] = {"and": [{"range":{"expires_on":{"gte":(new Date).getTime()}}},qb_query["esfilter"] ]}
        console.log( qb_query );

        // ESQueryRunner( 
        //     qb_query, 
        //     function( response ){ // Executes after data is returned from ES.
        //         // Format the returned ElasticSearch data for Rickshaw compatibility

        //         buglist = [];

        //         jQuery.each(response.list, function(i, id) {
        //             buglist.push(id["bug_id"]);
        //         });
        //         console.log(buglist);
        //         if (buglist.length == 0) {
        //             return;
        //         }
        //         var newURL = URI("https://bugzilla.mozilla.org/buglist.cgi").search({"bug_id": buglist});
        //         console.log(newURL.toString());
        //         window.location.href = newURL.toString();
                

        //     }
        // );
    }

    if (location.search != '') {
        loadURL( location.href );
    } else {
        $( "#find" ).click(function () {
            loadURL( $("#quicksearch_main").val() );
        });
    }
    
})

