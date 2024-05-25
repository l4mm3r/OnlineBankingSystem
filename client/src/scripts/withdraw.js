const PORT = 9998
const id = window.sessionStorage.getItem('id')
const username = window.sessionStorage.getItem('username')

const jsonUrl = `http://localhost:${PORT}/api/banking-operation/balance/${id}`
const jsonUrlWithdraw = `http://localhost:${PORT}/api/banking-operation/withdraw`

const jsonUrlBalance = async () => {
  try {
    const response = await fetch(jsonUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data.balance
  } catch (error) {
    console.error(error)
  }
}

const fetchWithdraw = async (amount) => {
  try {
    const sendWithdraw = await fetch(jsonUrlWithdraw, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        amount
      })
    }
    )
  } catch (error) {
    console.error(error)
  }
}

const displayUsername = (username) => {
  document.getElementById('usernameGlobal').innerText = username
}
displayUsername(username)

const displayBalance = async () => {
  const balance = await jsonUrlBalance()
  document.getElementById('totalBalance').innerText = `$ ${balance}`
}
displayBalance()

document.getElementById('userinfoWithdraw').addEventListener('submit', async (event) => {
  event.preventDefault()

  try {
    const amount = document.getElementById('withdrawAmount').value
    await fetchWithdraw(amount)
    displayBalance()
    document.getElementById('withdrawAmount').value = ''
  } catch (error) {
    console.error(error)
  }
})
