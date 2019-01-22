return (
  <p>
    {`You have ${trans.shares} shares of ${trans.ticker} stock.`}
  </p>
)

let transactions = res.transactions.map(trans => {
  console.log(trans)
})

render() {
  return (
    <div>
      {this.showTransactions()}
    </div>
