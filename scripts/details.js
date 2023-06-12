"use strict";

const cardText = document.getElementById("cardText");

window.onload = function() {
  getCourseFromIndex();
};

function getCourseFromIndex() {
  let urlParams = new URLSearchParams(location.search);

  let id = -1;
  if (urlParams.has("productId")) {
    id = urlParams.get("productId");
  }

  let theUrl = "http://localhost:8081/api/products/" + id;

  fetch(theUrl)
    .then(response => response.json())
    .then(product => {
      console.log(product)
      showDetailForCourse(product);
    })
   
}

function showDetailForCourse(product) {

    cardText.innerHTML = `Product Name: <br> ${product.productName} <br>` +
                           `Price: <br> $${product.unitPrice} <br>` +
                           `In Stock: <br> ${product.unitsInStock} <br>` +
                           `Brand: <br> ${product.supplier} <br>`;
}
