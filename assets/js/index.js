// ~ DECLARATIONS
const searchFormTextArea = $("#form-input");
const submitBtn = $("#submit-form-btn");
const searchForm = $("#search-form");
const recentSearchesContainer = $("#recent-search");
const weatherInfoContainer = $("#weather-info-container");

//~ UTILITY FUNCTIONS
// read to LS fn
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

// write to LS fn
const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);
  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

// FUNCTIONS

// functions to get weather info from API
const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// fn to fetch weather data
const fetchWeatherData = async (cityName) => {
  // get url from current weather data API
  const currentDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: cityName,
      appid: "8109f605d79877f7488a194794a29013",
    }
  );
  // fetch data from current data API
  const currentWeatherDate = await fetchData(currentDataUrl);
  //  from api get city name, lat and long
  const searchedCityName = currentWeatherDate?.name;
  const lat = currentWeatherDate?.coord?.lat;
  const lon = currentWeatherDate?.coord?.lon;

  // get url from forecast data API
  const forecastDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "current,minutely,hourly",
      units: "metric",
      appid: "8109f605d79877f7488a194794a29013",
    }
  );

  // fetch data from forecast API
  const currentForestDate = await fetchData(forecastDataUrl);

  return {
    cityName: searchedCityName,
    dailyWeatherData: currentForestDate,
  };
};

// fn to render current date
const renderCurrentDate = (data) => {
  console.log(data);
  // display HTML using js of weather card
  const mainWeatherCard = `<div class="city-info div text-center">
    <div>
        <h2 class="searched-city mt-3">${data.cityName}</h2>
        <h3 class="date">Time</h3>
        <img
        src="http://openweathermap.org/img/w/04d.png"
        alt="image of weather icon"
        />
    </div>

    <div class="row g-0 m-5">
        <div class="col-sm-12 col-md-3 border p-1 px-3 bg-light fw-bold">
        Temperature
        </div>
        <div class="col-sm-12 col-md-9 p-1 px-4 border">
        Degrees &deg;C
        </div>
        <div class="col-sm-12 col-md-3 border p-1 px-3 bg-light fw-bold">
        Humidity
        </div>
        <div class="col-sm-12 col-md-9 p-1 px-4 border">20 &percnt;</div>
        <div class="col-sm-12 col-md-3 border p-1 px-3 bg-light fw-bold">
        Wind Speed
        </div>
        <div class="col-sm-12 col-md-9 p-1 px-4 border">10 MPH</div>
        <div class="col-sm-12 col-md-3 border p-1 px-3 bg-light fw-bold">
        UV Index
        </div>
        <div class="col-sm-12 col-md-9 p-1 px-4 border">
        <span class="bg-success text-white px-2 rounded-1">1.5</span>
        </div>
    </div>
    </div>`;
  // append weather card to main container
  weatherInfoContainer.append(mainWeatherCard);
};

