function blockAndDisplay() {
    // news feed
    $('[id^=topnews_main_stream], [id^=mostrecent_main_stream], [id^=pagelet_home_stream]').children().remove();

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

    //dont want to remove everything here _c51
    var saveHeader = $('#rightCol .groupSkyAux .pagelet #u_0_1').detach();
    var save = $('#rightCol .groupSkyAux .pagelet ._c51').detach();
    $('.groupSkyAux .pagelet').empty().append(saveHeader).append(save)

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

// inject JS into the page
// http://stackoverflow.com/questions/12095924/is-it-possible-to-inject-a-javascript-code-that-overrides-the-one-existing-in-a
var s = document.createElement("script");
s.src = chrome.extension.getURL("inject.js");
(document.head||document.documentElement).appendChild(s);

// listener for history changes
function onPageChange(e) {
    console.log("the page changed!");
}
window.addEventListener("pageChange", onPageChange);
window.addEventListener("popstate", onPageChange);
