document.addEventListener('DOMContentLoaded', () => {

  // IDs of parameters
  const OPTIONS_PRICE_TEXT = 'optionPrice';
  const SAVINGS_INPUT = 'savings';
  const TOTAL_SAVED_TEXT = 'totalSaved';
  const NUMBER_OF_SHARES_TEXT = 'numberOfShares';
  const SHARE_PRICE_TEXT = 'sharePrice';
  const VALUE_TEXT = 'initialShareValue';
  const INITIAL_PROFIT_TEXT = 'initialProfit';
  const SLIDER = 'increase';
  const CHANGE_TEXT = 'change';
  const TOTAL_PROFIT_TEXT = 'profit';

  // Get elements based on IDs
  const nwOptionPriceDisplay = document.getElementById(OPTIONS_PRICE_TEXT);
  const savings = document.getElementById(SAVINGS_INPUT);
  const totalSaved = document.getElementById(TOTAL_SAVED_TEXT);
  const numberOfShares = document.getElementById(NUMBER_OF_SHARES_TEXT);
  const sharePrice = document.getElementById(SHARE_PRICE_TEXT);
  const initialValue = document.getElementById(VALUE_TEXT);
  const initialProfit = document.getElementById(INITIAL_PROFIT_TEXT);
  const increase = document.getElementById(SLIDER);
  const change = document.getElementById(CHANGE_TEXT);
  const profit = document.getElementById(TOTAL_PROFIT_TEXT);
  const periodButtons = document.querySelectorAll('input[name="period"]');

  // API URL
  const apiUrl = 'https://alpha-pulse.vercel.app/api/eod?id=nwg';

  // Function to round share price
  const roundSharePrice = (x) => {
      return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
      }).format(x);
  }

    // Function to round option price
    const roundOptionPrice = (x) => {
      return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
      }).format(x);
  }

  // Function to round numbers
  const roundMe = (x) => {
    return new Intl.NumberFormat().format(x);
}

  // Initialize the live share price as null
  let liveSharePrice = null;
  let nwOptionPrice = 1.7829;  // default value
  let savingPeriod = 3;

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

  // Update the live share price on the page
  sharePrice.textContent = roundSharePrice(liveSharePrice);
  nwOptionPriceDisplay.textContent = roundOptionPrice(nwOptionPrice);
      
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
          let savingsVal = stripNumber(savings.value);
          let increaseVal = increase.value;
          updateTotals(savingsVal, increaseVal);
          nwOptionPriceDisplay.textContent = roundOptionPrice(nwOptionPrice);
        });
    });
  };  

  const updateTotals = (savingsVal, increaseVal) => {
      const roundMeCurrency = (x) => {
          return new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
          }).format(x);
      }

      if (savingPeriod === 3) {
        nwOptionPrice = 1.7829;
      } else if (savingPeriod === 5) {
        nwOptionPrice = 2.2699;
      }

      let updatedTotalSaved = savingsVal * 12 * savingPeriod;
      totalSaved.textContent = roundMeCurrency(updatedTotalSaved);

      let updatedNumberOfShares = Math.floor(updatedTotalSaved / nwOptionPrice);
      numberOfShares.textContent = roundMe(updatedNumberOfShares);

      let updatedInitialValue = updatedNumberOfShares * liveSharePrice;
      initialValue.textContent = roundMeCurrency(updatedInitialValue);

      let updatedInitialProfit = updatedInitialValue - updatedTotalSaved;
      initialProfit.textContent = roundMeCurrency(updatedInitialProfit);

      let updatedChange = updatedInitialValue * (1 + (increaseVal / 100));
      change.textContent = roundMeCurrency(updatedChange);

      let updatedProfit = updatedChange - updatedTotalSaved;
      profit.textContent = roundMeCurrency(updatedProfit);

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