//fn to render weather forecast
const renderWeatherForecast = () => {
  // display forecast on page
  const weatherForecastCards = ` <h4 class="weather-card-title text-center">Forecast</h4>
    <hr class="my-2" />
    <!-- weather card container -->
    <div
        class="weather-card-container m-3 d-flex flex-row flex-wrap justify-content-center"
    >
        <div class="card border m-2 weather-card">
        <img
            class="card-img-top shadow-sm mx-auto mt-2"
            src="http://openweathermap.org/img/w/04d.png"
            alt="weather"
        />
        <div class="card-body">
            <h5
            class="card-title text-center text-secondary card-header border-0"
            >
            Day of week
            </h5>
        </div>
        <div class="weather-col-container row g-0 m-1 mb-3">
            <div class="col-6 bg-light px-1 fw-bold border">
            Temperature
            </div>
            <div class="col-6 px-1 text-center border">23 &deg;C</div>
            <div class="col-6 bg-light px-1 fw-bold border">Humidity</div>
            <div class="col-6 px-1 text-center border">20 &percnt;</div>
            <div class="col-6 bg-light px-1 fw-bold border">Wind Speed</div>
            <div class="col-6 px-1 text-center border">10 MPH</div>
        </div>
        </div>

        <div class="card border m-2 weather-card">
        <img
            class="card-img-top shadow-sm mx-auto mt-2"
            src="http://openweathermap.org/img/w/04d.png"
            alt="weather"
        />
        <div class="card-body">
            <h5
            class="card-title text-center text-secondary card-header border-0"
            >
            Day of week
            </h5>
        </div>
        <div class="weather-col-container row g-0 m-1 mb-3">
            <div class="col-6 bg-light px-1 fw-bold border">
            Temperature
            </div>
            <div class="col-6 px-1 text-center border">23 &deg;C</div>
            <div class="col-6 bg-light px-1 fw-bold border">Humidity</div>
            <div class="col-6 px-1 text-center border">20 &percnt;</div>
            <div class="col-6 bg-light px-1 fw-bold border">Wind Speed</div>
            <div class="col-6 px-1 text-center border">10 MPH</div>
        </div>
        </div>

        <div class="card border m-2 weather-card">
        <img
            class="card-img-top shadow-sm mx-auto mt-2"
            src="http://openweathermap.org/img/w/04d.png"
            alt="weather"
        />
        <div class="card-body">
            <h5
            class="card-title text-center text-secondary card-header border-0"
            >
            Day of week
            </h5>
        </div>
        <div class="weather-col-container row g-0 m-1 mb-3">
            <div class="col-6 bg-light px-1 fw-bold border">
            Temperature
            </div>
            <div class="col-6 px-1 text-center border">23 &deg;C</div>
            <div class="col-6 bg-light px-1 fw-bold border">Humidity</div>
            <div class="col-6 px-1 text-center border">20 &percnt;</div>
            <div class="col-6 bg-light px-1 fw-bold border">Wind Speed</div>
            <div class="col-6 px-1 text-center border">10 MPH</div>
        </div>
        </div>

        <div class="card border m-2 weather-card">
        <img
            class="card-img-top shadow-sm mx-auto mt-2"
            src="http://openweathermap.org/img/w/04d.png"
            alt="weather"
        />
        <div class="card-body">
            <h5
            class="card-title text-center text-secondary card-header border-0"
            >
            Day of week
            </h5>
        </div>
        <div class="weather-col-container row g-0 m-1 mb-3">
            <div class="col-6 bg-light px-1 fw-bold border">
            Temperature
            </div>
            <div class="col-6 px-1 text-center border">23 &deg;C</div>
            <div class="col-6 bg-light px-1 fw-bold border">Humidity</div>
            <div class="col-6 px-1 text-center border">20 &percnt;</div>
            <div class="col-6 bg-light px-1 fw-bold border">Wind Speed</div>
            <div class="col-6 px-1 text-center border">10 MPH</div>
        </div>
        </div>

        <div class="card border m-2 weather-card">
        <img
            class="card-img-top shadow-sm mx-auto mt-2"
            src="http://openweathermap.org/img/w/04d.png"
            alt="weather"
        />
        <div class="card-body">
            <h5
            class="card-title text-center text-secondary card-header border-0"
            >
            Day of week
            </h5>
        </div>
        <div class="weather-col-container row g-0 m-1 mb-3">
            <div class="col-6 bg-light px-1 fw-bold border">
            Temperature
            </div>
            <div class="col-6 px-1 text-center border">23 &deg;C</div>
            <div class="col-6 bg-light px-1 fw-bold border">Humidity</div>
            <div class="col-6 px-1 text-center border">20 &percnt;</div>
            <div class="col-6 bg-light px-1 fw-bold border">Wind Speed</div>
            <div class="col-6 px-1 text-center border">10 MPH</div>
        </div>
        </div>
    </div>`;
  // append weather cards
  weatherInfoContainer.append(weatherForecastCards);
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
      return `<li class="list-group-item rounded recent-search" data-city="${city}">${city}</li>`;
    };
    // map through recent search for each city
    const recentCities = recentSearches.map(createSearchedCities).join("");
    // then add each city to recent history list section
    const list = ` <ul class="list-group"> ${recentCities}</ul>`;
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
    $(".list-group>li.active").removeClass("active");

    target.toggleClass("active");
    //   if li is clicked get the data city attribute
    const CityName = target.attr("data-city");
  }
};

const handleFormSubmit = async (event) => {
  // prevent url form default
  event.preventDefault();
  // get input from form
  const cityName = $("#form-input").val();
  // validate input
  if (cityName) {
    //call fn to fetch weather data
    const displayWeatherData = await fetchWeatherData(cityName);
    // call fn to render for current data
    renderCurrentDate(displayWeatherData);
    // render daily forecast data
    renderWeatherForecast(displayWeatherData);
    // get searches from LS
    const recentCitySearched = readFromLocalStorage("recentSearches", []);
    // push city to array
    recentCitySearched.push(cityName);
    // remove previous alert
    recentSearchesContainer.children().last().remove();
    // write searches to LS
    writeToLocalStorage("recentSearches", recentCitySearched);
    // render recent searched cities
    renderRecentSearch();
  }
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
