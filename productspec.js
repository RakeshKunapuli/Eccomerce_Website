document.addEventListener("DOMContentLoaded", function () {
  var queryParams = new URLSearchParams(window.location.search);
  var Id = queryParams.get("item");
  var specMain = document.querySelector(".main");
  var cartCounter = document.querySelector('.counter')
const cartIcon = document.getElementById('cartIcon')

  async function fetchData() {
    try {
      var response = await fetch("Ecommerce.json");
      var data = await response.json();
      var product = data.products.find((p) => p.id == Id);
      // console.log(product);
      productsSpec(product);
    } catch (error) {
      console.error("404 unable to fetch data", error);
    }
  }
  fetchData();
  function productsSpec(product) {
    var productSpecMain =document.createElement('div')
    productSpecMain.classList.add('productspec-main')
    // Main iamge to display
    var mainImage = document.createElement('div')
    mainImage.classList.add('main-image')
var img = document.createElement('img')
img.src = `${product.thumbnail}`
mainImage.appendChild(img)

 var maindetails = document.createElement('div')
 maindetails.classList.add('main-details')

 var description = document.createElement('p')
 description.innerHTML =`<b>Description:</b>${product.description}`

 var title =document.createElement('p')
 title.innerHTML = `<b>Title:</b>${product.title}`

 var price =document.createElement('p')
 price.innerHTML = `<b>Price:<sup>$</sup></b>${product.price}`

 var brand =document.createElement('p')
 brand.innerHTML = `<b>Brand:</b>${product.brand}`

 var rating =document.createElement('p')
 rating.innerHTML = `<b>Rating:</b>${product.rating}`

 var additionalImages = document.createElement('div')
 additionalImages.classList.add('additional-images')

 product.images.forEach((image,i)=>{
  var imagecontainer = document.createElement('div')
  imagecontainer.classList.add(`image-container`)

  var imageElement = document.createElement('img')
  imageElement.src =image

  imagecontainer.appendChild(imageElement)
// var images = document.querySelector('.images')
imageElement.addEventListener('click',function(){
document.querySelectorAll('.image-container').forEach((imagecontainer)=>{
  imagecontainer.classList.remove('active')
})
imagecontainer.classList.add('active')
img.src = image
})
additionalImages.appendChild(imagecontainer)
 })

 if (additionalImages.children.length > 0) {
  additionalImages.children[0].classList.add('active');
}

var cartItems = JSON.parse(localStorage.getItem('cart')) || []
updateCount()

 var buttonDiv = document.createElement('div')
 buttonDiv.classList.add('buttonDiv')
 
 var addTocart = document.createElement('button')
 addTocart.classList.add('addToCart')


 function updateCount(){
  var totalCount = cartItems.length
  cartCounter.innerText = totalCount
 }

 addTocart.innerText="AddToCart"
 addTocart.addEventListener('click',function(){
  var cart ={
    id:`${product.id}`,
    brand:`${product.brand}`,
    image:`${product.thumbnail}`,
    price:`${product.price}`,
    title:`${product.title}`,
    description:`${product.description}`
  }
cartItems.push(cart)
updateCount()
localStorage.setItem('cart', JSON.stringify(cartItems));
alert("Item Added To the cart")
 })

cartIcon.addEventListener('click',function(){
  window.location.href ='./cart.html'
})

maindetails.appendChild(description)
maindetails.appendChild(title)
maindetails.appendChild(price)
maindetails.appendChild(brand)
maindetails.appendChild(rating)
maindetails.appendChild(additionalImages)
buttonDiv.appendChild(addTocart)
maindetails.appendChild(buttonDiv)


productSpecMain.appendChild(mainImage)
productSpecMain.appendChild(maindetails)


specMain.appendChild(productSpecMain)

}
});