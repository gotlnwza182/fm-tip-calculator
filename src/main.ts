const price = document.getElementById("price");
const personCount = document.getElementById("personCount");
const tipPerPerson = document.getElementById("tipPerPerson");
const totalPerPerson = document.getElementById("totalPerPerson");
const errText = document.getElementById("errTxt");
const percentBtns = document.querySelectorAll('button[type="button"]');
const customBtn = document.getElementById("customBtn");
const tipErr = document.getElementById("tipErr");
const errFirstTxt = document.getElementById("errFirstTxt");
const resetBtn = document.getElementById("resetBtn");

let totalPrice: number = 0;
let numOfPerson = 0;
let priceTip = 0;
console.log(percentBtns[0]);

const clearError = () => {
  errText?.classList.add("hidden");
  tipErr?.classList.add("hidden");
  errFirstTxt?.classList.add("hidden");
  personCount?.classList.remove("border-2", "border--orange-400");
};

const handdleError = () => {
  errText?.classList.remove("hidden");
  personCount?.classList.add("border-2", "border-orange-400");
};

const handleChange = (e: any) => {
  const value = parseInt(e.target.value);

  totalPrice = value;

  percentBtns.forEach((button) => {
    button.classList.remove("bg-green-200", "text-green-900");
  });

  clearError();
};

const calculate = (e: any) => {
  if (totalPrice > 0) {
    const percentTip = parseInt(e.target.value);
    priceTip = totalPrice + (totalPrice * percentTip) / 100;

    percentBtns.forEach((button) => {
      button.classList.remove("bg-green-200", "text-green-900");
    });

    e.target.classList.add("bg-green-200", "text-green-900");
  } else {
    tipErr?.classList.remove("hidden");
  }
};

percentBtns.forEach((button) => {
  button.addEventListener("click", calculate);
});

customBtn?.addEventListener("change", (e: any) => {
  const customTip = parseInt(e.target.value);
  if (customTip >= 0) {
    priceTip = totalPrice + (totalPrice * customTip) / 100;
  } else {
    console.log("Tip must more than 0%");
  }
});

const calPerPerson = (e: any) => {
  numOfPerson = parseInt(e.target.value);
  if (totalPrice > 0 && priceTip > 0) {
    if (numOfPerson !== 0) {
      const totalPerson = priceTip / numOfPerson;
      const tipPerson = (priceTip - totalPrice) / numOfPerson;

      tipPerPerson.innerText = tipPerson.toString();
      totalPerPerson.innerText = totalPerson.toString();
      clearError();
    } else {
      handdleError();
    }
  } else {
    errFirstTxt?.classList.remove("hidden");
    personCount?.classList.add("border-2", "border-orange-400");
    e.target.value = "";
  }
};

price?.addEventListener("change", handleChange);
personCount?.addEventListener("change", calPerPerson);
resetBtn?.addEventListener("click", () => {
  location.reload();
});
