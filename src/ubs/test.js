import data from './data.json'

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

  let summary = [];
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
  var uk_more = data.filter(d => d.Country === '').reduce((act, r) => {
    act += r.Amount * 1.21
    return act;
  }, 0)
  summary.UK += uk_more

  return summary;
}

getCountryData(data);
/**
 DK: 2
 IND:1
 IRL:2
 NOR:3
 RUS:1
 UK:5
 USA:5
 */

getTotalValuePerCountry(data);

/** the resule:
 DK:  1342831391.33
 IND: 919833078.8900001
 IRL: 1297342550.02
 NOR: 2298040605.4100003
 RUS: 123387896.39000002
 UK:  44808330.66824288
 USA: 30432366.44047001
 */