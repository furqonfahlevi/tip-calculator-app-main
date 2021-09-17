// DOM Elements --- Input Form
var billInput = $("#bill-input");
var customInput = $("#custom-input");
var peopleInput = $("#people-input");

// DOM Elements --- Display
var tipAmount = $("#tip-amount");
var totalAmount = $("#total-amount");

// DOM Elements --- Button
var percentBtn = $(".percent");

// Addition Var
var billInputVal;
var percentBtnVal;
var customInputVal;
var peopleInputVal;
var percentVal;
var flag = {
  bill: false,
  tip: false,
  people: false,
};

// Reset or Clear all the inputs
$(document).ready(clearInput);
$("#reset").on("click", clearInput);

function clearInput() {
  billInput.val("");
  customInput.val("");
  peopleInput.val("");
  tipAmount.text("$0.00");
  totalAmount.text("$0.00");
  percentBtn.removeClass("active");
  $("#reset").addClass("deactive");
  clearErrorMessage();
  flag = {
    bill: false,
    tip: false,
    people: false,
  };
  disableResetButton();
}

// Function Input
billInput.on("input", function () {
  billInputVal = parseInt(billInput.val()) || false;
  flag.bill = !!billInputVal;
  calculate();
  console.log({ billInputVal });
});

percentBtn.on("click", function () {
  percentBtn.removeClass("active");
  $(this).toggleClass("active");
  percentVal = parseInt($(this).text());
  percentVal = percentVal * 0.01;
  flag.tip = true;
  calculate();
  console.log(percentVal);
});

customInput.on("input", function () {
  percentVal = parseInt(customInput.val()) || false;
  percentVal = percentVal * 0.01;
  flag.tip = !!percentVal;
  calculate();
  console.log(percentVal);
});

customInput.on("click", function () {
  percentBtn.removeClass("active");
  percentVal = 0;
});

peopleInput.on("input", function () {
  peopleInputVal = parseInt(peopleInput.val()) || 0;
  if (peopleInputVal === 0) {
    showErrorMessage();
    flag.people = false;
  } else {
    flag.people = true;
    clearErrorMessage();
  }
  calculate();
  console.log({ peopleInputVal });
});

// Function Calculation
function calculate() {
  var dirty = flag.bill || flag.tip || flag.people;
  var isFilled = flag.bill && flag.tip && flag.people;

  if (dirty) {
    enableResetButton();
  } else {
    disableResetButton();
  }

  if (isFilled) {
    var tip = (billInputVal * percentVal) / peopleInputVal;
    var total = billInputVal / peopleInputVal + tip;

    tipAmount.text(`$${tip.toFixed(2)}`);
    totalAmount.text(`$${total.toFixed(2)}`);

    console.log(tip, total);
  }
}

// Function Disable Reset Button
function disableResetButton() {
  $("#reset").attr("disabled", true);
  $("#reset").addClass("deactive");
  console.log("masuk gan");
}

function enableResetButton() {
  $("#reset").removeAttr("disabled");
  $("#reset").removeClass("deactive");
}

// Error Message
function showErrorMessage() {
  $("#text-alert").addClass("alert-text").show();
  peopleInput.addClass("alert-outline");
}

function clearErrorMessage() {
  $("#text-alert").removeClass("alert-text").hide();
  peopleInput.removeClass("alert-outline");
}
