
function getCountryData(data) {
  let countries = data.map(x=>x.Country).reduce((sum, c) => {
    if (c === "") c = 'UK'
    if (!sum[c]) sum[c] = 1;
    else sum[c] += 1;
    return sum;
  }, {});

  // expect countries to be ["USA", "UK", "IRL", "NOR", "DK", "RUS", "IND"]
  Object.keys(countries)
  // expect country list to be 19
  Object.values(countries).reduce((a, b)=>a + b, 0)
  return countries;
}

function getTotalValuePerCountry(data) {

  let countries = getCountryData(data);

  let summary = {};
  Object.keys(countries).forEach(c => {
    var ms = data.filter(d => d.Country === c).map(m => {
      var obj = {};
      obj[m.Currency] = m.Amount;
      return obj;
    }).reduce((act, r) => {
      var key = Object.keys(r)[0];
      if (key === 'GBP') act += r[key] * 1.21
      else if (key === 'CHF') act += r[key] * 1.10
      else act += r[key]
      return act;
    }, 0);
    summary[c] = ms;
  });

  // 2 empty Country code are 'UK'
  let uk_more = data.filter(d => d.Country === '').reduce((act, r) => {
    act += r.Amount * 1.21
    return act;
  }, 0)

  summary.UK += uk_more

  return summary;
}

export const ubsCalculate = (data) => {
  const summary = getTotalValuePerCountry(data);
  return {
    type: 'CALCULATE',
    payload: summary
  }
}

export const ubsReset = () => {
  return {
    type: 'RESET'
  }
}
