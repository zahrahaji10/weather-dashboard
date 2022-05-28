// ~ DECLARATIONS
const recentSearchesContainer = $("#recent-searches");

//~ UTILITY FUNCTIONS
// Local Storage (LS) function
const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

// second - fn to render recent search on page after load
const renderRecentSearch = () => {
  //target recent searches in HTML
  // get data from LS after page load - parse data to LS
  const recentSearches = readFromLocalStorage("recentSearches", []);
  // conditional statement for
  if (recentSearches.length) {
    // if there is recent search display searches
  } else {
    // if there are no searches render an alert
    const noSearchAlert = `<div class="alert alert-dark" role="alert">
        You have no search history
    </div>`;
    //append alert to parent div (recent search container)
    $("#recent-searches").append(noSearchAlert);
  }
};

// first - \fn called on document load
const onLoad = () => {
  // calling fn to render searches on page
  renderRecentSearch();
};

// add on ready event listener for document using jquery
$(document).ready(onLoad);
