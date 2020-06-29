// const houseValue = parseFloat(document.querySelector("#home-value").value);
// const equity = parseFloat(document.querySelector("#equity").value);
// const interestRate =
//   parseFloat(document.querySelector("#interest-rate").value) / 100;
// const loanTerm = parseFloat(document.getElementById("loan-term").value);
// const commonCost =
//   parseFloat(document.querySelector("#common-cost").value) * 12;
// const years = parseFloat(document.querySelector("#years").value) + 1;
// const houseGrowth = parseFloat(document.querySelector("#growth").value) / 100;

// const initialLoan =
//   parseFloat(document.querySelector("#home-value").value) - equity;

// const annualRent =
//   parseFloat(document.querySelector("#renting-price").value) * 12;
// const investmentGrowth = parseFloat(
//   document.querySelector("#invest_rate").value / 100
// );

// <--- Helper Functions Owning--->
const yearlyDownPayment = (houseValue, equity, interestRate, loanTerm) => {
  let principal = parseFloat(houseValue - equity);
  let percentageRate = (interestRate / 1200) * 100;
  let lengthOfLoan = 12 * loanTerm;
  let monthlyPayment =
    (principal * percentageRate) /
    (1 - Math.pow(1 + percentageRate, lengthOfLoan * -1));
  monthlyPayment = monthlyPayment.toFixed(2);
  return +monthlyPayment * 12;
};

const estateValue = (houseValue, houseGrowth, years) => {
  const valueArr = [houseValue];
  let copyHouseValue = houseValue;
  for (let i = 1; i < years; i++) {
    copyHouseValue *= 1 + houseGrowth;
    valueArr.push(copyHouseValue);
  }

  return valueArr;
};

const remainingDebt = (
  houseValue,
  equity,
  years,
  downPayment,
  interestRate
) => {
  debtArr = [houseValue - equity];
  for (let i = 1; i < years; i++) {
    debtArr.push(debtArr[i - 1] - downPayment + interestRate * debtArr[i - 1]);
  }
  return debtArr;
};

const owningCost = (commonCost, years, houseValue, houseGrowth) => {
  const estateValArr = estateValue(houseValue, houseGrowth, years);
  const costArr = [estateValArr[0] * 0.025];
  for (let i = 1; i < years; i++) {
    costArr.push(
      commonCost + estateValArr[i] * 0.0025 + estateValArr[0] * 0.025
    );
  }
  return costArr;
};

const costOfSelling = (houseValue, houseGrowth, years) => {
  const costSellingArr = new Array(years - 1).fill(0);
  const estateValArr = estateValue(houseValue, houseGrowth, years);
  costSellingArr.push(estateValArr[years - 1] * 0.01 + 50000);
  return costSellingArr;
};

const taxShield = (houseValue, equity, years, downPayment, interestRate) => {
  const taxShieldArr = [0];
  const remainingDebtArr = remainingDebt(
    houseValue,
    equity,
    years,
    downPayment,
    interestRate
  );
  for (let i = 1; i < years; i++) {
    taxShieldArr.push(remainingDebtArr[i - 1] * interestRate * 0.22);
  }
  return taxShieldArr;
};

// <--- Helper Functions Renting--->

const rent = (annualRent, years) => {
  rentArr = [0, annualRent];
  for (let i = 2; i < years; i++) {
    rentArr.push(rentArr[i - 1] * 1.013);
  }
  return rentArr;
};

const yearlySavings = (
  downPayment,
  annualRent,
  commonCost,
  years,
  houseValue,
  houseGrowth,
  equity,
  interestRate
) => {
  rentArr = rent(annualRent, years);
  costArr = owningCost(commonCost, years, houseValue, houseGrowth);
  taxShieldArr = taxShield(
    houseValue,
    equity,
    years,
    downPayment,
    interestRate
  );
  yearlySavingsArr = [0];
  for (let i = 1; i < years; i++) {
    yearlySavingsArr.push(
      downPayment - rentArr[i] + costArr[i] - taxShieldArr[i]
    );
  }
  return yearlySavingsArr;
};

