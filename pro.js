var fb_url = "";
$.getJSON(chrome.extension.getURL('config.json'), function(settings) {
    fb_url = settings.firebase_url;
    start();
});

function fbDataRef(node) {
    return new Firebase(fb_url + node);
}

// this function (and some other files, like the manifest) from https://github.com/nealwu/KillNewsFeed
function cleanUpPage() {
    // remove stuff from the page...

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
    $('.groupSkyAux .pagelet').empty().append(saveHeader).append(save);


    filterPost('mall_post_791307367591417:6')

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

    $("#groupProfileCompletionBlock").remove(); // shown to admins of a group with incomplete info
    $("#groupProfileCompletionBlockNotice").remove(); // similar to above
    $(".cover").remove(); // cover photo
    $(".groupsTopicsBox").remove(); // group tags
    $("#pagelet_rhc_footer").remove(); // FB footer

    if (! $("#leftCol").hasClass("fixed_elem"))
        $("#leftCol").addClass("fixed_elem"); // make the left col not scroll
}

function dirtyPosts() {
    // just call this once (a persistent callback is already attached) -- we can't count on the
    // persistent callback to work because it isn't triggered until we have new data
    fbDataRef("post_completed").once('value', function(snapshot) {
        updatePostCompleted(snapshot.val());
    });
}

function addToPosts() {
    // add functionality to each post

    var posts = $("#pagelet_group_mall").find(".mbm");
    posts.each(function() {
        if (! $(this).data("pro-enabled")) {
            $(this).data("pro-enabled", true);

            var post_id = $(this).attr("id");
            $(this).find("._3dp").children().first().append(
                $("<input>")
                    .attr("id", post_id + "-completed")
                    .data("data-post-id", post_id)
                    .attr("type", "checkbox")
                    .css("float", "right")
                    .css("margin-right", "20px")
                    .addClass("fbpro-completed-checkbox")
            );
            $(this).find("._3dp").children().first().append(
                $("<label>")
                    .attr("for", post_id + "-completed")
                    .css("float", "right")
                    .text("Mark as completed")
            );

            // we have new post(s), maybe from a page change or from infinite scrolling (and this
            // should be called *after* we've updated posts)
            dirtyPosts();
        }
    });
}

function filterPost (postID) {
    // need to use id= because of colons
    $("[id='" + postID + "']").children().remove();
}

function updatePostCompleted(vals) {
    $.each(vals, function(post_id, completed) {
        var post = $("[id='" + post_id + "']"); // need this because post_id can have colons
        post.toggleClass("fbpro-is-completed", completed);
        post.find(".fbpro-completed-checkbox").prop("checked", completed);
    });
}

$(document).on("click", ".fbpro-completed-checkbox", function(e) {
    var post_id = $(this).data("data-post-id");
    var data_ref = fbDataRef("post_completed/" + post_id);
    data_ref.set($(this).prop("checked"));
});

function start() {
    // waits until the Firebase URL is available

    fbDataRef("post_completed").on('value', function(snapshot) {
        updatePostCompleted(snapshot.val());
    });
}

window.setInterval(cleanUpPage, 100);
window.setInterval(addToPosts, 100);

// inject JS into the page
// http://stackoverflow.com/questions/12095924/is-it-possible-to-inject-a-javascript-code-that-overrides-the-one-existing-in-a
var s = document.createElement("script");
s.src = chrome.extension.getURL("inject.js");
(document.head||document.documentElement).appendChild(s);

// listener for history changes
function onPageChange(e) {
    // cleanUpPage and addToPosts are called every 100ms, so they don't need to be called here
}
window.addEventListener("pageChange", onPageChange); // page changes
window.addEventListener("popstate", onPageChange); // user hits the browser back button
