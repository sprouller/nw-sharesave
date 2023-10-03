document.addEventListener('DOMContentLoaded', () => {

  // IDs of parameters
  const SAVINGS_INPUT = 'savings';
  const INITIAL_TEXT = 'initial';
  const NUMBER_OF_SHARES_TEXT = 'numberOfShares';
  const SHARE_TEXT = 'sharePrice';
  const VALUE_TEXT = 'value';
  const SLIDER = 'increase';
  const CHANGE_TEXT = 'change';
  const PROFIT_TEXT = 'profit';
  const SLIDER_VAL = 'sliderVal';
  const OPTION_PRICE = 'optionPrice';
  const BONUS_MULTIPLE = "bonusMultiple"
  //const PROFIT_OVER_3K = "profitOver3k";

  // Get elements based on IDs
  const savings = document.getElementById(SAVINGS_INPUT);
  const initial = document.getElementById(INITIAL_TEXT);
  const numberOfShares = document.getElementById(NUMBER_OF_SHARES_TEXT);
  const sharePrice = document.getElementById(SHARE_TEXT);
  const value = document.getElementById(VALUE_TEXT);
  const increase = document.getElementById(SLIDER);
  const change = document.getElementById(CHANGE_TEXT);
  const profit = document.getElementById(PROFIT_TEXT);
  const sliderVal = document.getElementById(SLIDER_VAL);
  const optionPrice = document.getElementById(OPTION_PRICE);
  const bonusMultiple = document.getElementById(BONUS_MULTIPLE);
  const periodButtons = document.querySelectorAll('input[name="period"]');
  //const profitOver3k = document.getElementById(PROFIT_OVER_3K);

  // API URL
  const apiUrl = 'https://alpha-pulse.vercel.app/api/eod?id=nwg';

  // Function to round share price
  const roundSharePrice = (x) => {
      return new Intl.NumberFormat('pl-PL', {
          style: 'currency',
          currency: 'PLN',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
      }).format(x);
  }

  // Initialize the live share price as null
  let liveSharePrice = null;
  let nwOptionPrice = 1.88;  // default value
  let savingPeriod = 3;
  let conversionRate = 5;

  // Fetch the share price from the API
  const getSharePrice = async () => {
      try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data[0].price / 100; // Convert pennies to pounds
      } catch (error) {
          console.log('There was a problem with the fetch operation:', error.message);
      }
  };

  // Remove comma and pound sign from input
  const stripNumber = (textNumber) => {
    return textNumber.replace(/[£,]/g, "");
  }
  
  // Add commas and pound sign to input
  const addSymbolsToInput = (numberInput) => {
    return numberInput.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Initialize the page once the share price is fetched
  const initPage = async () => {
      liveSharePrice = await getSharePrice();

    // Determine the value of nwOptionPrice here after liveSharePrice is set
    if (liveSharePrice !== null) {
      convertedSharePrice = liveSharePrice * conversionRate;
      nwOptionPrice = convertedSharePrice * 0.8;
    }

  // Update the live share price on the page
  sharePrice.textContent = roundSharePrice(convertedSharePrice);
  // Update the live option price on the page
  optionPrice.textContent = roundSharePrice(nwOptionPrice);

      
      // Add event listeners here if they depend on the fetched share price
      savings.addEventListener('input', () => {
        savings.value = addSymbolsToInput(savings.value);
        savings.value = "£" + savings.value;

        // Set new constant to value of unformmated input
        let formattedSavingsValue = stripNumber(savings.value);
        let increaseVal = increase.value;
        updateTotals(formattedSavingsValue, increaseVal);
      });

      increase.addEventListener('input', () => {
          const savingsVal = stripNumber(savings.value);
          const increaseVal = increase.value;
          updateTotals(savingsVal, increaseVal);
      });

      // Add click event listener to each radio button
      periodButtons.forEach(radio => {
        radio.addEventListener('change', function() {
          savingPeriod = parseInt(this.value, 10);
          const savingsVal = savings.value;
          const increaseVal = increase.value;
          updateTotals(savingsVal, increaseVal);
        });
    });
  };  

  const updateTotals = (savingsVal, increaseVal) => {
      const roundMeCurrency = (x) => {
          return new Intl.NumberFormat('pl-PL', {
              style: 'currency',
              currency: 'PLN',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
          }).format(x);
      }

      const roundMe = (x) => {
          return new Intl.NumberFormat().format(x);
      }

      const updateInitial = savingsVal * 12 * savingPeriod;
      const updateNumber = Math.floor(updateInitial / nwOptionPrice);
      const updateValue = Math.round(updateNumber * convertedSharePrice);
      const updateChange = updateValue * (1 + (increaseVal / 100));
      const updateProfit = updateChange - updateInitial;

/*      if (updateProfit < 3000) {
        profitOver3k.style.display = "none";
      } else {
        profitOver3k.style.display = "block";
      }
*/

      initial.textContent = roundMeCurrency(updateInitial);
      numberOfShares.textContent = roundMe(updateNumber);
      value.textContent = roundMeCurrency(updateValue);
      change.textContent = roundMeCurrency(updateChange);
      profit.textContent = roundMeCurrency(updateProfit);
  }

  // Initialize the page
  initPage();

  savings.addEventListener('input', (e) => {
    const isValid = e.target.reportValidity();
    // other code from before
    e.target.setAttribute('aria-invalid', !isValid);
  });


  console.log('live');
});
