// Job Listing JSON Function
function jobListing() {
    
    var jobURL = "https://api.sheetson.com/v1/sheets/jobopening?spreadsheetId=11yVIVHKWM7kE6MCjaPHHiQJqwqLcaZzFCV7fSf0x6J8"


    $.getJSON(jobURL, function(data) {
        var results = data.results;


        // $("#jobListing").html('<div class="filter-box">');
        var output = "";

        results.forEach(function(result) {
            
            // console.log(result);
            if (result.jobStatus == 'show') {

                output += `<tr>
                <td>`+ result.jobname +`</td>
                <td>`+ result.description +`</td>
                <td>`+ result.status +`</td>
                <td>`+ result.priority +`</td>
                <td>
                    <a data-rowIndex="` + result.rowIndex +`" href="jobdetail?` + result.jobname.replace(/\s+/g, '-') + `&rowIndex=` + result.rowIndex + `">Show</a>
                </td>
            </tr>`;
            }
        });

        $("#jobListing").append(output);

        $.extend( true, $.fn.dataTable.defaults, {
            "searching": false,
            "paging":   false,
        } );

        var table = $('#jobListing').DataTable();
 
        // Sort by column 1 and then re-draw
        table
            .order( [] )
            .draw( false );

    }).done(function() {
        setTimeout(function() {
            $('.loading').fadeOut(100, '', function() {
                $('.loading').remove();
            });
        }, 200);
    });
}



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}


// Job Detail JSON Function
function jobDetail() {

    var jobDetailURL = "https://api.sheetson.com/v1/sheets/jobDetails/"+parseInt(getParameterByName('rowIndex'))+ "?spreadsheetId=11yVIVHKWM7kE6MCjaPHHiQJqwqLcaZzFCV7fSf0x6J8"


    $.getJSON(jobDetailURL, function(data) {

        var output = "";
    
        output += `<h2>`+ data.jobname +`</h2>
        <p>Experience : `+ data.experience +`</p>
        <p>Status : `+ data.status +`</p>`+ data.description;
    
        $("#jobDetail").append(output);

    }).done(function() {
        setTimeout(function() {
            $('.loading').fadeOut(100, '', function() {
                $('.loading').remove();
            });
        }, 200);
    });
}


$(document).ready(function() {
    var href = location.href.split("/").slice(-1);
    var href1 = href[0].split('?');

    if (href1[0] == 'jobdetail') {
        jobDetail(getParameterByName('rowIndex'));
    }    
    

    
});


$(window).on('load', function() {

    if($("#jobListing").length){
        jobListing();
    } 

    
    
});