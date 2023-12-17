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
// input-name__detai
$(document).ready(function () {
  $("#inputNameTV , #inputNameTA, #inputDiachi").on("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});
// them thanh vien
$(document).ready(function () {
  var maxMemberCount = 5;
  var editingMemberIndex = -1;

  $("#add-member-btn").click(function () {
    if ($("#member-list .body_table-tv").length >= maxMemberCount) {
      alert("Đã quá số lượng thành viên được thêm vào.");
      return;
    }

    var email = $("#input-email").val();
    var name = $("#input-name").val();
    var mssv = $("#input-mssv").val();
    var chucvu = $("#input-cvu").val();

    if (email === "" || name === "" || mssv === "" || chucvu === "") {
      alert("Vui lòng nhập đầy đủ thông tin thành viên.");
      return;
    }

    if (editingMemberIndex === -1) {
      // Thêm thành viên mới
      var memberForm = createMemberForm(email, name, mssv, chucvu);
      $("#member-list").append(memberForm);
    } else {
      // Sửa thông tin thành viên đang được chỉnh sửa
      var editedMemberForm = createMemberForm(email, name, mssv, chucvu);
      $("#member-" + editingMemberIndex).replaceWith(editedMemberForm);
      editingMemberIndex = -1;

      // Cập nhật số thứ tự của các thành viên
      updateMemberOrder();
    }

    $("#member-modal").modal("hide");

    $("#input-email").val("");
    $("#input-name").val("");
    $("#input-mssv").val("");
    $("#input-cvu").val("");
  });

  $(document).on("click", ".delete-member-btn", function () {
    $(this).closest(".body_table-tv").remove();

    // Cập nhật số thứ tự của các thành viên
    updateMemberOrder();
  });

  $(document).on("click", ".edit-member-btn", function () {
    var $member = $(this).closest(".body_table-tv");
    var $email = $member.find(".email_tv .text__header");
    var $name = $member.find(".hvt_tv .text__header");
    var $mssv = $member.find(".mssv_tv .text__header");
    var $chucvu = $member.find(".phancong_tv .text__header");

    var email = $email.text();
    var name = $name.text();
    var mssv = $mssv.text();
    var chucvu = $chucvu.text();

    $("#input-email").val(email);
    $("#input-name").val(name);
    $("#input-mssv").val(mssv);
    $("#input-cvu").val(chucvu);

    editingMemberIndex = $member.attr("id").split("-")[1];
    $("#member-modal").modal("show");

    // Ẩn nút "Thêm thành viên"
    $("#add-member-btn").hide();

    // Hiển thị nút "Lưu"
    $("#save-member-btn").show();
  });

  $("#save-member-btn").click(function () {
    var email = $("#input-email").val();
    var name = $("#input-name").val();
    var mssv = $("#input-mssv").val();
    var chucvu = $("#input-cvu").val();

    if (email === "" || name === "" || mssv === "" || chucvu === "") {
      alert("Vui lòng nhập đầy đủ thông tin thành viên.");
      return;
    }

    var editedMemberForm = createMemberForm(email, name, mssv, chucvu);
    $("#member-" + editingMemberIndex).replaceWith(editedMemberForm);
    editingMemberIndex = -1;

    // Cập nhật số thứ tự của các thành viên
    updateMemberOrder();

    // Thay đổi nút thành "Thêm thành viên"
    $("#add-member-btn").text("Thêm");

    // Ẩn modal
    $("#member-modal").modal("hide");

    // Xóa dữ liệu đã nhập
    $("#input-email").val("");
    $("#input-name").val("");
    $("#input-mssv").val("");
    $("#input-cvu").val("");

    // Hiển thị nút "Thêm thành viên" và ẩn nút "Lưu"
    $("#add-member-btn").show();
    $("#save-member-btn").hide();
  });

  $("#close-member-btn").click(function () {
    // Xóa dữ liệu đã nhập
    $("#input-email").val("");
    $("#input-name").val("");
    $("#input-mssv").val("");
    $("#input-cvu").val("");

    // Hiển thị nút "Thêm thành viên" và ẩn nút "Lưu"
    $("#add-member-btn").show();
    $("#save-member-btn").hide();
  });

  function updateMemberOrder() {
    $(".body_table-tv .stt_tv .text__header").each(function (index) {
      var formattedCount = (index + 1).toString().padStart(2, "0");
      $(this).text(formattedCount);
    });
  }

  var isFirstMember = true;

  function createMemberForm(email, name, mssv, chucvu) {
    // Check if the maximum member count is reached
    if ($("#member-list .body_table-tv").length >= maxMemberCount) {
      alert("Đã quá số lượng thành viên được thêm vào.");
      return "";
    }

    var formattedCount = ($("#member-list .body_table-tv").length + 1)
      .toString()
      .padStart(2, "0");

    var memberForm = "";

    if (isFirstMember) {
      memberForm +=
        '<div class="header_table-tv">' +
        '<div class="stt_tv">' +
        '<span class="text__header">STT</span>' +
        "</div>" +
        '<div class="hvt_tv">' +
        '<span class="text__header">Họ và tên</span>' +
        "</div>" +
        '<div class="mssv_tv">' +
        '<span class="text__header">Mã số sinh viên</span>' +
        "</div>" +
        '<div class="phancong_tv">' +
        '<span class="text__header">Phân công</span>' +
        "</div>" +
        '<div class="action_tv">' +
        '<span class="text__header">Thao tác</span>' +
        "</div>" +
        "</div>";

      isFirstMember = false;
    }

    memberForm +=
      '<div class="body_table-tv" id="member-' +
      formattedCount +
      '">' +
      '<div class="stt_tv">' +
      '<span class="text__header">' +
      formattedCount +
      "</span>" +
      "</div>" +
      '<div class="email_tv" style="display: none;">' +
      '<span class="text__header">' +
      email +
      "</span>" +
      "</div>" +
      '<div class="hvt_tv">' +
      '<span class="text__header">' +
      name +
      "</span>" +
      "</div>" +
      '<div class="mssv_tv">' +
      '<span class="text__header">' +
      mssv +
      "</span>" +
      "</div>" +
      '<div class="phancong_tv">' +
      '<span class="text__header">' +
      chucvu +
      "</span>" +
      "</div>" +
      '<div class="action_tv">' +
      '<div class="icon-action">' +
      '<button class="edit-member-btn btn-xs btn-sua"><i class="bi bi-pencil-fill"></i></button>' +
      '<button class="delete-member-btn btn-xs btn-xoa"><i class="bi bi-trash3-fill"></i></button>' +
      "</div>" +
      "</div>" +
      "</div>";

    return memberForm;
  }
});


// tính số tiền
function calculateTotal() {
  const inputFields = document.querySelectorAll('input[type="number"]');
  let total_tienCong = 0;
  let total_nganhn1_1 = 0;
  let total_nganhn1_2 = 0;

  let total_nganhn1_3 = 0;
  let total_all_dhqgHCM = 0;
  let total_all_huyDong = 0;
  inputFields.forEach((input) => {
    const value = parseFloat(input.value) || 0;
    const id = input.getAttribute("id");
    if (value > 0) {
      if (id === "input2_1_dhqgHCM" || id === "input2_1_huyDong") {
        total_tienCong += value;
      } else if (id === "input3_1_dhqgHCM" || id === "input3_1_huyDong") {
        total_nganhn1_1 += value;
      } else if (id === "input3_2_dhqgHCM" || id === "input3_2_huyDong") {
        total_nganhn1_2 += value;
      } else if (id === "input3_3_dhqgHCM" || id === "input3_3_huyDong") {
        total_nganhn1_3 += value;
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
  document.getElementById("total-nganhn1_1").textContent =
    formatCurrency(total_nganhn1_1) + "đ";
  document.getElementById("total-nganhn1_2").textContent =
    formatCurrency(total_nganhn1_2) + "đ";
  document.getElementById("total-nganhn1_3").textContent =
    formatCurrency(total_nganhn1_3) + "đ";
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
// /tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
// tab-content
// document.addEventListener("DOMContentLoaded", function () {
//   const tabs = document.querySelectorAll(".tab");
//   const tabContents = document.querySelectorAll(".tab-content");
//   const tabIndicator = document.querySelector(".tab-indicator div");

//   function changeTab(tabIndex) {
//     tabs.forEach(function (tab, index) {
//       if (index === tabIndex) {
//         tab.classList.add("active-tab");
//       } else {
//         tab.classList.remove("active-tab");
//       }
//     });

//     tabContents.forEach(function (content, index) {
//       if (index === tabIndex) {
//         content.classList.add("active-tab-content");
//       } else {
//         content.classList.remove("active-tab-content");
//       }
//     });

//     const tabWidth = tabs[0].offsetWidth;
//     const translateXValue = tabIndex * tabWidth;
//     tabIndicator.style.transform = "translateX(" + translateXValue + "px)";
//   }

//   tabs.forEach(function (tab, tabIndex) {
//     tab.addEventListener("click", function () {
//       changeTab(tabIndex);
//     });
//   });
// });
// End tab-content
// Pagination
// Selecting DOM elements
const startBtn = document.querySelector("#startBtn"),
  endBtn = document.querySelector("#endBtn"),
  prevNext = document.querySelectorAll(".prevNext"),
  numbers = document.querySelectorAll(".link");

// Setting an initial step
let currentStep = 0;

// Function to update the button states
const updateBtn = () => {
  // If we are at the last step
  if (currentStep === 4) {
    endBtn.disabled = true;
    prevNext[1].disabled = true;
  } else if (currentStep === 0) {
    // If we are at the first step
    startBtn.disabled = true;
    prevNext[0].disabled = true;
  } else {
    endBtn.disabled = false;
    prevNext[1].disabled = false;
    startBtn.disabled = false;
    prevNext[0].disabled = false;
  }
};

// Add event listeners to the number links
numbers.forEach((number, numIndex) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();
    // Set the current step to the clicked number link
    currentStep = numIndex;
    // Remove the "active" class from the previously active number link
    document.querySelector(".active").classList.remove("active");
    // Add the "active" class to the clicked number link
    number.classList.add("active");
    updateBtn(); // Update the button states
  });
});

// Add event listeners to the "Previous" and "Next" buttons
prevNext.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Increment or decrement the current step based on the button clicked
    currentStep += e.target.id === "next" ? 1 : -1;
    numbers.forEach((number, numIndex) => {
      // Toggle the "active" class on the number links based on the current step
      number.classList.toggle("active", numIndex === currentStep);
      updateBtn(); // Update the button states
    });
  });
});

// Add event listener to the "Start" button
startBtn.addEventListener("click", () => {
  // Remove the "active" class from the previously active number link
  document.querySelector(".active").classList.remove("active");
  // Add the "active" class to the first number link
  numbers[0].classList.add("active");
  currentStep = 0;
  updateBtn(); // Update the button states
  endBtn.disabled = false;
  prevNext[1].disabled = false;
});

// Add event listener to the "End" button
endBtn.addEventListener("click", () => {
  // Remove the "active" class from the previously active number link
  document.querySelector(".active").classList.remove("active");
  // Add the "active" class to the last number link
  numbers[4].classList.add("active");
  currentStep = 4;
  updateBtn(); // Update the button states
  startBtn.disabled = false;
  prevNext[0].disabled = false;
});
// End Pagination
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
(function () {
  // Khởi tạo SmartWizard
  // Sự kiện khi chuyển đến bước trước đó
  $("#smartwizard").on(
    "leaveStep",
    function (e, anchorObject, stepNumber, stepDirection) {
      if (stepDirection === "backward" && stepNumber === 3) {
        var inputStep3Value = $("#inputStep3").val();
        $("#inputStep3Value").text(inputStep3Value);
        updateStep4Data();
      }
    }
  );

  // Sự kiện khi chuyển đến bước tiếp theo
  $("#smartwizard").on(
    "showStep",
    function (e, anchorObject, stepNumber, stepDirection) {
      if (stepDirection === "forward" && stepNumber === 2) {
        var inputStep1Value = $("#inputStep1").val();
        var inputStep2Value = $("#inputStep2").val();
        var inputStep3Value = $("#inputStep3").val();
        $("#inputStep1Value").text(inputStep1Value);
        $("#inputStep2Value").text(inputStep2Value);
        $("#inputStep3Value").text(inputStep3Value);
      }
      if (stepNumber === 3) {
        updateStep4Data();
      }
    }
  );

  // Hàm cập nhật dữ liệu cho Bước 4
  function updateStep4Data() {
    var inputStep1Value = $("#inputStep1").val();
    var inputStep2Value = $("#inputStep2").val();
    var inputStep3Value = $("#inputStep3").val();
    $("#inputStep1Value").text(inputStep1Value);
    $("#inputStep2Value").text(inputStep2Value);
    $("#inputStep3Value").text(inputStep3Value);
  }
});
// End Multi Step Form