// <--- Final functions --->
const valueRenting = (
  downPayment,
  annualRent,
  commonCost,
  years,
  houseValue,
  houseGrowth,
  equity,
  interestRate,
  investmentGrowth
) => {
  const yearlySavingsArr = yearlySavings(
    downPayment,
    annualRent,
    commonCost,
    years,
    houseValue,
    houseGrowth,
    equity,
    interestRate
  );
  const valueRentingArr = [equity];
  for (let i = 1; i < years; i++) {
    valueRentingArr.push(parseInt(
      (valueRentingArr[i - 1] + yearlySavingsArr[i]) * (1 + investmentGrowth))
    );
  }
  return valueRentingArr;
};

const valueOwning = (
  houseValue,
  houseGrowth,
  years,
  equity,
  downPayment,
  interestRate,
  commonCost
) => {
  const estateValueArr = estateValue(houseValue, houseGrowth, years);
  const remainingDebtArr = remainingDebt(
    houseValue,
    equity,
    years,
    downPayment,
    interestRate
  );
  const owningCostArr = owningCost(commonCost, years, houseValue, houseGrowth);
  const costOfSellingArr = costOfSelling(houseValue, houseGrowth, years);
  const taxShieldArr = taxShield(
    houseValue,
    equity,
    years,
    downPayment,
    interestRate
  );
  const valueOwningArr = [];
  for (let i = 0; i < years; i++) {
    valueOwningArr.push(parseInt(
      estateValueArr[i] -
        remainingDebtArr[i] -
        owningCostArr[i] -
        costOfSellingArr[i] +
        taxShieldArr[i]
    ));
  }
  return valueOwningArr;
};

document.querySelector("#button").onclick = () => {
  const houseValue = parseFloat(document.querySelector("#home-value").value);
  const equity = parseFloat(document.querySelector("#equity").value);
  const interestRate =
    parseFloat(document.querySelector("#interest-rate").value) / 100;
  const loanTerm = parseFloat(document.getElementById("loan-term").value);
  const commonCost =
    parseFloat(document.querySelector("#common-cost").value) * 12;
  const years = parseFloat(document.querySelector("#years").value) + 1;
  const houseGrowth = parseFloat(document.querySelector("#growth").value) / 100;
  const annualRent =
    parseFloat(document.querySelector("#renting-price").value) * 12;
  const investmentGrowth = parseFloat(
    document.querySelector("#invest_rate").value) / 100;
  const downPayment = parseFloat(
    yearlyDownPayment(houseValue, equity, interestRate, loanTerm)
  );

  const valueOwningArr = valueOwning(
    houseValue,
    houseGrowth,
    years,
    equity,
    downPayment,
    interestRate,
    commonCost
  )
  const valueRentingArr = valueRenting(
    downPayment,
    annualRent,
    commonCost,
    years,
    houseValue,
    houseGrowth,
    equity,
    interestRate,
    investmentGrowth
  ); 
  document.querySelector(
    "#own-data"
  ).innerHTML = `Owning: ${valueOwningArr[years-1]} vs. Renting: ${valueRentingArr[years-1]}`;
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: [...Array(years).keys()],
      datasets: [
        {
          label: "Owning",
          borderColor: "rgb(255, 99, 132)",
          data: valueOwningArr,
        },
        {
          label: "Renting",
          borderColor: "rgb(25, 99, 132)",
          data: valueRentingArr,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
};

// console.log(
//   valueOwning(
//     houseValue,
//     houseGrowth,
//     years,
//     equity,
//     downPayment,
//     interestRate,
//     commonCost
//   )
// );
// console.log(valueRenting(
//   downPayment,
//   annualRent,
//   commonCost,
//   years,
//   houseValue,
//   houseGrowth,
//   equity,
//   interestRate
// ));