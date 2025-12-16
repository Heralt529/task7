const prices = {
    type1: 100,
    type2: 200,
    type3: 300
};

const multiki = {
    option1: 1.0,
    option2: 1.5,
    option3: 2.0
};

const quantity = document.getElementById('quantity');
const type = document.querySelectorAll('input[name="prodTypes"]');
const option = document.getElementById('prodOption');
const property = document.getElementById('prodProp');
const priceDisplay = document.getElementById('prodPrice');
const prodOptions = document.getElementById('prodOptions'); 
const prodProps = document.getElementById('prodProps');     

function validate() {
    const q = parseInt(quantity.value);
    
    if (isNaN(q) || q <= 0) {
        priceDisplay.textContent = 'Введите корректное количество';
        priceDisplay.style.color = 'red';
        return false;
    } else {
        priceDisplay.style.color = '';
        return true;
    }
}

function correct() {
    const q = parseInt(quantity.value);
    
    if (isNaN(q) || q < 1) {
        quantity.value = 1;
        validate();
    }
}

function calculate() {
    if (!validate()) {
        return;
    }

    const q = parseInt(quantity.value);
    const selected = document.querySelector('input[name="prodTypes"]:checked').value;

    let price = prices[selected];
    let totalPrice = price * q;

    if (selected === "type2") {
        const selectedOption = option.value;
        totalPrice *= multiki[selectedOption];
    }

    if (selected === "type3" && property.checked) {
        totalPrice *= 2;
    }

    totalPrice = Math.round(totalPrice * 100) / 100;

    priceDisplay.textContent = `Стоимость: ${totalPrice} руб.`;
}

function visibilityManager() {
    const selectedType = document.querySelector('input[name="prodTypes"]:checked').value;

    switch(selectedType) {
        case 'type1':
            prodOptions.classList.add('hide');
            prodProps.classList.add('hide');
            break;
        case 'type2':
            prodOptions.classList.remove('hide');
            prodProps.classList.add('hide');
            break;
        case 'type3':
            prodOptions.classList.add('hide');
            prodProps.classList.remove('hide');
            break;
    }
}

function startListen() {
    quantity.addEventListener('input', function() {
        validate();
        calculate();
    });

    type.forEach(radio => {
        radio.addEventListener('change', function() {
            visibilityManager();
            calculate();
        });
    });

    option.addEventListener('change', calculate);
    
    property.addEventListener('change', calculate);
}

document.addEventListener('DOMContentLoaded', function() {
    startListen();
    visibilityManager();
    calculate();
});