import '@babel/polyfill';

window.promptLogOut = function promptLogOut() {
  swal({
    text: 'Are you sure you want to log out?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Log out now',
    confirmButtonColor: 'red',
    cancelButtonText: 'Stay logged in',
    reverseButtons: true,
    focusCancel: true,
  }).then(({ dismiss }) => {
    if (dismiss) return;
    window.location = '/logout';
  });
};

window.toggleNavMenu = function toggleNavMenu() {
  var menu = document.getElementById('nav-menu');
  menu.classList.toggle('open');
};
