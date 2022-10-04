const submitBtnBtn = document.getElementById("submitBtnBtn");

// evento valor pretendido -----------------------
submitBtnBtn.addEventListener("click", () => {
  const casaPre = document.getElementById("casa-pre");
  const comissaoPre = document.getElementById("comissao-pre");
  const ivaPre = document.getElementById("iva-pre");

  const valorPretendido = Number(casaPre.value);
  const ivaPreValue = Number(ivaPre.value);
  const comPre = Number(comissaoPre.value);
  console.log(typeof valorPretendido, typeof ivaPre, typeof comissaoPre);

  // valor da comissão do consultor
  const valorDaComissao = (comPre * valorPretendido) / 100;

  // conversao do iva em percentagem
  const ivaPercentagem = ivaPreValue / 100;

  // calculo do valor iva mediante valores introduzidos
  const ivaCobrar = Number(
    Math.trunc(valorDaComissao * ivaPercentagem) + 1
  );

  // calculo do valaor a cobrar pelo consultor
  const comissaoConsultor = valorDaComissao + ivaCobrar;

  // valor do imovel
  let valorFinalDoImovel = comissaoConsultor + valorPretendido;
  console.log(valorFinalDoImovel);

  //render
  const vPretendido = document.querySelector(".casa-v-pre");
  const vIva = document.querySelector(".iva-v-pre");
  const vComissao = document.querySelector(".comissao-v-pre");
  const vValorFinal = document.querySelector(".ganho-v-pre");

  vPretendido.innerHTML = ` Valor pretendido: ${valorPretendido}€`;
  vIva.innerHTML = ` IVA cobrado: ${ivaCobrar}€ `;
  vComissao.innerHTML = ` Valor da comissão: ${comissaoConsultor}€ `;
  vValorFinal.innerHTML = ` Valor a cobrar pelo imovel: ${valorFinalDoImovel}€ `;
});

//evento mercado --------------------------
const casaInput = document.getElementById("casa");
const comissaoInput = document.getElementById("comissao");
const ivaInput = document.getElementById("iva");
const subBtn = document.getElementById("submitBtn");

subBtn.addEventListener("click", () => {
  calcConsultor();
});

function calcConsultor() {
  const casaValor = Number(casaInput.value);
  const comissaoValor = Number(comissaoInput.value);
  const ivaValor = Number(ivaInput.value);

  // valor da comissao consultor
  const valorComissao = (comissaoValor * casaValor) / 100;

  // conversao do iva em percentagem
  const ivaPercentagem = ivaValor / 100;

  // calculo do valor iva mediante valores introduzidos
  const ivaCobrar = Number(
    Math.trunc(valorComissao * ivaPercentagem) + 1
  );

  // calculo do valaor a cobrar pelo consultor e proprietario
  const comissaoConsultor = valorComissao + ivaCobrar;
  const comissaoProprietario = casaValor - comissaoConsultor;

  const vCasa = document.querySelector(".v-casa");
  const vComissao = document.querySelector(".v-comissao");
  const vIva = document.querySelector(".v-iva");
  const vGanho = document.querySelector(".v-ganho-proprietario");
  const vPedir = document.querySelector(".v-pedir-proprietario");

  vCasa.innerHTML = `Valor de venda: ${casaValor}€`;
  vIva.innerHTML = `Valor de iva: ${ivaCobrar}€`;
  vComissao.innerHTML = `Valor da comissão: ${comissaoConsultor}€`;
  vGanho.innerHTML = `Valor a receber: ${comissaoProprietario}€`;

  console.log(typeof ivaCobrar);
}

// darkmode ----------------------------------------
const images = document.getElementById("images");

images.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
  document.querySelector("h1").classList.toggle("light");
  document.querySelector(".h31").classList.toggle("light");
  document.querySelector(".h32").classList.toggle("light");
  submitBtnBtn.classList.toggle("light-btn");
  subBtn.classList.toggle("light-btn");

  changing();
});

var toggle = false;
function changing() {
  if (toggle === true) {
    document.getElementById("images").src = "img/moon.png";
  } else {
    document.getElementById("images").src = "img/sun.png";
  }
  toggle = !toggle;
}

// currency converter -------------------------------------------------
document.querySelector('#form').onsubmit = () =>{
  const base = document.querySelector('#currency-from').value;
  fetch(`https://api.exchangerate.host/latest?/source=ecb&base=${base}`)
      .then((response) => response.json())
      .then((data) => {
          const amount = document.querySelector("#amount").value;
          const currencyTo = document.querySelector("#currency-to").value;
          const rate = data.rates[currencyTo];
          function convert(){
              return amount * rate;
          }
          document.querySelector(".display-result").innerHTML = `${amount} ${base.toUpperCase()} equal to ${currencyTo} ${convert().toFixed(2)}`;
      })
      .catch((error) => {
          console.log("Error: ", error);
      });
      return false;
    }