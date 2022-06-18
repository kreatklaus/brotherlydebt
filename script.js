function insertData(json) {
  const table = document.getElementById('data')
  json.forEach((entry) => {
    const row = table.insertRow(-1)
    const values = Object.values(entry)

    // Amount
    const amnt = row.insertCell(-1)
    const amntText = document.createTextNode(entry.amount)
    amnt.appendChild(amntText)

    // Brother
    const brother = row.insertCell(-1)
    const brotherText = document.createTextNode(entry.brother)
    brother.appendChild(brotherText)

    // Date
    const date = row.insertCell(-1)
    const dateText = document.createTextNode(new Date(entry.date).toLocaleString().split(',')[0])
    date.appendChild(dateText)

    // Notes
    const notes = row.insertCell(-1)
    const notesText = document.createTextNode(entry.notes)
    notes.appendChild(notesText)

  })
  return json
}

function formatHeading(json) {
  const heading = document.getElementById('heading')
  const amount = document.getElementById('amount')
  const subheading = document.getElementById('subheading')

  const valkPayments = [],
    kreatPayments = []

  json.forEach((value) => {
    switch (value.brother) {
      case 'kreat':
        kreatPayments.push(value.amount)
        break

      default:
        valkPayments.push(value.amount)
        break
    }
  })

  const valkSum = sum(valkPayments)
  const kreatSum = sum(kreatPayments)

  getHigherOwed(valkSum, kreatSum, (headText, amountText, subHeadText) => {
    heading.innerHTML = headText
    amount.innerHTML = `$${amountText}`
    subheading.innerHTML = subHeadText
  })
}

function getHigherOwed(valk, kreat, cb) {
  if (valk > kreat) cb('Kreat owes Valk', valk - kreat, 'OH WHAT A DAY!')
  else if (kreat > valk) cb('Valk owes Kreat', kreat - valk, 'This is going in my cringe compilation!')
  else cb('The brothers owe nothing!', 0, '... but not for long!')

}

function sum(array) {
  return array.reduce((a, b) => a + b, 0)
}

function loadData() {
  fetch('./data.json')
    .then(res => res.json())
    .then(insertData)
    .then(formatHeading)
}

document.addEventListener("DOMContentLoaded", loadData)