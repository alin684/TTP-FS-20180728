price => {
  if ((price * shares) < money) {
    fetch('/makeTransaction', {
      method: 'POST',
      body: JSON.stringify({ ticker, price, shares }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(res => {
      if (res) {
        this.getTransactions();
      } else {
        throw new Error("Not enough money");
      }
    })
  } else {
    throw new Error("Not enough money");
  }
})
