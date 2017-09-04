
// Business Logic
function Pizza(size, toppings, cost) {
  this.size = size;
  this.toppings = toppings;
  this.cost = cost;
}

function Customer(fullName, street, city, zip) {
  this.fullName = fullName;
  this.street = street;
  this.city = city;
  this.zip = zip;
}

Pizza.prototype.getSizeCost = function(size, toppings) {
  if(this.size == "Small") {
    this.cost += 8;
  } else if(this.size == "Medium") {
    this.cost += 10;
  } else if(this.size == "Large") {
    this.cost += 12;
  }
  for(i = 0; i < this.toppings.length; i++) {
    this.cost += 1;
  }
}

// Interface Logic
$(document).ready(function(){
  $("input#delivery").click(function(){
    $("#delivery-address").show();
  });
  $("form#form-pizza").submit(function(event){
  var toppings = [];
  var cost = 0;
  var size = $("select#size").val();
  var orderType = $('input[name=orderType]').val();
    $("input:checkbox[name=topping]:checked").each(function() {
      toppings.push($(this).val());
      event.preventDefault();
    });

    var orderedPizza = new Pizza(size, toppings, cost);

    orderedPizza.getSizeCost();
    $("#complete-order").append("$" + orderedPizza.cost +
    "<br>Selected size: <p>"  +  orderedPizza.size +
    "</p>Selected toppings: <p>" + orderedPizza.toppings);

    $("#complete-order").show();
    $(".form-container").hide();

    if(orderType =="delivery") {
      var fullName = $("input#full-name").val();
      var street = $("input#street").val();
      var city = $("input#city").val();
      var zip = $("input#zip").val();
      var customer = new Customer(fullName, street, city, zip);
      $("#customer-address").append("Here is your order receipt:<br>"
      + customer.fullName + "<br>" + customer.street +
      "<br>" + customer.city + " " + customer.zip + "<br>");
    }
  });
});
