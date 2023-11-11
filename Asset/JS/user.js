(function () {
  "use strict";

  var treeviewMenu = $(".app-menu");

  // Toggle Sidebar
  $('[data-toggle="sidebar"]').click(function (event) {
    event.preventDefault();
    $(".app").toggleClass("sidenav-toggled");
  });

  // Activate sidebar treeview toggle
  $("[data-toggle='treeview']").click(function (event) {
    event.preventDefault();
    if (!$(this).parent().hasClass("is-expanded")) {
      treeviewMenu
        .find("[data-toggle='treeview']")
        .parent()
        .removeClass("is-expanded");
    }
    $(this).parent().toggleClass("is-expanded");
  });
})();
function redirectToUserPage() {
  window.location.href = "profile.html";
}
function redirectToRegisterTopic() {
  window.location.href = "dk-de-tai.html";
}
$(document).ready(function () {
  var memberCount = 0;
  var maxMemberCount = 5;

  $("#add-member-btn").click(function () {
    if (memberCount >= maxMemberCount) {
      alert("Đã quá số lượng thành viên được thêm vào.");
      return;
    }

    var email = $("#input-email").val();
    var name = $("#input-name").val();
    var mssv = $("#input-mssv").val();
    var khoa = $("#input-khoa").val();

    if (email === "" || name === "" || mssv === "" || khoa === "") {
      alert("Vui lòng nhập đầy đủ thông tin thành viên.");
      return;
    }

    var memberForm = createMemberForm(email, name, mssv, khoa);
    $("#member-list").append(memberForm);

    $("#member-modal").modal("hide");

    $("#input-email").val("");
    $("#input-name").val("");
    $("#input-mssv").val("");
    $("#input-khoa").val("");

    memberCount++;
  });

  $(document).on("click", ".delete-member-btn", function () {
    $(this).closest(".member-group").remove();
    memberCount--;
  });

  function createMemberForm(email, name, mssv, khoa) {
    var memberForm =
      '<div class="member-group">' +
      '<div class="row">'+
      '<div class="input-group-show">' +
      '<div class="info-email">' +
      '<input type="email" class="form-control" placeholder="Email" readonly value="' +
      email +
      '" />' +
      "</div>" +

      '<div class="info-ht">' +
      '<input type="text" class="form-control" placeholder="Họ và tên" readonly value="' +
      name +
      '" />' +
      "</div>" +
      '<div class="info-mssv">' +
      '<input type="text" class="form-control" placeholder="MSSV" readonly value="' +
      mssv +
      '" />' +
      "</div>" +
      '<div class="info-khoa">' +
      '<input type="text" class="form-control" placeholder="Khoa" readonly value="' +
      khoa +
      '" />' +
      "</div>" +
      '<button class="delete-member-btn"><i class="bi bi-trash3-fill"></i></button>' +
      "</div>" +
      "</div>" +
      "</div>";

      

    return memberForm;
  }

  $(".collapse-link").on("click", function () {
    var e = $(this).closest(".p_panel"),
      a = $(this).find("i"),
      t = e.find(".p_content");
    e.attr("style")
      ? t.slideToggle(200, function () {
          e.removeAttr("style");
        })
      : (t.slideToggle(200), e.css("height", "auto")),
      a.toggleClass("fa-chevron-up fa-chevron-down");
  }),
    $(".close-link").click(function () {
      $(this).closest(".p_panel").remove();
    });
    
});
