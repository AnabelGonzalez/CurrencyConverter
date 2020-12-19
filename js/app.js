let access_key = "66a118c2047898a82d6e126987a6b9df";

let flags = ["AUD.png", "USD.png"];
let flag_from = document.getElementById("flag-from");
let flag_to = document.getElementById("flag-to");
let from_input = document.getElementById("from");
let to_input = document.getElementById("to");
let change = document.getElementById("change");

//Read option value and change flag file name to match the selected option
flag_from.innerHTML = `<img src="./flags/${from_input.value}.png" width="30" class="cpt transition"/>`;
flag_to.innerHTML = `<img src="./flags/${to_input.value}.png" width="30" class="cpt transition"/>`;

//On option change, update flag
from_input.addEventListener("change", changeFlagFrom);
to_input.addEventListener("change", changeFlagTo);

function changeFlagFrom() {
  flag_from.innerHTML = `<img src="./flags/${from_input.value}.png" width="30" class="cpt"/>`;
}

function changeFlagTo() {
  flag_to.innerHTML = `<img src="./flags/${to_input.value}.png" width="30" class="cpt"/>`;
}

change.addEventListener("click", swap);

function swap(e) {
  e.preventDefault();

  let from_option = from_input.value;
  let to_option = to_input.value;

  from_input.value = to_option;
  to_input.value = from_option;

  changeFlagFrom();
  changeFlagTo();
}

//On Form submission, make API call
$("form").on("submit", function(e) {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let amount = document.getElementById("amount").value;

  //ajax call

  $.ajax({
    url: "http://data.fixer.io/api/latest?access_key=" + access_key,
    contentType: "application/json",
    dataType: "jsonp",
    success: function(json) {
      // Access and use your preferred validation result objects
      console.log(json.rates[from]);
      console.log(json.rates[to]);

      let from_rate = json.rates[from];
      let to_rate = json.rates[to];

      function convert() {
        total_euros = amount / from_rate;
        console.log(total_euros);
        total = total_euros * to_rate;
        console.log(total);
        total_round = total.toFixed(4);
        let result_div = document.getElementById("result");
        result_div.style.display = "block";
        result_div.innerHTML = `<span class="text-light converted">${total_round} ${to}</span>`;
        console.log(to);
      }

      convert();
    }
  });

  //stop form submission
  e.preventDefault();
});
