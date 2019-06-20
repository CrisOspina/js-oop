
// products
class Product {
  constructor(name, price, year) {
    this.name  = name;
    this.price = price;
    this.year  = year;
  }
}


// interacción con el html
class UI {
  addProduct(product){
    const productList = document.getElementById('product-list');
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <span>Product</span>: ${product.name} |
          <span>Product price</span>: ${product.price} |
          <span>Product year</span>: ${product.year} |
          <a name="delete" href="#" class="btn btn-secondary">Delete</a>
        </div>
      </div>
    `;

    //Add element in UI
    productList.appendChild(element);

    //Resert form after of insert
    this.resetForm();
  }

  resetForm(){
    document.getElementById('product-form').reset();
  }

  deleteProduct(element){
    if(element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage('Product deleted successfully', 'warning');
    }
  }

  showMessage(message, cssClass){
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    //showing in DOM
    const container = document.querySelector('.container');
    const app = document.querySelector('#App');
    container.insertBefore(div, app);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000)
  }
}




// DOM events
document.getElementById('product-form')
  .addEventListener('submit', function(e) {
    e.preventDefault()
    const name  = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year  = document.getElementById('year').value;

    //new product
    const product = new Product(name, price, year);
    const ui = new UI();

    if(name === '' || price === '' || year === '') return ui.showMessage('Complete fields please', 'info');

    ui.addProduct(product);

    ui.showMessage('Product added successfully', 'success');

  });

//Event click for delete element
document.getElementById('product-list')
  .addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target)
  });