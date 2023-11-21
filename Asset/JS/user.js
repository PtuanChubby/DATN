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
      '<div class="row">' +
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

function formatCurrency(number) {
  const formattedNumber = number.toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formattedNumber.replace(/,/g, ".");
}

function handleInputChange(event) {
  const input = event.target;
  const value = parseInt(input.value.replace(/\D/g, "")) || 0;
  const formattedValue = formatCurrency(value);
  input.value = formattedValue;
}

function calculateTotal() {
  const inputFields = document.querySelectorAll('input[type="text"]');
  let total_tienCong = 0;
  let total_khoan1_1 = 0;
  let total_khoan1_2 = 0;
  let total_khoan1_3 = 0;
  let total_all_dhqgHCM = 0;
  let total_all_huyDong = 0;
  inputFields.forEach((input) => {
    const value = parseInt(input.value.replace(/\D/g, "")) || 0;
    const id = input.getAttribute("id");
    if (value > 0) {
      if (id === "input1_dhqg" || id === "input2_1_huyDong") {
        total_tienCong += value;
      } else if (id === "input3_1_dhqgHCM" || id === "input3_1_huyDong") {
        total_khoan1_1 += value;
      } else if (id === "input3_2_dhqgHCM" || id === "input3_2_huyDong") {
        total_khoan1_2 += value;
      } else if (id === "input3_3_dhqgHCM" || id === "input3_3_huyDong") {
        total_khoan1_3 += value;
      }
      if (id.includes("dhqg")) {
        total_all_dhqgHCM += value;
      } else if (id.includes("huyDong")) {
        total_all_huyDong += value;
      }
    }
  });
  document.getElementById("total-tienCong").textContent =
    formatCurrency(total_tienCong) + "đ";
  document.getElementById("total-khoan1_1").textContent =
    formatCurrency(total_khoan1_1) + "đ";
  document.getElementById("total-khoan1_2").textContent =
    formatCurrency(total_khoan1_2) + "đ";
  document.getElementById("total-khoan1_3").textContent =
    formatCurrency(total_khoan1_3) + "đ";
  document.getElementById("total-all-dhqgHCM").textContent =
    formatCurrency(total_all_dhqgHCM) + "đ";
  document.getElementById("total-all-huyDong").textContent =
    formatCurrency(total_all_huyDong) + "đ";
  document.getElementById("total-all").textContent =
    formatCurrency(total_all_dhqgHCM + total_all_huyDong) + "đ";
}

const inputFields = document.querySelectorAll('input[type="text"]');
inputFields.forEach((input) => {
  input.addEventListener("input", handleInputChange);
  input.addEventListener("input", calculateTotal);
});
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
)