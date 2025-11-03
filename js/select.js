document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех блоков при загрузке страницы
    initAllSelectFields();
    
    // Обработчики событий
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('change', handleInputChange);
	document.addEventListener('reset', handleFormReset);
});

// Инициализация всех полей выбора
function initAllSelectFields() {
    const selectFields = document.querySelectorAll('.js-field-select');
    selectFields.forEach(field => {
        updateSelectField(field);
    });
}

// Обновление конкретного поля выбора
function updateSelectField(field) {
    const button = field.querySelector('.js-field-button-select');
    const buttonTitle = button.querySelector('.button-title');
    const inputs = field.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    
    let selectedCount = 0;
    let selectedLabels = [];
    
    // Подсчет выбранных элементов и сбор их текстов
    inputs.forEach(input => {
        if (input.checked) {
            selectedCount++;
            const label = input.closest('.frm-select').querySelector('label');
            if (label) {
                selectedLabels.push(label.textContent.trim());
            }
        }
    });
    
    // 1) Установка data-count
    if (selectedCount > 0) {
        buttonTitle.setAttribute('data-count', selectedCount);
    } else {
        buttonTitle.removeAttribute('data-count');
    }
    
    // 2) Создание/обновление блока .button-list внутри .button-title
    let buttonList = buttonTitle.querySelector('.button-list');
    
    if (selectedLabels.length > 0) {
        if (!buttonList) {
            buttonList = document.createElement('div');
            buttonList.className = 'button-list';
            buttonTitle.appendChild(buttonList);
        }
        buttonList.textContent = selectedLabels.join(', ');
    } else if (buttonList) {
        buttonList.remove();
    }
    
    // 3) Добавление/удаление класса selected
    if (selectedCount > 0) {
        button.classList.add('selected');
    } else {
        button.classList.remove('selected');
    }
}

// Обработчик клика по документу
function handleDocumentClick(e) {
    const target = e.target;
    
    // 4) Обработка клика на кнопку выбора
    if (target.closest('.js-field-button-select')) {
        e.preventDefault();
        const button = target.closest('.js-field-button-select');
        const field = button.closest('.js-field-select');
        
        // Закрытие всех других открытых полей
        document.querySelectorAll('.js-field-button-select.active').forEach(activeButton => {
            if (activeButton !== button) {
                activeButton.classList.remove('active');
            }
        });
        
        // Переключение состояния текущей кнопки
        button.classList.toggle('active');
    }
    
    // 6) Обработка клика на кнопку применения
    if (target.closest('.js-field-button-select-close')) {
        e.preventDefault();
        const closeButton = target.closest('.js-field-button-select-close');
        const field = closeButton.closest('.js-field-select');
        const button = field.querySelector('.js-field-button-select');
        button.classList.remove('active');
    }
    
    // 7) Обработка клика на кнопку очистки
    if (target.closest('.js-field-button-select-clear')) {
        e.preventDefault();
        const clearButton = target.closest('.js-field-button-select-clear');
        const field = clearButton.closest('.js-field-select');
        clearSelectField(field);
    }
    
    // 4) Закрытие поля при клике вне его
    if (!target.closest('.js-field-select')) {
        document.querySelectorAll('.js-field-button-select.active').forEach(button => {
            button.classList.remove('active');
        });
    }
}

// Обработчик изменения чекбоксов и радиокнопок
function handleInputChange(e) {
    const target = e.target;
    if (target.matches('input[type="checkbox"], input[type="radio"]')) {
        const field = target.closest('.js-field-select');
        if (field) {
            // 5) Обновление поля при изменении input
            updateSelectField(field);
        }
    }
}

// Обработчик сброса формы
function handleFormReset(e) {
    const target = e.target;
    if (target.closest('.js-field-content-block')) {
        const form = target.closest('.js-field-content-block');
        const field = form.closest('.js-field-select');
        
        // Ждем следующего цикла событий, чтобы сброс успел выполниться
        setTimeout(() => {
            updateSelectField(field);
        }, 0);
    }
}

// Функция очистки поля выбора
function clearSelectField(field) {
    const inputs = field.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    const button = field.querySelector('.js-field-button-select');
    const buttonTitle = button.querySelector('.button-title');
    
    // Сброс всех input
    inputs.forEach(input => {
        input.checked = false;
    });
    
    // 7) Удаление data-count
    buttonTitle.removeAttribute('data-count');
    
    // 7) Удаление .button-list из buttonTitle
    const buttonList = buttonTitle.querySelector('.button-list');
    if (buttonList) {
        buttonList.remove();
    }
    
    // 7) Удаление класса selected
    button.classList.remove('selected');
    
    // Закрытие выпадающего списка
    button.classList.remove('active');
}