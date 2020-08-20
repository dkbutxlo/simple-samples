/* global $ */
const csv = require('papaparse')
/**
 * Init Alpha Vantage with your API key.
 *
 * @param {String} key
 *   Your Alpha Vantage API key.
 */
const alpha = require('alphavantage')({
  key: '2ARHP1E9YTF3Z81Y'
});

// ist zwar schön, aber hat nur 500 api calls am tag :) 



// Run this function after the page has loaded



$(() => {
  let url
  const stocks = {
    'oil': 'CVAC.US', 
    'gold': 'BNTX.US', 
    // 'silver': 'AAPL.US' 
  }

  // Offizielle EUR Api
  let eurex = 'https://api.exchangeratesapi.io/latest?symbols=USD'
  $.getJSON(eurex, function (data) {
    let euro = data.rates.USD


    // STOOQ Api 
    for (let symbol in stocks) {
      url = `https://stooq.com/q/l/?s=${stocks[symbol]}&f=sd2t2ohlc&h&e=csv`


      // CSV Parse
      csv.parse(url, {
        download: true,
        delimiter: ',',
        complete: (results) => {
          // price data is the second array, first is headers
          const prices = results.data[1]
          const previousPrice = parseFloat(prices[3], 10)
          const currentPrice = parseFloat(prices[6], 10)
          let change = Math.round((currentPrice - previousPrice) * 100) / 100

          if (change >= 0) {
            change = `+${change}`
          }

          let hehe = currentPrice / euro

        
          $(`#${symbol}-price`).text(hehe.toLocaleString())
          $(`#${symbol}-change`).text(change)
       
          // mein Gewinn in Curevac? 
          let cv = "CVAV.US"
          if (results.data[1][0] === cv) {
            alert(ja)
          }
          console.log(results.data[1][0]);
        }
      })
    }

  })
})

  // TOP Aktie
  let tradegateurl = 'https://www.tradegate.de/json/indizes-DE000A1EXRY4.json'
  $.getJSON(tradegateurl, function (top) {
    let toptrade = top.toptitel.name
    let tradeaktie = 
    $('#top').text(toptrade.toLocaleString())
  });

    // L+S Exchange 
    // let lstecdax = 'https://www.ls-tc.de/_rpc/json/instrument/chart/dataForInstrument?container=chart1&instrumentId=43658&marketId=1&quotetype=mid&series=intraday%2Chistory%2Cflags&type=&localeId=2'
    // $.getJSON(lstecdax, function (ls) {
    //     let lstec = ls;
    //     console.log(ls)
    // });
