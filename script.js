//Divs Deputado
let inpNomeDeputado = document.getElementById("inpNomeDeputado")
let btnBuscarDeputado = document.getElementById("btnBuscarDeputado")
let containerDeputado = document.getElementById("containerDeputado")

//Fetch dados deputados
const fetchDeputado = (value) => {
  const dados = fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${value}&ordem=ASC&ordenarPor=nome`)
    .then((res) => res.json())
    .then((data) =>{
      //console.log(data.dados[0])
      return data.dados
    })
  return dados
}

//Busca deputados
btnBuscarDeputado.addEventListener("click", async (event)=>{
  event.preventDefault()

  if(inpNomeDeputado.value == ""){
    alert("Por favor insira o nome ou partes do nome de um deputado")
  } else {
    containerDeputado.innerHTML = ""

    let resultado = await fetchDeputado(inpNomeDeputado.value)
    resultado.forEach((element) => criarCaixaDeputado(element))

    //gap Deputados
    let larguraTela = Number((window.getComputedStyle(containerDeputado).getPropertyValue("width")).split("px")[0])
    let gap = (larguraTela-(180*Math.trunc(larguraTela/180)))/(Math.trunc(larguraTela/180)-1)
    let deputados = document.querySelectorAll(".deputado")
    if(gap == Infinity){
      for (i of deputados){
        i.style.scrollSnapAlign = "center"
      }
      containerDeputado.style.gap = "5px"
      containerDeputado.style.removeProperty("justify-content")
    } else if(containerDeputado.childElementCount*190 < larguraTela){
      for (i of deputados){
        containerDeputado.style.gap = "10px"
        containerDeputado.style.justifyContent = "center"
      }
    } else {
      containerDeputado.style.removeProperty("justify-content")
      //calculo do gap de acordo com o tamanho da largura da div em px, calculo se baseia na largura da div(95vw) - largura da div(95vw)/largura total de cada divDeputado(180px) (isso da quantos deputados cabem) e tudo dividido pela qnt de deputados-1 pq o gap é sempre um a menos que os candidatos que cabem
      containerDeputado.style.gap = `${gap}px`

      //nth-child deputados para o scroll-snap-align
      let deputadosSelecionados = document.querySelectorAll(`.deputado:nth-child(${Math.trunc(larguraTela/180)}n+1)`)
      for (i of deputadosSelecionados){
        i.style.scrollSnapAlign = "start"
      }

      let lastDeputado = document.querySelector(`.deputado:last-child`)
      lastDeputado.style.scrollSnapAlign = "end"
    }
  }
})

function criarCaixaDeputado(deputado){

  let div = document.createElement("div")
  let img = document.createElement("img")
  let p1 = document.createElement("p")
  let p2 = document.createElement("p")
  let p3 = document.createElement("p")
  
  let btnEmail = document.createElement("button")
  let a1 = document.createElement("a")
  a1.append(btnEmail)
  
  let btnTwitter = document.createElement("button")
  let btnInstagram = document.createElement("button")
  
  let div2 = document.createElement("div")


  div2.append(a1, btnTwitter, btnInstagram)
  div.append(img, p1, p2, p3, div2)

  div.classList.add("deputado")

  img.src = deputado.urlFoto
  img.style.width = "100%"

  p1.innerHTML = `${deputado.nome}`
  p2.innerHTML = `(${deputado.siglaPartido} - ${deputado.siglaUf})`
  p3.innerHTML = `Legislaturas em que exerceu mandato: <b>${deputado.idLegislatura}ª</b>`

  a1.href = `mailto:${deputado.email}`
  btnEmail.innerHTML = `<i class="fa-solid fa-envelope"></i>`
  btnTwitter.innerHTML = `<i class="fa-brands fa-twitter"></i>`
  btnInstagram.innerHTML = `<i class="fa-brands fa-instagram"></i>`

  containerDeputado.append(div)
}

/* ---------------- PARTIDOS ---------------- */

//Divs Partidos
let inpPartido = document.getElementById("inpPartido")
let btnBuscarPartido = document.getElementById("btnBuscarPartido")
let containerPartido = document.getElementById("containerPartido")

//Fetch dados partidos
const fetchPartido = (value) => {
  const dados = fetch(`https://brenndalandim.github.io/camara/Partidos.json`)
    .then((res) => res.json())
    .then((data) =>{
      const resultado = data.dados.filter(item => {
        return item.sigla.toLowerCase() == value.toLowerCase() || item.sigla.toLowerCase().includes(value.toLowerCase())
      })
      return resultado
    })
  return dados
}

