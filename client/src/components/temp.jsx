return (
  <p>
    {`You have ${trans.shares} shares of ${trans.ticker} stock.`}
  </p>
)

let transactions = res.transactions.map(trans => {
)

end

<Menu className="navBar" inverted fixed="bottom">
  <Menu.Menu position='right'>
  <Menu.Item name='login' as={Link} to='/login' />
  <Menu.Item name='register' as={Link} to='/register' />
  <Menu.Item name='portfolio' as={Link} to='/portfolio' />
  <Menu.Item name='transactionHistory' as={Link} to='/transactionHistory' />
  <Menu.Item name='logout' onClick={this.handleLogout} />
  </Menu.Menu>
</Menu>
