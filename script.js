const cartBtnNav = document.getElementById('cartBtn');
const cartBox = document.getElementById('cartBox');
const productBox = document.getElementById('productBox');
const productCart = document.getElementById('productCart');
const cardBtn = document.getElementById('cardBtn');
const remove = document.getElementById('remove');
const totalPrice = document.getElementById('totalPrice');
const cartQntt = document.getElementById('cartQntt');
const cartItems = document.getElementById('cartItems');
const modal = document.getElementById('modal');
const totalPriceText = document.getElementById('totalPriceText');

let addToArray = [];

function loadProducts() {
  for (let item of productData) {
    productBox.innerHTML += `<div id="${
      item.id
    }" class="bg-white w-[15rem] rounded-2xl shadow-2xl" id="productCart">
          <div class="w-[15rem] h-[15rem]">
            <img
              class="w-full h-full rounded-2xl"
              src="${item.imgUrl}"
              alt=""
            />
          </div>
          <div class="p-4">
            <h2 class="text-[1.2rem]">${item.name}</h2>
            <h2 class="text-[1.2rem] text-red">Only $${item.price}</h2>
            <div
              class="w-[4.5rem] h-[2.5rem] bg-red mt-4 flex items-center justify-center"
            >
              <button
                id="cardBtn"
                onclick="getProduct('${item.name}, ${item.price}, ${
      item.imgUrl
    }, ${item.id}, ${1}')"
                class="text-white font-medium text-[1.2rem]"
              >
                + Add
              </button>
            </div>
          </div>
        </div>`;
  }
}
loadProducts();

// add to empty array
function getProduct(item) {
  const product = item.split(',');
  const findDuplicate = addToArray.find((val) => +val.id === +product[3]);
  if (findDuplicate === undefined) {
    addToArray.push({
      name: product[0],
      price: product[1],
      img: product[2],
      id: product[3],
      qntt: +product[4],
    });
  } else {
    findDuplicate.qntt += 1;
  }
  addToCart();
}
// Remove Product From Cart
function removeItem(id) {
  addToArray = addToArray.filter((item) => item.id !== id);
  addToCart();
}

//add to cart
function addToCart() {
  if (addToArray.length !== 0) {
    let finalAmount = addToArray
      .map((item) => +item.price * item.qntt)
      .reduce((acc, curr) => acc + curr);
    totalPrice.innerText = `$${finalAmount}.00`;
    totalPriceText.innerText = 'Total Amount Is:';
  } else {
    totalPrice.innerText = 0;
  }

  if (addToArray.length !== 0) {
    return (cartItems.innerHTML = addToArray.map((item) => {
      const searchId = productData.find(
        (search) => search.id === item.id || []
      );
      cartQntt.innerText = addToArray.length;

      return `
      <div id="${searchId.id}"
          class="relative mb-4 rounded-xl flex items-center justify-evenly border-[1px] border-lightGray p-4 m-4"
        >
      <button
      onclick="removeItem('${item.id}')"
            id="remove"
            class="remove text-red text-[1.4rem] absolute top-10 right-4"
          >
            X
          </button>
          <div class="w-[6rem] h-[6rem]">
            <img class="w-full h-full" src="${item.img}" alt="" />
          </div>
          <div>
            <h2 class="text-[1.2rem]">${searchId.name}</h2>
            <p class="text-[1rem]">Quentity: ${item.qntt}</p>
            <p class="text-[1.2rem] text-red">$${item.price}.00</p>
          </div>
        </div>
        
      `;
    }));
  } else {
    cartItems.innerHTML = `<p>Your Cart Is Empty</p>`;
  }
}

// open cart
function openCartWindow() {
  modal.classList.remove('hidden');
}
// close cart
function removeWindow() {
  modal.classList.add('hidden');
  console.log('ddd');
}
