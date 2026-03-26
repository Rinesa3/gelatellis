//  Dataindsamling - Array med produkter

// Her opretter jeg mine produkter som objekter i et array, som bedre forstået er en liste over mine is,
// som hver har et navn og en pris
const iceCreams = [
  { name: "Vanilje", price: 20 },
  { name: "Chokolade", price: 25 },
  { name: "Jordbær", price: 22 },
];

// Her laver jeg en tom kurv = bedre kendt som en cart
// Når brugeren klikker "tilføj", bliver produkter lagt herind i min kurv
let cart = [];

// DOM elementer

// heri henter jeg elementer fra HTML'en, og det gør jeg med "getelementbyid"
// Det gør jeg for at kunne komme til at ændre indholdet med JavaScript
const productDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const message = document.getElementById("message");
const buyBtn = document.getElementById("buyBtn");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

// Viser produkter på hjemmesiden

// Her gennemgår jeg alle produkter i mit array som jeg har lavet
// "forEach" kører hver enkelt gang for hvert produkt som jeg har lavet i mit array
iceCreams.forEach((ice, index) => {
  // herefter opretter jeg en container til hvert produkt
  const div = document.createElement("div");

  // jeg indsætter HTML ind i div'en
  div.innerHTML = `
    <h3>${ice.name}</h3>
    <p>${ice.price} kr</p>
    <button class="addBtn">Tilføj</button>
  `;

  // Her finder jeg knappen inde i div'en
  const button = div.querySelector(".addBtn");

  // Event listener, den lytter efter klik,
  // og når der så  klikkes, kalder jeg addToCart()
  button.addEventListener("click", () => {
    addToCart(index);
  });

  // Til sidst tilføjer jeg produktet til webbet
  productDiv.appendChild(div);
});

// "add to cart" funktion

// Denne funktion bliver kaldt når man klikker "tilføj" knappen inde på webbet, og indexet her er så fra mit array af is
function addToCart(index) {
  // som beskrevet finder jeg det valgte produkt via index
  const selectedIce = iceCreams[index];

  // Jeg tilføjer produktet til kurven (array)
  cart.push(selectedIce);

  // herefter opdaterer jeg så visningen af kurven
  updateCart();
}

// opdaterer kurven

function updateCart() {
  // Først rydder jeg visningen, ellers så dukker den op dobbelt igen, jeg vil gerne have at det bliver refreshet for hvert klik
  cartDiv.innerHTML = "";

  // Jeg gennemgår så alle produkter i kurven
  cart.forEach((item) => {
    // jeg opretter så et nyt element til hvert produkt
    const p = document.createElement("p");

    // herefter så  Sætter jeg tekst på navn + prisen
    p.textContent = item.name + " - " + item.price + " kr";

    // også tilføjer jeg  det til HTML for at forbinde det til webbet
    cartDiv.appendChild(p);
  });
}

//  køb / event listener

// Når brugeren klikker på "Køb"
buyBtn.addEventListener("click", () => {
  // så henter jeg den aktuelle dato og tid når de har klikket køb
  const now = new Date();

  // Jeg henter kun timen fra den aktuelle tid
  const hour = now.getHours();

  // IF/ELSE bruges til at styre logikken
  // Her tjekker vi om butikken er åben
  // 20 er bare et random tidspunkt jeg har brugt, jeg har ændret i tidspunkter som også er vedlagt som screenshot
  if (hour >= 10 && hour <= 20) {
    // Hvis åbent skal den vise kvittering
    message.textContent =
      "Tak for din bestilling kl. " + now.toLocaleTimeString();

    // Tøm kurven efter køb
    cart = [];

    // Opdater visningen
    updateCart();
  } else {
    // Hvis lukket så skal den vise besked og det er så efter kl 20, og dette er også blevet vedlagt som dokumentation
    message.textContent = "Butikken er lukket!";
  }
});

//  Toggle Menu

// Når man klikker på menu-knappen
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});

// toggle skifter mellem at vise og skjule menuen
// Hvis den har "hidden" så fjernes den
// Hvis den ikke har så tilføjes den