function criarCaixaPartido (partido){
  let div = document.createElement("div")
  let div1 = document.createElement("div")
  let img = document.createElement("img")
  let p1 = document.createElement("p")
  let p2 = document.createElement("p")
  div1.append(img)
  div.append(div1, p1, p2)

  div1.style.height = "200px"
  img.style.width = "100%"

  div.classList.add("partido")
  
  containerPartido.append(div)

  img.src =`${partido.urlFoto}`

  p1.innerHTML = `${partido.sigla}`
  p2.innerHTML = `${partido.nome}`
}

btnBuscarPartido.addEventListener("click", async (event) => {
  event.preventDefault()

  if(inpPartido.value == ""){
    alert("Por favor digite a sigla ou partes da sigla do partido")
  } else {
    containerPartido.innerHTML = ``
    
    let resultado = await fetchPartido(inpPartido.value)
    resultado.forEach((element) => criarCaixaPartido(element))

    //gap Partidos
    let larguraTela = Number((window.getComputedStyle(containerPartido).getPropertyValue("width")).split("px")[0])
    let gap = (larguraTela-(180*Math.trunc(larguraTela/180)))/(Math.trunc(larguraTela/180)-1)
    let partidos = document.querySelectorAll(".partido")
    if(gap == Infinity){
      for (i of partidos){
        i.style.scrollSnapAlign = "center"
      }
      containerPartido.style.gap = "5px"
      containerPartido.style.removeProperty("justify-content")
    } else if(containerPartido.childElementCount*190 < larguraTela){
      for (i of partidos){
        containerPartido.style.gap = "10px"
        containerPartido.style.justifyContent = "center"
      }
    } else {
      containerPartido.style.removeProperty("justify-content")
      //calculo do gap de acordo com o tamanho da largura da div em px, calculo se baseia na largura da div(95vw) - largura da div(95vw)/largura total de cada divDeputado(180px) (isso da quantos partidos cabem) e tudo dividido pela qnt de partidos-1 pq o gap é sempre um a menos que os candidatos que cabem
      containerPartido.style.gap = `${gap}px`

      //nth-child partidos para o scroll-snap-align
      let partidosSelecionados = document.querySelectorAll(`.partido:nth-child(${Math.trunc(larguraTela/180)}n+1)`)
      for (i of partidosSelecionados){
        i.style.scrollSnapAlign = "start"
      }

      let lastPartido = document.querySelector(`.partido:last-child`)
      lastPartido.style.scrollSnapAlign = "end"
    }
  }
})


/* ------------------ Noticias ------------------ */
let containerNoticias = document.getElementById("containerNoticias")

const fetchNoticias = () => {
  const dados = fetch(`https://brenndalandim.github.io/camara/Noticias.json`)
    .then((res) => res.json())
    .then((data) =>{
      //console.log(data.dados)
      return data.dados
    })
  return dados
}

/* --------------- Timer Noticias --------------- */

let contNoticia = 1

async function noticia(){
  containerNoticias.removeAttribute("style")
  
  let noticias = await fetchNoticias()
  
  containerNoticias.innerHTML = ""

  
  let div1 = document.createElement("div")
  let div2 = document.createElement("div")
  containerNoticias.append(div1, div2)

  let img = document.createElement("img")
  img.src = `${noticias[contNoticia].urlFoto}`
  div1.append(img)

  let h2 = document.createElement("h2")
  h2.innerHTML = `${noticias[contNoticia].titulo}`
  
  let p1 = document.createElement("p")
  p1.innerHTML = `${noticias[contNoticia].subTitulo}`
  
  let p2 = document.createElement("p")
  p2.innerHTML = `${noticias[contNoticia].fonte}`

  let a = document.createElement("a")
  a.href = `${noticias[contNoticia].linkNoticia}`
  a.setAttribute("target","_blank")
  let btn = document.createElement("button")
  a.append(btn)
  btn.innerHTML = `VEJA MAIS`
  
  div2.append(h2, p1, p2, a)
  contNoticia++
  if(contNoticia == 4){
    contNoticia = 0
  }

/* ---------------- Animação ---------------- */
  containerNoticias.style.animationName = "aparecer"
  containerNoticias.style.animationDuration = "4s"
}
noticia()
setInterval(() => noticia(), 6000)

/* ------------------ Eventos ------------------ */
let containerEventos = document.getElementById("containerEventos")
let inpDescEvento = document.getElementById("inpDescEvento")
let inpDataEvento = document.getElementById("inpDataEvento")
let btnBuscarEvento = document.getElementById("btnBuscarEvento")

