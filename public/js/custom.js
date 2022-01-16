
// Image compresser line



// End of image compresser line

const suggest_trigger = response => {
    $('a[role="menuitem"]').fadeOut();
    $('#spinning').fadeOut();
    clear_suggestion_menu();
    $.each(response.data, (index, user) => {
        let suggest_obj = {
            tabindex: index
        };
        suggest_obj.href = `mailto:${user.email}`;
        suggest_obj.text = user.name;
        let suggest_dom_element = $(suggest_skeleton(suggest_obj));
        $('#suggests').append(suggest_dom_element);
        if (index == 9) {
            $('#suggests').find('div:last-child').remove()
        }
    });
}

let suggest_handler = new EventEmitter();
suggest_handler.on("suggests", suggest_trigger);

const suggest_skeleton = obj => {
    const string = `<li role="presentation"><a role="menuitem" tabindex="${obj.tabindex}" href="${obj.href}">${obj.text}</a></li>
    <div class="dropdown-divider"></div>`;
    return string;
}

const clear_suggestion_menu = () => {
    $('#suggests').empty();
}

$('#search_input').on("focus", async () => {
    $('#toTopBtn').fadeOut();
    $("#spinning").fadeIn();
    const response = await serverResponse({});
    if (!response.ok) {  
        console.log("Request rejected");
    } else {
        suggest_handler.emit("suggests", response);
    }
});

const serverResponse = (obj = {}) => {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => {
                resolve({
                    data: json,
                    ok: true
                });
            })
            .catch(err => {
                reject({
                    data: null,
                    ok: false,
                    error: err
                });
            });
    });
}

// to get current year
function getYear() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// Pre-loader animation
$("#loading").delay(2000).fadeOut(500);

// Scroll to top
$(document).ready(function() {
    if (window.scrollY < 20) {
        $('#toTopBtn').fadeOut();
    }
    $(window).scroll(function() {
        if ($(this).scrollTop() > 20) {
            $('#toTopBtn').fadeIn();
        } else {
            $('#toTopBtn').fadeOut();
        }
    });
    
    $('#toTopBtn').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});

/** google_map js **/
function myMap() {
    let mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
