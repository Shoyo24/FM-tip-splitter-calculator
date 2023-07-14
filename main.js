const inputBill = document.querySelector('.amount');
const inputPeople = document.querySelector('.number-people');
const inputCustom = document.querySelector('.custom');
const errors = document.querySelectorAll('.error');

const tipAmountPerPerson = document.querySelector('.tip-amount');
const totalAmountPerPerson = document.querySelector('.total-amount');

const percentage = document.querySelectorAll('.percent');
const resetButton = document.querySelector('.reset');

let billAmount = 0;
let tipAmount = 0;
let totalBill = 0;
let totalTip = 0;

resetButton.addEventListener('click', () => {
  [inputBill, inputPeople, inputCustom].forEach((input) => (input.value = ''));
  [tipAmountPerPerson, totalAmountPerPerson].forEach(
    (element) => (element.textContent = '0')
  );
  errors.forEach((error) => (error.style.display = 'none'));
  [inputBill, inputPeople].forEach((input) => (input.style.border = 'none'));

  billAmount = 0;
  tipAmount = 0;
  totalBill = 0;
  totalTip = 0;

  percentage.forEach((percent) => (percent.disabled = false));
});

inputBill.addEventListener('input', (e) => {
  billAmount = parseFloat(e.target.value);
  validate(billAmount, tipAmount);
});

inputPeople.addEventListener('input', (e) => {
  peopleAmount = parseFloat(e.target.value);

  if (peopleAmount > 0) {
    calculateBillPerPerson(billAmount, tipAmount, peopleAmount);
    calculateTipPerPerson(tipAmount, peopleAmount);
    DOM();
  } else {
    [tipAmountPerPerson, totalAmountPerPerson].forEach(
      (element) => (element.textContent = '0')
    );
  }
});

inputCustom.addEventListener('input', (e) => {
    customAmount = parseFloat(e.target.value) / 100;
  
    if (!isNaN(customAmount)) {
      tipAmount = Math.round(billAmount * customAmount * 100) / 100;
      totalTip = tipAmount / peopleAmount;
      tipAmountPerPerson.textContent = '$' + totalTip;
      totalAmountPerPerson.textContent = '$' + (billAmount + tipAmount);
    } else {
      tipAmountPerPerson.textContent = '$0';
      totalAmountPerPerson.textContent = '$0';
    }
  });

percentage.forEach((percent) => {
  percent.addEventListener('click', (e) => {
    const percentTextValue = e.target.textContent;
    const tipRate = parseFloat(percentTextValue) / 100;
    tipAmount = Math.round(billAmount * tipRate * 100) / 100;
    tipAmountPerPerson.textContent = '$' + tipAmount;
    totalAmountPerPerson.textContent = '$' + (billAmount + tipAmount);
    validate(billAmount, tipAmount);
  });
});

function calculateBillPerPerson(bill, tip, people) {
  totalBill = Math.round(((bill + tip) / people) * 100) / 100;
  console.log(`The total bill per person is $${totalBill}`);
}

function calculateTipPerPerson(tip, people) {
  totalTip = Math.round((tip / people) * 100) / 100;
  console.log(`The total tips per person is $${totalTip}`);
}

function DOM() {
  tipAmountPerPerson.textContent = '$' + totalTip;
  totalAmountPerPerson.textContent = '$' + totalBill;
}

function validate(billInput, tipInput) {
  if (billInput === 0 && tipInput <= 0) {
    errors.forEach((error) => (error.style.display = 'block'));
    [inputBill, inputPeople].forEach(
      (input) => (input.style.border = '2px solid red')
    );
  } else {
    errors.forEach((error) => (error.style.display = 'none'));
    [inputBill, inputPeople].forEach((input) => (input.style.border = 'none'));
  }
}