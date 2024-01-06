$(document).ready(function () {
    "use strict";
  $("#dangNhap").on("click", (e) => handleDangNhap(e));

  var data = {};
  function handleDangNhap(e) {
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#matKhau").val();
    console.log(password)
    $.ajax({
      url: "http://localhost:8000/api/taiKhoan/getByEmail/" + email,
      type: "GET",
      async: false,
      dataType: "json",
      success: function (res) {
        // data = res.data.taiKhoan;
        data = res.taiKhoan.matKhau;
        checkacount(password);
      },
      error: function (ajaxContext) {
        alert(ajaxContext.responseText);
      },
    });
  }
  function checkacount(password) {
    if (password === data) {
      window.location.href = "profile.html";
    } else {
      alert("email hoặc mật khâu bị sai");
    }
  }
});
