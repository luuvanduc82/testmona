function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules = {};

    function validate(inputEl, rule) {


        var errorEl = getParent(inputEl, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;


        var rules = selectorRules[rule.selector];


        for (var i = 0; i < rules.length; ++i) {
            switch (inputEl.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputEl.value);
            }
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorEl.innerText = errorMessage;
            getParent(inputEl, options.formGroupSelector).classList.add('invalid');
        } else {
            errorEl.innerText = '';
            getParent(inputEl, options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }
    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var isFormValid = true;
            options.rules.forEach(function(rule) {
                var inputEl = formElement.querySelector(rule.selector);
                var isValid = validate(inputEl, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {
                        switch (input.type) {
                            case 'checkbox':
                                if (input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;

                        }
                        return values;
                    }, {});
                    options.onSubmit(formValues)
                } else {
                    formElement.submit();
                }
            } else {
                console.log('Có lỗi');
            }
        }
        options.rules.forEach(function(rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputEls = formElement.querySelectorAll(rule.selector);
            Array.from(inputEls).forEach(function(inputEl) {
                inputEl.onblur = function() {
                    validate(inputEl, rule);
                }
                inputEl.oninput = function() {
                    var errorEl = getParent(inputEl, options.formGroupSelector).querySelector(options.errorSelector)
                    errorEl.innerText = '';
                    getParent(inputEl, options.formGroupSelector).classList.remove('invalid');
                }
            });

        });

    }
}
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}
Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhâp email';
        }
    };
}
Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    };
}
Validator.isConfirmerd = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không đúng'
        }
    }
}

//
Validator({
    form: '#form_reg',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#fullname', 'Vui lòng nhập tên đầu đủ của bạn'),
        Validator.isRequired('#email'),
        Validator.isRequired('#phone'),
        Validator.isRequired('#course'),
        Validator.isEmail('#email', 'Vui lòng nhập email đầy đủ'),
    ],
    onSubmit: function(data) {
        //call api
        console.log(data);
    }
});