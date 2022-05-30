// ~ DECLARATIONS
const recentSearchesContainer = $("#recent-search");

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
    const searches = `<ul class="list-group" >
        <li class="list-group-item rounded" data-city="Birmingham">Birmingham</li>
        <li class="list-group-item rounded" data-city="London">London</li >
    </ul>`;
    // append recent searches list
    recentSearchesContainer.append(searches);
  } else {
    // if there are no searches render an alert
    const noSearchAlert = `<div class="alert alert-dark text-center mt-2 p-1" role="alert">
        You have no search history
    </div>`;
    //append alert to parent div (recent search container)
    recentSearchesContainer.append(noSearchAlert);
  }
};

// fn to change li to active when clicked
// const isActive = () => {
//   //  target the li item that is clicked
//   const clickedCitySearch = document.querySelector(recentSearchesContainer);
//   //  add a class
//   console.log(clickedCitySearch);
//};

// fn to handle clicks on search history section
const searchHistoryClicks = (event) => {
  // target the event that triggered event
  const target = $(event.target);
  //limit the click event to li only using conditional statement
  if (target.is("li")) {
    //   if li is clicked get the data  city attribute
    const CityName = target.attr("data-city");
  }
};

// first - fn called on document load
const onLoad = () => {
  // calling fn to render searches on page
  renderRecentSearch();
  // calling fn to set search class as active on click
};

// event listener for recent search history list
recentSearchesContainer.click(searchHistoryClicks);

// on ready event listener for document using jquery
$(document).ready(onLoad);
