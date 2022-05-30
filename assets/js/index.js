// ~ DECLARATIONS
const searchFormTextArea = $("#form-input");
const submitBtn = $("#submit-form-btn");
const searchForm = $("#search-form");
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
    // fn to append each city into recent search section
    const createSearchedCities = (city) => {
      return `<li class="list-group-item rounded" data-city="${city}">${city}</li>`;
    };
    // map through recent search for each city
    const recentCities = recentSearches.map(createSearchedCities).join("");
    console.log(recentCities);
    // then add each city to recent history list section
    const list = ` <ul class="list-group" > ${recentCities}</ul>`;
    // then append to the recent searches container
    recentSearchesContainer.append(list);
  } else {
    // if there are no searches render an alert
    const noSearchAlert = `<div class="alert alert-dark text-center mt-2 p-1" role="alert">
        You have no search history
    </div>`;
    //append alert to parent div (recent search container)
    recentSearchesContainer.append(noSearchAlert);
  }
};

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

const handleFormSubmit = (event) => {
  // prevent url form default
  event.preventDefault();
  console.log("submitted");
};

// first - fn called on document load
const onLoad = () => {
  // calling fn to render searches on page
  renderRecentSearch();
};

// on ready event listener for document using jquery
$(document).ready(onLoad);

// submit event handler for search form text box
searchForm.submit(handleFormSubmit);

// event listener for recent search history list
recentSearchesContainer.click(searchHistoryClicks);
