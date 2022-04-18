const qs = (selector) => document.querySelector(selector);
const cel = (tagName) => document.createElement(tagName);

// DOM

const currencies = qs(".currencies");
const currencyForm = qs("#currency-form");
const currencyResText = qs("#currency-res-text");
const inputValue = qs(".input-value");

// lista wybranych walut

function ratesList() {
  fetch("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
    .then((response) => response.json())
    .then((data) => {
      const currencyList = data[0].rates.filter(({ code }) =>
        ["EUR", "USD", "CHF"].includes(code)
      );

      function selectCurrency() {
        currencyList.forEach(({ currency, mid, code }) => {
          const options = cel("option");
          options.value = mid;
          options.textContent = `${code} ${currency}`;

          currencies.appendChild(options);
        });

        currenciesRate = currencyList[0].mid;

        currencies.addEventListener("change", () => {
          currenciesRate = `${currencies.value}`;
        });
      }
      selectCurrency();
    })
    .catch((error) => console.log(error));
}
ratesList();

// przeliczanie walut

currencyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newInputValue = { value: inputValue.value };

  function convertCurrency(newValue, currenciesRate) {
    const result = newValue.value * currenciesRate;

    currencyResText.textContent = `to ${result.toFixed(2)} PLN`;
  }

  convertCurrency(newInputValue, currenciesRate);
});
