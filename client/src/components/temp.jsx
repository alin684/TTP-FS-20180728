return (
  <p>
    {`You have ${trans.shares} shares of ${trans.ticker} stock.`}
  </p>
)

let transactions = res.transactions.map(trans => {
  console.log(trans)
})

<Menu className="navBar" inverted fixed="bottom">
  <Menu.Menu position='right'>
  <Menu.Item name='login' as={Link} to='/login' />

</Menu>
