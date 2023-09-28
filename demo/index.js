document.addEventListener('DOMContentLoaded', () => {
  //ids of params
  const SAVINGS_INPUT = 'savings';
  const INITIAL_TEXT = 'initial';
  const NUMBER_TEXT = 'number';
  const SHARE_TEXT = 'sharePrice';
  const VALUE_TEXT = 'value';
  const SLIDER = 'increase';
  const CHANGE_TEXT = 'change';
  const PROFIT_TEXT = 'profit';
  const SLIDER_VAL = 'sliderVal';
  const CURRENCY_SELECTOR = 'currency';
  const OPTION_PRICE = 'optionPrice';

  //Get params based on above ids
  const savings = document.getElementById(SAVINGS_INPUT);
  const initial = document.getElementById(INITIAL_TEXT);
  const number = document.getElementById(NUMBER_TEXT);
  const sharePrice = document.getElementById(SHARE_TEXT);
  const value = document.getElementById(VALUE_TEXT);
  const increase = document.getElementById(SLIDER);
  const change = document.getElementById(CHANGE_TEXT);
  const profit = document.getElementById(PROFIT_TEXT);
  const sliderVal = document.getElementById(SLIDER_VAL);
  const optionPrice = document.getElementById(OPTION_PRICE);

  //Function to round share price
  const roundSharePrice = (x) => {
    test = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(x);
    return test;
}

  let entSharePrice = 14.00;
  let entOptionPrice = 10.08;
   
  //Fixed vals
  const entainOptionPrice = 10.08;
  const liveSharePrice = entSharePrice;
  sharePrice.textContent = roundSharePrice(liveSharePrice);
  optionPrice.textContent = roundSharePrice(entOptionPrice);

  //Set currency vals
  let currencyCode = 'GBP';

    const updateTotals = (savingsVal, increaseVal) => {
        
      const roundMeCurrency = (x) =>{
        test = new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: currencyCode,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(x);
        return test;
    }

      const roundMe = (x) =>{
        test = new Intl.NumberFormat().format(x);
        return test;
    }

        updateInitial = savingsVal * 36;
        updateNumber = Math.floor(updateInitial / entainOptionPrice);
        updateValue = Math.round(updateNumber * entSharePrice);
        updateChange = updateValue * (1+(increaseVal/100));
        updateProfit = updateChange - updateInitial;
        
        initial.textContent = roundMeCurrency(updateInitial);
        number.textContent = roundMe(updateNumber);
        value.textContent = roundMeCurrency(updateValue);
        change.textContent = roundMeCurrency(updateChange);
        profit.textContent = roundMeCurrency(updateProfit);
        //sliderVal.textContent = roundMeCurrency(increaseVal);

    }

    savings.addEventListener('input', () => {
    
        const savingsVal = savings.value;
        const increaseVal = increase.value;

    
        updateTotals(savingsVal, increaseVal)
  });

    increase.addEventListener('input', () => {

      const savingsVal = savings.value;
      const increaseVal = increase.value;

       updateTotals(savingsVal, increaseVal)
  });


    savings.addEventListener('input', (e) => {
    const isValid = e.target.reportValidity();
    // other code from before
    e.target.setAttribute('aria-invalid', !isValid);
  });

  
});