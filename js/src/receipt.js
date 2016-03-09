$(document).ready(function() {
  generateReceipt();
  setReceipt();
  clearCart();
  backButtonClick();
});

function generateReceipt() {
  var carts = getLocalStorage("carts");
  var items = getLocalStorage("items");
  var receiptList = getLocalStorage("receiptList");
  var myDate = new Date();
  var time = myDate.toGMTString();

  $("#time").text("时间" + time);
  $("#operator").text("操作员：老司机");

  carts.forEach(function(cart) {
    items.forEach(function(item) {
      if(cart.id === item.id) {
        var htmlContext = "";
        htmlContext += "<tr>";
        htmlContext += "<td>" + item.name + "</td>";
        htmlContext += "<td>" + item.price + "</td>";
        htmlContext += "<td>" + cart.count + "</td>";
        htmlContext += "<td>" + item.price * cart.count + "</td>";
        htmlContext += "</tr>";
        $("table").append(htmlContext);
        receiptList.push({id:cart.id, subtotal: item.price * cart.count});
      }
    });
  });
}

function setReceipt() {
  var carts = getLocalStorage("carts");
  var items = getLocalStorage("items");
  var receiptList = getLocalStorage("receiptList");
  var receipt = [];

  carts.forEach(function(cart) {
    items.forEach(function(item) {
      if(cart.id === item.id) {
        var subtotal = item.price * cart.count;
        receipt.push({id: cart.id, subtotal: subtotal, count: cart.count});
      }
    });
  });
  receiptList.push(receipt);
  setLocalStorage("receiptList", receiptList);
}

function clearCart() {
  setLocalStorage("carts", []);
}

function backButtonClick() {
  $("[name='back']").click(function() {
    document.location.href = 'list.html';
  });
}