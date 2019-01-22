return (
  <p>
    {`You have ${trans.shares} shares of ${trans.ticker} stock.`}
  </p>
)

let transactions = res.transactions.map(trans => {
  console.log(trans)
})

if (this.state.transactions) {
  return this.state.transactions.map(trans => {
    return (
      <div key={trans.id}>
        Transactions
        {trans.ticker.toUpperCase()} stock: {trans.shares} shares
      </div>
    )
  })
