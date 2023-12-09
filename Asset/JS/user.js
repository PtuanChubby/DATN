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
});

function calculateTotal() {
  const inputFields = document.querySelectorAll('input[type="number"]');
  let total_tienCong = 0;
  let total_khoan1_1 = 0;
  let total_khoan1_2 = 0;

  let total_khoan1_3 = 0;
  let total_all_dhqgHCM = 0;
  let total_all_huyDong = 0;
  inputFields.forEach((input) => {
    const value = parseFloat(input.value) || 0;
    const id = input.getAttribute("id");
    if (value > 0) {
      if (id === "input2_1_dhqgHCM" || id === "input2_1_huyDong") {
        total_tienCong += value;
      } else if (id === "input3_1_dhqgHCM" || id === "input3_1_huyDong") {
        total_khoan1_1 += value;
      } else if (id === "input3_2_dhqgHCM" || id === "input3_2_huyDong") {
        total_khoan1_2 += value;
      } else if (id === "input3_3_dhqgHCM" || id === "input3_3_huyDong") {
        total_khoan1_3 += value;
      }
      if (id.includes("dhqgHCM")) {
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

const inputFields = document.querySelectorAll('input[type="number"]');
inputFields.forEach((input) => {
  input.addEventListener("input", calculateTotal);
});

function formatCurrency(value) {
  return value.toLocaleString("vi-VN");
}
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const tabIndicator = document.querySelector(".tab-indicator div");

  function changeTab(tabIndex) {
    tabs.forEach(function (tab, index) {
      if (index === tabIndex) {
        tab.classList.add("active-tab");
      } else {
        tab.classList.remove("active-tab");
      }
    });

    tabContents.forEach(function (content, index) {
      if (index === tabIndex) {
        content.classList.add("active-tab-content");
      } else {
        content.classList.remove("active-tab-content");
      }
    });

    const tabWidth = tabs[0].offsetWidth;
    const translateXValue = tabIndex * tabWidth;
    tabIndicator.style.transform = "translateX(" + translateXValue + "px)";
  }

  tabs.forEach(function (tab, tabIndex) {
    tab.addEventListener("click", function () {
      changeTab(tabIndex);
    });
  });
});
// Multi Step Form
function setupSlidePage() {
  const slidePage = document.querySelector(".slide-page");
  const nextBtnFirst = document.querySelector(".firstNext");
  const prevBtnSec = document.querySelector(".prev-1");
  const nextBtnSec = document.querySelector(".next-1");
  const prevBtnThird = document.querySelector(".prev-2");
  const nextBtnThird = document.querySelector(".next-2");
  const prevBtnFourth = document.querySelector(".prev-3");
  const submitBtn = document.querySelector(".submit");
  const progressText = document.querySelectorAll(".step p");
  const progressCheck = document.querySelectorAll(".step .check");
  const bullet = document.querySelectorAll(".step .bullet");
  let current = 1;

  function nextSlide(event, percentage) {
    event.preventDefault();
    slidePage.style.marginLeft = percentage;
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  }

  function prevSlide(event, percentage) {
    event.preventDefault();
    slidePage.style.marginLeft = percentage;
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
  }

  nextBtnFirst.addEventListener("click", function (event) {
    nextSlide(event, "-25%");
  });

  nextBtnSec.addEventListener("click", function (event) {
    nextSlide(event, "-50%");
  });

  nextBtnThird.addEventListener("click", function (event) {
    nextSlide(event, "-75%");
  });

  submitBtn.addEventListener("click", function () {
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    setTimeout(function () {
      alert("Your Form Successfully Signed up");
      location.reload();
    }, 800);
  });

  prevBtnSec.addEventListener("click", function (event) {
    prevSlide(event, "0%");
  });

  prevBtnThird.addEventListener("click", function (event) {
    prevSlide(event, "-25%");
  });

  prevBtnFourth.addEventListener("click", function (event) {
    prevSlide(event, "-50%");
  });
}

// Call the function to setup the slide page functionality
setupSlidePage();
// End Multi Step Form
// Checkbox
function handleCheckboxChange(event, siblingCheckboxId) {
  const checkbox = event.target;
  const siblingCheckbox = document.getElementById(siblingCheckboxId);

  if (checkbox.checked) {
    siblingCheckbox.disabled = true;
  } else {
    siblingCheckbox.disabled = false;
  }
}
// End Checkbox