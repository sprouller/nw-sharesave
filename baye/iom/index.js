document.addEventListener('DOMContentLoaded', () => {

  // IDs of inputs
  const INCOME_INPUT = 'annualIncome';
  const MONTHLY_INVESTMENT_INPUT = 'monthlyInvestment';
  const CALCULATE_BUTTON = 'calculate';

  // Get elements based on IDs of inputs
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
  let iom0 = 0;
  let iom1 = 11;
  let iom2 = 21;
  let iom3 = 31;
  let iom4 = 21;
  
  // Initialize the live share price as null
  let annualIncome = 0; // default value
  let monthlyInvestment = 0;  // default value
  let taxCalc = 0;
    
  // Add event listeners here if they depend on the fetched share price
  calculateButton.addEventListener('click', () => {
    annualIncome = parseFloat(stripNumber(annualIncomeInput.value));
    monthlyInvestment = parseFloat(stripNumber(monthlyInvestmentInput.value));

  if (annualIncome > 44928) {
      taxCalc = monthlyInvestment * (1 - (iom4 / 100));
  } else if (annualIncome > 44928) {
      taxCalc = monthlyInvestment * (1 - (iom3 / 100));
  } else if (annualIncome > 21000) {
      taxCalc = monthlyInvestment * (1 - (iom2 / 100));
  } else if (annualIncome > 14500) {
      taxCalc = monthlyInvestment * (1 - (iom1 / 100));
  } else {
      taxCalc = monthlyInvestment;
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
