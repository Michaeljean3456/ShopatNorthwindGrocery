"use strict";
const searchTypeSectionDiv = document.getElementById("searchTypeSectionDiv");
const categorySelectionDiv = document.getElementById("categorySelectionDiv");
const productListingDiv = document.getElementById("productListingDiv");
const searchTypeSelect = document.getElementById("searchTypeSelect");
const categorySelect = document.getElementById("categorySelect");
const productListingTable = document.getElementById("productListingTable");


window.onload = function(){
    HideCategorySelectionDiv();
    HideProductListingDiv();
    PopulateCategorySelect();
    searchTypeSelect.onchange = onSearchTypeSelectChange;
    categorySelect.onchange = onCategorySelectChange;
    

    //todo wire up your event handlers...
}

function fetchAllProducts() {
    fetch("http://localhost:8081/api/products")
    .then((response) => response.json())
    .then((products) => {
      productListingTable.innerHTML = "";

      for (let product of products) {
        let newRow = productListingTable.insertRow(-1);

        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = product.productName;

        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = product.unitPrice;

        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = product.unitsInStock;

        let anchor = document.createElement("a");
        anchor.href = `details.html?productId=${product.productId}`;
        anchor.textContent = "See details";

        let cell4 = newRow.insertCell(3);
        cell4.appendChild(anchor);
      }
    });
  }

  function fetchProductsByCategory(categoryId) {
    fetch(`http://localhost:8081/api/categories/${categoryId}`)
      .then((response) => response.json())
      .then((categoryData) => {
        productListingTable.innerHTML = "";
  
        for (let product of categoryData) {
          let newRow = productListingTable.insertRow(-1);
  
          let cell1 = newRow.insertCell(0);
          cell1.innerHTML = product.productName;
  
          let cell2 = newRow.insertCell(1);
          cell2.innerHTML = product.unitPrice;
  
          let cell3 = newRow.insertCell(2);
          cell3.innerHTML = product.unitsInStock;

          let anchor = document.createElement("a");
          anchor.href = `details.html?productId=${product.productId}`;
          anchor.textContent= "See details";
  
          let cell4 = newRow.insertCell(3);
          cell4.appendChild(anchor);
        }
      });
  }
  

//EVENT HANDLER:  respond to the selection of a new search type:
function onSearchTypeSelectChange(){
    // three options:
    // 1)  "select one" -> just hide everything but this dropdown

    // 2) "category" - the category select needs to be displayed, then we wait for user 
    //                  to select a category in that new dropdown

    // 3) "view all" - show the product listing div and use the API to get 
    //              all products and add them to the table.
    let selectedValue = searchTypeSelect.value;

    if (selectedValue == "") {
        HideCategorySelectionDiv();
        HideProductListingDiv();
      } else if (selectedValue == "category") {
        ShowCategorySelectionDiv();
        HideProductListingDiv();
        categorySelect.innerHTML = ""; 
        PopulateCategorySelect(); 
      } else if (selectedValue == "viewall") {
        HideCategorySelectionDiv();
        ShowProductListingDiv();
        fetchAllProducts();
      }
}

//EVENT HANDLER:  respond to the selection of a new category
function onCategorySelectChange(){
    //figure out what was the categoryid of the selected category

    //use the /api/categories/{categoryId} API endpoint to get only the products
    // for this category.

    // loop through those filtered products and add them to the table
    let categoryId = categorySelect.value;
  
    if (categoryId != "") {
      ShowProductListingDiv();
      fetchProductsByCategory(categoryId);
    } else {
      HideProductListingDiv();
    }
  }


function PopulateCategorySelect(){
    //todo go to API to get an array of categories, 
    // loop through that and create optinos for the categorySelect dropdown.
    fetch("http://localhost:8081/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      for (let category of categories) {
        let option = document.createElement("option");
        option.value = category.categoryId;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      }
    });
}


function ShowCategorySelectionDiv(){
    //todo how to show this?
    categorySelectionDiv.style.display = 'block';
}

function HideCategorySelectionDiv(){
    //todo how to hide this?
    categorySelectionDiv.style.display = 'none';
}

function ShowProductListingDiv(){
    //todo
    productListingDiv.style.display = 'block';
}

function HideProductListingDiv(){
    //todo
    productListingDiv.style.display = 'none';
}
