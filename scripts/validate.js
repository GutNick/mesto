const sellectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function enableValidation() {
    const forms = [...document.querySelectorAll(sellectors.formSelector)];

    forms.forEach(addListenersToForm);
    console.log(forms);
}
function addListenersToForm(form) {
    const inputs = Array.from(form.querySelectorAll(sellectors.inputSelector));

    inputs.forEach(addListenersToInput);

    form.addEventListener('submit', handleFormSubmit);

    form.addEventListener('input', handleFormInput);
    toggleButton(form);
}
enableValidation(sellectors);