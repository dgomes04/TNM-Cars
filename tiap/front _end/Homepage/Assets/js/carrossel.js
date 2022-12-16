

const formarSlide = () => {
    fetch('http://localhost:3456/carro/populares', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {

        let carros = dados;

        if (carros.length > 0) {
            let salvaDados = '';

            for (let i = 0; i < 3; i++) {
                if (i == 0) {

                    salvaDados += `
                    <div class="slide active" > 
                        <img src="${carros[i].foto}" alt="">
                        <div class="info">
                            <h2>${carros[i].modelo + carros[i].nome + carros[i].modelo}</h2>
                            <h3 style="font-size:large;" align="center">R$${carros[i].valor}</p>
                        </div>
                  </div>`

                    continue
                } else {
                    salvaDados += `
                    <div class="slide">
                        
                        <img src="${carros[i].foto}" alt="">
                        <div class="info">
                            <h2>${carros[i].modelo + " " + carros[i].nome + " " + carros[i].modelo}</h2>
                            <p>${carros[i].valor}</p>
                        </div>
                        
                  </div>`

                }

            }
            salvaDados += ` <div class="navigation">
            <i class="fas fa-chevron-left prev-btn"></i>
            <i class="fas fa-chevron-right next-btn"></i>
          </div>
          <div class="navigation-visibility">
            <div class="slide-icon active"></div>
            <div class="slide-icon"></div>
            <div class="slide-icon"></div>
            <div class="slide-icon"></div>
            <div class="slide-icon"></div>
          </div>`


            document.querySelector(".carrossel").innerHTML = salvaDados
        }


    })
}

const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
var slideNumber = 0;

//image slider next button
nextBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });

    slideNumber++;

    if (slideNumber > (numberOfSlides - 1)) {
        slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
});

//image slider previous button
prevBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });

    slideNumber--;

    if (slideNumber < 0) {
        slideNumber = numberOfSlides - 1;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
});

//image slider autoplay
var playSlider;

var repeater = () => {
    playSlider = setInterval(function () {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber++;

        if (slideNumber > (numberOfSlides - 1)) {
            slideNumber = 0;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    }, 4000);
}
repeater();

//stop the image slider autoplay on mouseover
slider.addEventListener("mouseover", () => {
    clearInterval(playSlider);
});

//start the image slider autoplay again on mouseout
slider.addEventListener("mouseout", () => {
    repeater();
});



const autenticar = () => {

    fetch('https://newsapi.org/v2/everything?q=keyword&apiKey=824c98733ba7433383e5d688bc877fc6', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {



    })
}

const montar_slide_pesquisas = () => {
    fetch(`https://newsapi.org/v2/everything?q=carros populares&language=pt&apiKey=824c98733ba7433383e5d688bc877fc6`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {

        var status = dados.status;

        if (status == "ok") {
            var salva_dados;


            for (var i = 0; i < 19; i++) {

                if (i == 0) {
                    i++;
                    continue;
                }
                if (dados.articles[i].title != null && !dados.articles[i].title.includes("Transformers") && !dados.articles[i].title.includes("Microcarro")  && i> 4) {
                    salva_dados += `<div class="card swiper-slide">
                        <div class="image-box">
                        <a href="${dados.articles[i].url}"><img src="${dados.articles[i].urlToImage}"  width="100%" alt=""/></a>
                        </div>
                        <div class="profile-details">
                          <div class="name-job">
                            <h3 class="name">${dados.articles[i].title}</h3>
                          </div>
                        </div>
                      </div>
                `
                }


            }

        }
        var correto = salva_dados.replace("undefined", "");
        document.querySelector('.swiper-wrapper').innerHTML = correto;

    })

}

window.onload(autenticar())
window.onload(montar_slide_pesquisas())