//Fetch Evento
const fetchEventoDoisDados = (value1, value2) => {
  const dados = fetch(`https://dadosabertos.camara.leg.br/api/v2/eventos?itens=500&ordem=ASC&ordenarPor=dataHoraInicio`)
    .then((res) => res.json())
    .then((data) =>{
      const resultado = data.dados.filter(item => {
        return (item.descricaoTipo.toLowerCase() == value1.toLowerCase() || item.descricaoTipo.toLowerCase().includes(value1.toLowerCase())) && (new Date(item.dataHoraInicio).toLocaleString('pt-BR', { timezone: 'UTC' }).substring(0,10) == value2 || new Date(item.dataHoraInicio).toLocaleString('pt-BR', { timezone: 'UTC' }).substring(0,10).includes(value2))
      })
      //console.log(resultado)
      return resultado
    })
  return dados
}

const fetchEventoDesc = (value) => {
  const dados = fetch(`https://dadosabertos.camara.leg.br/api/v2/eventos?itens=500&ordem=ASC&ordenarPor=dataHoraInicio`)
    .then((res) => res.json())
    .then((data) =>{
      const resultado = data.dados.filter(item => {
        return item.descricaoTipo.toLowerCase() == value.toLowerCase() || item.descricaoTipo.toLowerCase().includes(value.toLowerCase())})
      //console.log(resultado)
      return resultado
    })
  return dados
}

const fetchEventoData = (value) => {
  const dados = fetch(`https://dadosabertos.camara.leg.br/api/v2/eventos?itens=500&ordem=ASC&ordenarPor=dataHoraInicio`)
    .then((res) => res.json())
    .then((data) =>{
      const resultado = data.dados.filter(item => {
        return new Date(item.dataHoraInicio).toLocaleString('pt-BR').split(",")[0] == value || new Date(item.dataHoraInicio).toLocaleString('pt-BR').split(",")[0].includes(value)})
      //console.log(resultado)
      return resultado
    })
  return dados
}

function criarEvento(evento){
  
  let divContainer = document.createElement("div")
  divContainer.classList.add("evento")
  let divData = document.createElement("div")
  let divDesc = document.createElement("div")
  divContainer.append(divData, divDesc)
  containerEventos.append(divContainer)

  let pData = document.createElement("p")
  let pHora = document.createElement("p")
  divData.append(pData, pHora)

  let dataHora = new Date(evento.dataHoraInicio).toLocaleString('pt-BR')

  pData.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${dataHora.split(",")[0]}`
  pHora.innerHTML = `<i class="fa-solid fa-clock"></i> ${dataHora.substring(11,17)}`

  let pTitulo = document.createElement("p")
  let pDesc = document.createElement("p")
  let pTipo = document.createElement("p")
  let pLocal = document.createElement("p")
  divDesc.append(pTitulo, pTipo, pDesc, pLocal)

  pTitulo.innerText = "CÂMARA DOS DEPUTADOS"
  pTipo.innerHTML = `- ${evento.descricaoTipo}`
  pDesc.innerHTML = `${evento.descricao}`
  if(evento.localCamara.nome != null){
    pLocal.innerHTML = `${evento.localCamara.nome}`
  } else {
    pLocal.innerHTML = `Não definido`
  }
}

btnBuscarEvento.addEventListener("click", async (event) => {
  event.preventDefault()
  
  if((inpDescEvento.value).trim("") == "" && (inpDataEvento.value).trim("") == ""){
    alert("Por favor digite uma data e/ou a descrição do evento")
  } else {
    containerEventos.innerHTML = ``

    if((inpDescEvento.value).trim("") == ""){
      let resultado = await fetchEventoData(inpDataEvento.value)
      resultado.forEach((element) => criarEvento(element))
    } else if ((inpDataEvento.value).trim("") == ""){
      let resultado = await fetchEventoDesc(inpDescEvento.value)
      resultado.forEach((element) => criarEvento(element))
    } else {
      let resultado = await fetchEventoDoisDados(inpDescEvento.value, inpDataEvento.value)
      resultado.forEach((element) => criarEvento(element))
    }
  }
})

//Função para clicar no botão de pesquisa sempre que a tela mudar de tamanho forçando a recarregar o cálculo do gap
window.onresize = () => {
  if(inpNomeDeputado.value != ""){
    btnBuscarDeputado.click()
  }
  if(inpPartido.value != ""){
    btnBuscarPartido.click()
  }
}