// Default Language
let default_lang = 'eng';
localStorage.setItem('language', default_lang)

// #current_lang element
let current_lang = document.querySelector("#current_lang");

// Language JSON File Location
let language = default_lang;

// Set Selected Language
const setLanguage = lang => {
    localStorage.setItem('language', lang);
    language = localStorage.getItem('language');
    getLanguage();
}

// Toggle selected and current languages
const toggle_lang = (element) => {
    let lang_code = element.innerText;
    setLanguage(lang_code.substring(0, 3).toLowerCase());
    setTimeout(() => {
        let temp = current_lang.innerText;
        current_lang.innerText = element.innerText;
        element.innerText = temp;
    }, 550);
}

// Traverse through locales.[lang].json response
const traverseJSON = ob => {
    let res = {};
    const recurse = (obj, current) => {
        for (const key in obj) {
            let value = obj[key];
            if(value != undefined) {
                if (value && typeof value === 'object') {
                    recurse(value, key);
                } else {
                    res[key] = value;
                }
            }
        }
    }; 
    recurse(ob);
    return res;
}

// Run Multi Language Plugin
const getLanguage = () => {
    $.ajax({
        url: '/locales/' + language + '.json',
        dataType: 'json', async: true
    }).done(lang => {

        $('body').attr('class', language);
        let json = traverseJSON(lang);

        $.each(json, (key, value) => {
            
            if (key.substr(-4) === "attr") {
                let indexOfAttr = key.indexOf("-attr");
                let attrName = key.substr(0, indexOfAttr);
                $(`input[key="${attrName}"]`).attr("placeholder", value);
            }
            $(`[key="${key}"]`).html(value);
            if (key == 'subscribe') {
                $(`[key="${key}"]`).attr("data-hover", "ENDI BOSING").html(`<span>${value}</span>`);
            }
        });
    })
}

// Auto Loader
$(document).ready(() => {
    if (language == null)
        getLanguage(language);
});
