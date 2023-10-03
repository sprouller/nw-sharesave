document.addEventListener('DOMContentLoaded', () => {

  // IDs of inputs
  const COUNTRY_SELECT = 'input[name="country"]';
  const INCOME_INPUT = 'annualIncome';
  const MONTHLY_INVESTMENT_INPUT = 'monthlyInvestment';
  const CALCULATE_BUTTON = 'calculate';

  // Get elements based on IDs of inputs
  const selectedCountryInput = document.querySelectorAll(COUNTRY_SELECT);
  const annualIncomeInput = document.getElementById(INCOME_INPUT);
  const monthlyInvestmentInput = document.getElementById(MONTHLY_INVESTMENT_INPUT);
  const calculateButton = document.getElementById(CALCULATE_BUTTON);

  // IDs of Results
  const MONTHLY_SAVINGS_RESULT = 'monthlySavings';
  const TRUE_COST_OF_SHARES = 'trueSharesCost';

  // Get elements based on IDs of results
  const monthlyInvestmentResult = document.getElementById(MONTHLY_SAVINGS_RESULT);
  const trueCostOfSharesResult = document.getElementById(TRUE_COST_OF_SHARES);

  //Tax Bands
  let eng0 = 0;
  let eng1 = 32;
  let eng2 = 42;
  let eng3 = 47;

  let scot0 = 0;
  let scot1 = 31;
  let scot2 = 32;
  let scot3 = 33;
  let scot4 = 53;
  let scot5 = 43;
  let scot6 = 48;
  
  // Initialize the live share price as null
  let annualIncome = 0; // default value
  let monthlyInvestment = 0;  // default value
  let taxCalc = 0;
  let country = 'england'//
  
  // Add click event listener to each radio button
  selectedCountryInput.forEach(radio => {
    radio.addEventListener('change', function() {
      country = this.value; // use outer-scope country variable
      console.log(country);
    });
  });
    
  // Add event listeners here if they depend on the fetched share price
  calculateButton.addEventListener('click', () => {
    annualIncome = parseFloat(stripNumber(annualIncomeInput.value));
    monthlyInvestment = parseFloat(stripNumber(monthlyInvestmentInput.value));

if (country === "england") {
  if (annualIncome > 150000) {
      taxCalc = monthlyInvestment * (1 - (eng3 / 100));
  } else if (annualIncome > 50270) {
      taxCalc = monthlyInvestment * (1 - (eng2 / 100));
  } else if (annualIncome > 12570) {
      taxCalc = monthlyInvestment * (1 - (eng1 / 100));
  } else {
      taxCalc = monthlyInvestment;
  }
} else if (country === "scotland") {
  if (annualIncome > 150000) {
      taxCalc = monthlyInvestment * (1 - (scot6 / 100));
  } else if (annualIncome > 50270) {
      taxCalc = monthlyInvestment * (1 - (scot5 / 100));
  } else if (annualIncome > 43662) {
      taxCalc = monthlyInvestment * (1 - (scot4 / 100));
  } else if (annualIncome > 25688) {
      taxCalc = monthlyInvestment * (1 - (scot3 / 100));
  } else if (annualIncome > 14732) {
      taxCalc = monthlyInvestment * (1 - (scot2 / 100));
  } else if (annualIncome > 12570) {
      taxCalc = monthlyInvestment * (1 - (scot1 / 100));
  } else {
      taxCalc = monthlyInvestment;
  }
} else {
  taxCalc = "Error";
}

let taxCalcRnd = Math.round(taxCalc * 100) / 100;

updateTotals(taxCalcRnd, monthlyInvestment);
});


  // Remove comma and pound sign from input
  const stripNumber = (textNumber) => {
    return textNumber.replace(/[£,]/g, "");
  }
  
  // Add commas and pound sign to input
  const addSymbolsToInput = (numberInput) => {
    return numberInput.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  
  // Update the totals
  const updateTotals = (taxCalcRnd, monthlyInvestment) => {
      const roundMeCurrency = (x) => {
          return new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
          }).format(x);
      }

      trueCostOfSharesResult.textContent = roundMeCurrency(taxCalcRnd);
      monthlyInvestmentResult.textContent = roundMeCurrency(monthlyInvestment - taxCalcRnd);
  }

  // Add event listener to validate annual income input
  annualIncomeInput.addEventListener('input', (e) => {
    annualIncomeInput.value = addSymbolsToInput(annualIncomeInput.value);
    annualIncomeInput.value = "£" + annualIncomeInput.value;

    let numericValue = stripNumber(annualIncomeInput.value);

    // Validation code
    const minVal = 20000; // example minimum valid annual income
    const maxVal = 500000; // example maximum valid annual income
    
    if (numericValue < minVal || numericValue > maxVal) {
        annualIncomeInput.setCustomValidity(`Income must be between £${minVal.toLocaleString()} and £${maxVal.toLocaleString()}.`);
    } else {
        annualIncomeInput.setCustomValidity(''); // reset message when valid
    }

    const isValid = e.target.reportValidity();
    e.target.setAttribute('aria-invalid', !isValid);
  });

  // Add event listener to validate annual income input
  monthlyInvestmentInput.addEventListener('input', (e) => {
    monthlyInvestmentInput.value = addSymbolsToInput(monthlyInvestmentInput.value);
    monthlyInvestmentInput.value = "£" + monthlyInvestmentInput.value;

    let numericValue = stripNumber(monthlyInvestmentInput.value);

    // Validation code
    const minVal = 5; // example minimum valid annual income
    const maxVal = 150; // example maximum valid annual income
    
    if (numericValue < minVal || numericValue > maxVal) {
      monthlyInvestmentInput.setCustomValidity(`Income must be between £${minVal.toLocaleString()} and £${maxVal.toLocaleString()}.`);
    } else {
      monthlyInvestmentInput.setCustomValidity(''); // reset message when valid
    }

    const isValid = e.target.reportValidity();
    e.target.setAttribute('aria-invalid', !isValid);
  });
});
