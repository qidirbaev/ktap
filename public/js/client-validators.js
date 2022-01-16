// show alert
const show_alert = function (where, message = 'Please fill all fields', type = 'danger') {
  $(`#${where}-modal_here`).html(`
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>${message}</strong>
      <a class="close pointer" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </a>
    </div>`
  );
};

// login form submit handler
$(document).ready(function () {
  $('#login_form').on('submit', function (e) {
    e.preventDefault();

    const formData = {
      email: $('#login_email').val().trim(),
      password: $('#login_password').val().trim()
    };

    if (formData.email === '' || formData.password === '')
      return show_alert('login');

    login_request(formData);
  });
});

const login_request = function (form_data) {
  const str = '<i class="fa fa-spinner fa-spin"></i> Logging in...';
  $('#login_button').html(str);

  $.ajax({
    url: "/auth/login",
    type: "POST",
    data: form_data,
    success: function (data) {
      $('#login_button').html('SIGN IN');
      if (data.success)
        window.location.href = data.redirect;
    },
    error: function (data) {
      $('#login_button').html('SIGN IN');
      return show_alert('login', data.responseJSON?.message);
    }
  });
}


// register form submit handler
$(document).ready(function () {
  $('#register_form').on('submit', function (e) {
    e.preventDefault();

    const formData = {
      first_name: $('#register_first_name').val().trim(),
      last_name: $('#register_last_name').val().trim(),
      email: $('#register_email').val().trim(),
      password: $('#register_password').val().trim(),
      phone_number: $('#register_phone_number').val().trim().split('+').join('')
    };

    if (formData.first_name === '' ||
      formData.last_name === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.phone_number === '')
      return show_alert('register');

    register_request(formData);
  });
});

const register_request = function (form_data = {}) {
  const str = '<i class="fa fa-spinner fa-spin"></i> Registering...';
  $('#register_button').html(str);

  $.ajax({
    url: "/auth/register",
    type: "POST",
    data: form_data,
    success: function (data) {
      $('#register_button').html('SIGNUP');
      if (data.success)
        window.location.href = data.redirect;
    },
    error: function (data) {
      $('#register_button').html('SIGNUP');
      return show_alert('register', data.responseJSON?.message);
    }
  });
}
