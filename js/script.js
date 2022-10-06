/****************** HERO_MENU *******************/
let heroMenuItems = document.querySelectorAll(".tabheader__item");
const heroMenuItemsContainer = document.querySelector(".tabheader__items");
heroMenuItemsContainer.addEventListener("click", (e)=>{
    if(e.target.className == "tabheader__item"){
        heroMenuItems.forEach(item=>item.classList.remove("tabheader__item_active"));
        e.target.classList.add("tabheader__item_active");
        let heroImg = document.getElementById("hero__img");
        let heroDescr = document.querySelector(".tabcontent__descr");
        switch(e.target.textContent){
            case "Фитнес":
                heroImg.src = "img/tabs/vegy.jpg";
                heroImg.alt = "vegy";
                heroDescr.textContent = `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
                свежих овощей и фруктов. Для людей, которые интересуются спортом;
                активных и здоровых. Это абсолютно новый продукт с оптимальной
                ценой и высоким качеством!`
            break;
            case "Премиум":
                heroImg.src = "img/tabs/elite.jpg";
                heroImg.alt = "elite";
                heroDescr.textContent = `Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`
            break;
            case "Постное":
                heroImg.src = "img/tabs/post.jpg";
                heroImg.alt = "post";
                heroDescr.textContent = `Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все будет Ом!`
            break;
            case "Сбалансированное":
                heroImg.src = "img/tabs/vegy.jpg";
                heroImg.alt = "vegy";
                heroDescr.textContent = `Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.`
            break;
        }
    }
})
/****************** MODAL *******************/
const modalTimer = setTimeout(()=>{
    showModal();
},15000);

const showModal = () => {
    clearTimeout(modalTimer);
    let modalContent = document.querySelector(".modal");
    modalContent.style.display = "block";
    document.body.style.overflow = "hidden";
    document.body.addEventListener("click",(e)=>{
        if(e.target.className == "modal" || e.target.className == "modal__close"){
            modalContent.style.display = "none";
            document.body.style.overflow = "";
        }
    })
}

let contactBtns = document.querySelectorAll(".btn");
contactBtns.forEach(btn=>{
    if(btn.textContent == "Связаться с нами"){
        btn.addEventListener("click",()=>{
            showModal();
        })
    }
})
/****************** SLIDER *******************/
let slides = document.querySelectorAll(".offer__slide");

let currentSlideNum = document.getElementById("current");
let totalSlideNum = document.getElementById("total");

totalSlideNum.textContent = `${slides.length}`;

const changeSlide = (option)=>{
    let currentNum = +currentSlideNum.textContent;
    if(option == "next"){
        currentSlideNum.textContent = `${currentNum==slides.length? currentNum**0: ++currentNum}`
    }else if(option == "prev"){
        currentSlideNum.textContent = `${currentNum==1? slides.length: --currentNum}`
    }
    slides.forEach(slide=>{
        slide.style.display = "none";
        if(slide.id == currentSlideNum.textContent){
            slide.style.display = "block";
        }
    })
}
changeSlide();

let slider = document.querySelector(".offer__slider");
slider.addEventListener("click", (e)=>{
    if(e.target.className == "offer__slider-prev" || e.target.className == "offer__slider-next"){
        changeSlide(e.target.id);
    }
})
/****************** CALCULATOR *******************/
let result = document.querySelector(".calculating__result");
let height, weight, age, gender = "female", ratio = "1.375";

const calculateCalories = ()=>{
    if(!height || !weight || !age || !gender || !ratio){
        result.textContent = "-----"
        return;
    }

    if(gender === "male"){
        result.textContent = `${Math.floor((88.36 + (13.4*weight) + (4.8*height) - (5.7*age))*ratio)}`
    }else{
        result.textContent = `${Math.floor((447.6 + (9.2*weight) + (3.1*height) - (4.3*age))*ratio)}`
    }
}
calculateCalories();

const getStaticCalcData = (parentContainer)=>{
    let elements = document.querySelectorAll(`${parentContainer} div`)
    document.querySelector(parentContainer).addEventListener("click", (e)=>{
        if(e.target.getAttribute("data-ratio")){
            ratio = +e.target.getAttribute("data-ratio");
        }else if(e.target.getAttribute("id")){
            gender = e.target.getAttribute("id");
        }
        elements.forEach(element=>element.classList.remove("calculating__choose-item_active"));
        if(e.target.className == "calculating__choose-item"){e.target.classList.add("calculating__choose-item_active")} 
        calculateCalories();
    })
}
getStaticCalcData("#gender");
getStaticCalcData(".calculating__choose_big");

const getDynamicCalcData = (selector)=>{
    let input = document.querySelector(selector);
    input.addEventListener("input",()=>{
        switch(input.getAttribute("id")){
            case "height":
                height = +input.value;
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
        }
        calculateCalories();
    })
}
getDynamicCalcData("#height");
getDynamicCalcData("#weight");
getDynamicCalcData("#age");
