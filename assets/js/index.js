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

// first fn called on document load
const onLoad = () => {
  //target the parent element for the recent searches in HTML
  const RecentSearchesDiv = $("#recent-searches");

  console.log("hi");

  // get data from LS after page load - parse data to LS
  const recentSearches = readFromLocalStorage("recentSearches", []);
  console.log(recentSearches);
};

// add on ready event listener for document using jquery
$(document).ready(onLoad);
