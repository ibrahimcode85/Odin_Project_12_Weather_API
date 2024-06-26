const showButton = document.querySelector("button.show");
const resetButton = document.querySelector("button.reset");

async function getWeatherData() {
  let inputLocation = document.querySelector("input#location").value;
  const inputMetric = document.querySelector("select#metric").value;

  inputLocation = inputLocation.replace(" ", "_");

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=6567fba162b545b68e591627242406&q=${inputLocation}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const weatherData = await response.json();
    const conditionText = weatherData.current.condition.text;
    const conditionIcon = weatherData.current.condition.icon;
    const temperature = weatherData.current[inputMetric];

    return {
      temperature: temperature,
      conditionText: conditionText,
      conditionIcon: conditionIcon,
    };
  } catch {
    alert(
      "An error occurred while fetching the weather data. Please re-enter your input"
    );
    resetUserInput();
  }
}

function displayData(weatherData) {
  const iconArea = document.querySelector(".display .icon");
  const tempArea = document.querySelector(".display .temp");
  const textArea = document.querySelector(".display .text");
  const metricSelect = document.querySelector("select#metric").value;

  const metricTextMap = { temp_c: "C", temp_f: "F" };
  const iconUrl = "https:" + weatherData.conditionIcon;

  iconArea.style.backgroundImage = `url(${iconUrl})`;
  tempArea.textContent = `${weatherData.temperature}°${metricTextMap[metricSelect]}`;
  textArea.textContent = weatherData.conditionText;
}

function resetUserInput() {
  // reset user input
  document.querySelector("input#location").value = "";
  document.querySelector("select#metric").value = "temp_c";

  // reset display
  document.querySelector(".display .icon").style.backgroundImage = "";
  document.querySelector(".display .temp").textContent = "";
  document.querySelector(".display .text").textContent = "";
}

showButton.addEventListener("click", async function () {
  let weatherData = await getWeatherData();
  displayData(weatherData);
});

resetButton.addEventListener("click", resetUserInput);
