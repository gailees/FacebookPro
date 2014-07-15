function blockAndDisplay() {
    var feed = $('[id^=topnews_main_stream], [id^=mostrecent_main_stream], [id^=pagelet_home_stream]');
    var message = $('#distracted');

    if (feed.length == 0) {
        message.remove();
    } else if (message.length == 0) {
        message = $('<h1>')
            .attr('id', 'distracted')
            .text("Don't get distracted by Facebook!")
            .css('font-size', '30px')
            .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
            .css('position', 'relative')
            .css('top', '75px');
        $('[data-location=maincolumn]').append(message);
     }

    feed.children().remove();
    $('.ticker_stream').remove();
    $('.ego_column').remove();
    $('#pagelet_games_rhc').remove();
    $('#pagelet_trending_tags_and_topics').remove();
    $('#pagelet_canvas_nav_content').remove();

    //remove extra shit on left side -- everything but groups and your profile pic/name
    $('#pagelet_pinned_nav').remove();
    $('#pagesNav').remove();
    $('#gamesNav').remove();
    $('#appsNav').remove();
    $('#developerNav').remove();
    $('#interestsNav').remove();
    $('#listsNav').remove();
    $('#rightCol').children().remove();

    //remove notification jewels in top nav bar -- messages, notifications, and friend requests
    $('#jewelContainer').children().remove();    
    //$('#facebookNotificationsJewel').remove();

    //remove bottom dock -- used for chat
    $('#pagelet_dock').children().remove();

    //remove expanded chat on right side
    $('#pagelet_sidebar').remove();
    //get rid of extra divider line
    $('#u_0_25').remove();
    //$('.fbChatSidebar').remove();

}

window.setInterval(blockAndDisplay, 100);
