let access_key = "66a118c2047898a82d6e126987a6b9df";

$("form").on("submit", function(e) {
  //ajax call here
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let amount = document.getElementById("amount").value;

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
