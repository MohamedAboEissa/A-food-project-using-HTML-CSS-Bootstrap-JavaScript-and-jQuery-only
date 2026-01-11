// =========================
// Menu
// ==========================
$('#example').gridAccordion({

    // width/height
    width: 1200,
    height: 800,

    // enable responsive layout
    responsive: true,

    // 'auto' or 'custom'
    responsiveMode: 'auto',

    // aspect ratio
    aspectRatio: -1,

    // 'horizontal' or 'vertical'.
    orientation: 'horizontal',

    // 0 for the first panel
    startPanel: -1,

    // number of rows
    rows: 3,

    // number of columns
    columns: 3,

    // the size of the opened panel
    // fixed or percentage value
    openedPanelWidth: 'max',
    openedPanelHeight: 'max',

    // max size of opened panel
    maxOpenedPanelWidth: '60%',
    maxOpenedPanelHeight: '60%',

    // 'hover', 'click', or 'never'
    openPanelOn: 'hover',

    // close the opened panels on mouse out
    closePanelsOnMouseOut: true,

    // the delay in milliseconds between the movement of the mouse pointer and the opening of the panel
    mouseDelay: 200,

    // the distance between consecutive panels
    panelDistance: 0,

    // duration on ms
    openPanelDuration: 700,
    closePanelDuration: 700,
    // page<a href="https://www.jqueryscript.net/tags.php?/Scroll/">Scroll</a>Duration: 500,

    // easing function
    pageScrollEasing: 'swing',

    
    // 0 for the first page
    startPage: 0,

    // adds shadow to the accordion slider
    shadow: true,

    // autoplay options
    autoplay: true,
    autoplayDelay: 4000,
    autoplayDirection: 'normal', // 'normal' or 'backwards
    autoplayOnHover: 'pause', // 'pause', 'stop' or 'none'

    // keyboard options
    keyboard: true,
    keyboardOnlyOnFocus: false,
    keyboardTarget: 'panel', // 'panel' or 'page',

    // mousewheel options
    mouseWheel: true,
    mouseWheelSensitivity: 10,
    mouseWheelTarget: 'panel', // 'panel' or 'page'

    // swap background options
    swapBackgroundDuration: 200,
    fadeOutBackground: false,

    // touch swipe opitons
    touchSwipe: true,
    touchSwipeThreshold: 50,

    // 'playVideo' or 'none'
    openPanelVideoAction: 'playVideo',

    // 'pauseVideo' or 'stopVideo'
    closePanelVideoAction: 'pauseVideo',

    // 'stopAutoplay' or 'none'
    playVideoAction: 'stopAutoplay',

    // 'startAutoplay' or 'none'
    pauseVideoAction: 'none',

    // 'startAutoplay', 'nextPanel', 'replayVideo' or 'none'
    endVideoAction: 'none',

});



// =========================
// price content
// =========================
class CartItem{
    constructor(name, img, price){
        this.name = name
        this.img=img
        this.price = price
        this.quantity = 1
    }
}

class LocalCart{
    static key = "cartItems"

    static getLocalCartItems(){
        let cartMap = new Map()
        const cart = localStorage.getItem(LocalCart.key)   
        if(cart===null || cart.length===0)  return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity +=1
            cart.set(id, mapItem)
        }
        else
        cart.set(id, item)
        localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
        
    }

    static removeItemFromCart(id){
    let cart = LocalCart.getLocalCartItems()
    if(cart.has(id)){
        let mapItem = cart.get(id)
        if(mapItem.quantity>1)
    {
        mapItem.quantity -=1
        cart.set(id, mapItem)
    }
    else
        cart.delete(id)
    } 
    if (cart.length===0)
    localStorage.clear()
    else
    localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
    }
}


const addToCartBtns = document.querySelectorAll('.btn-order')
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
})

const priceContent = document.querySelector('.price-content')
const totalPrice  = document.querySelector('.price-content .totals .total-price');
function addItemFunction(e){
    // Show the total price so that the customer can see how much he will pay
    priceContent.style.display = "block";
    totalPrice.style.display = "block";
    const id = e.target.parentElement.getAttribute("data-id")
    const img = e.target.parentElement.getElementsByClassName('img-product')[0].src
    const name = e.target.parentElement.getElementsByClassName('shop-item-title')[0].textContent;
    const prices = e.target.parentElement.getElementsByClassName('price')[0].textContent;
    const price = prices.replace("$", '')
    const item = new CartItem(name, img, price)
    LocalCart.addItemToLocalCart(id, item)
}


function updateCartUI(){
    const cartWrapper = document.querySelector('.content-cart')
    cartWrapper.innerHTML=""
    const items = LocalCart.getLocalCartItems()
    if(items === null) return
    let count = 0
    let total = 0
    for(const [key, value] of items.entries()){
        const cartItem = document.createElement('div')
        cartItem.classList.add('col-sm-6')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count+=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML =
        `
        <div class="product">
            <div class="product-img">
                <img src="${value.img}">
            </div>
            <div class="product-text">
                <span class="cancel"><i class="fa-solid fa-circle-xmark fa-2x"></i></span>
                <h3 class="name-product">${value.name}</h3>
                <div class="final-price">$ ${price}</div>
                <div class="product-number">${value.quantity}</div>
            </div>
        </div>
        `
    cartItem.children[0].children[1].firstElementChild.addEventListener('click', ()=>{
        LocalCart.removeItemFromCart(key)
    })
        cartWrapper.append(cartItem)
    }

    const numberProducts = document.querySelector('.number-products')
    if(count > 0){
        numberProducts.innerHTML = `${count}`
        const subtotal = document.querySelector('.final-total')
        subtotal.innerHTML = `$ ${total}`
    }
    else{
        priceContent.style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})
    














































// =========================
// FOOTER
// ==========================
// Automatically update copyright year in the footer
var currentTime = new Date();
var year = currentTime.getFullYear();
$("#year").text(year);

