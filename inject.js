// this needs to be injected into the page's execution environment
// http://felix-kling.de/blog/2011/01/06/how-to-detect-history-pushstate/
(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        // we're going to overwrite pushState to dispatch an event, then do its normal business
        window.dispatchEvent(new CustomEvent("pageChange", {detail: {state: state}}));
        return pushState.apply(history, arguments);
    }
})(window.history);
