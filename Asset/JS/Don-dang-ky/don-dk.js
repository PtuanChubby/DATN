$(document).ready(function () {
  var fields = [
    { id: "inputNameTV", outputId: "inputNameTVValue" },
    { id: "inputNameTA", outputId: "inputNameTAValue" },
    { id: "inputLoaidetai", outputId: "inputLoaidetaiValue" },
    { id: "inputhedaotao", outputId: "inputhedaotaoValue" },
    { id: "inputnhomnganh", outputId: "inputnhomnganhValue" },
    { id: "inputchuyennganhhep", outputId: "inputchuyennganhhepValue" },
    { id: "inputNameHT", outputId: "inputNameHTValue" },
    { id: "input-mssv-cn", outputId: "input-mssv-cnValue" },
    { id: "birthday", outputId: "birthdayValue" },
    { id: "inputGioitinh", outputId: "inputGioitinhValue" },
    { id: "inputCCCD", outputId: "inputCCCDValue" },
    { id: "inputNoicap", outputId: "inputNoicapValue" },
    { id: "dateofissua", outputId: "dateofissuaValue" },
    { id: "inputSTK", outputId: "inputSTKValue" },
    { id: "inputTaiNH", outputId: "inputTaiNHValue" },
    { id: "inputCNNH", outputId: "inputCNNHValue" },
    { id: "inputDiachi", outputId: "inputDiachiValue" },
    { id: "inputSDT", outputId: "inputSDTValue" },
    { id: "inputEmail", outputId: "inputEmailValue" },
    { id: "inputSotienso", outputId: "inputSotiensoValue" },
    { id: "inputSotienchu", outputId: "inputSotienchuValue" },
    { id: "inputFile", outputId: "inputFileLink" },

    // Thêm các trường dữ liệu khác tại đây
  ];

  // Sự kiện khi chuyển đến bước trước đó
  $("#smartwizard").on(
    "leaveStep",
    function (e, anchorObject, stepNumber, stepDirection) {
      if (stepDirection === "backward") {
        for (var i = 0; i < fields.length; i++) {
          if (stepNumber === i + 1) {
            var inputFieldValue = $("#" + fields[i].id).val();
            $("#" + fields[i].outputId).text(inputFieldValue);
            break;
          }
        }
        if (stepNumber >= 1) {
          updateStep4Data();
        }
      }
    }
  );

  // Sự kiện khi chuyển đến bước tiếp theo
  $("#smartwizard").on(
    "showStep",
    function (e, anchorObject, stepNumber, stepDirection) {
      if (stepDirection === "forward" && stepNumber === 2) {
        for (var i = 0; i < fields.length; i++) {
          var inputFieldValue = $("#" + fields[i].id).val();
          $("#" + fields[i].outputId).text(inputFieldValue);
        }
      }
      if (stepNumber === 1) {
        var inputFile = $("#inputFile")[0].files[0];
        var inputStep1FileValue = inputFile
          ? inputFile.name
          : "";
        var inputFileLink = $("#inputFileLink");
        inputFileLink.text(inputStep1FileValue);

        if (inputFile) {
          // Tạo một đường dẫn tạm thời cho tệp tin
          var fileURL = URL.createObjectURL(inputFile);
          inputFileLink.attr("href", fileURL);
          inputFileLink.attr("download", inputStep1FileValue);
        } else {
          inputFileLink.attr("href", "#");
        }
      }
      if (stepNumber >= 1) {
        updateStep4Data();
      }
    }
  );

  // Hàm cập nhật dữ liệu cho Bước 4
  function updateStep4Data() {
    for (var i = 0; i < fields.length; i++) {
      var inputFieldValue = $("#" + fields[i].id).val();
      $("#" + fields[i].outputId).text(inputFieldValue);
    }
  }
});


// $(document).ready(function () {
//   var memberCount = 0;
//   var maxMemberCount = 5;
//   var editingMemberIndex = -1; // Biến lưu chỉ số thành viên đang được sửa (-1 nếu không có thành viên nào đang được sửa)

//   $("#add-member-btn").click(function () {
//     if (memberCount >= maxMemberCount) {
//       alert("Đã quá số lượng thành viên được thêm vào.");
//       return;
//     }

//     var email = $("#input-email").val();
//     var name = $("#input-name").val();
//     var mssv = $("#input-mssv").val();
//     var chucvu = $("#input-cvu").val();

//     if (email === "" || name === "" || mssv === "" || chucvu === "") {
//       alert("Vui lòng nhập đầy đủ thông tin thành viên.");
//       return;
//     }

//     if (editingMemberIndex === -1) {
//       // Thêm thành viên mới
//       var memberForm = createMemberForm(email, name, mssv, chucvu);
//       $("#member-list").append(memberForm);
//       memberCount++;
//     } else {
//       // Sửa thông tin thành viên đang được chỉnh sửa
//       var editedMemberForm = createMemberForm(email, name, mssv, chucvu);
//       $("#member-" + editingMemberIndex).replaceWith(editedMemberForm);
//       editingMemberIndex = -1;

//       // Cập nhật số thứ tự của các thành viên
//       updateMemberOrder();
//     }

//     $("#member-modal").modal("hide");

//     $("#input-email").val("");
//     $("#input-name").val("");
//     $("#input-mssv").val("");
//     $("#input-cvu").val("");
//   });

//   $(document).on("click", ".delete-member-btn", function () {
//     $(this).closest(".body_table-tv").remove();
//     memberCount--;

//     // Cập nhật số thứ tự của các thành viên
//     updateMemberOrder();
//   });

//   $(document).on("click", ".edit-member-btn", function () {
//     var $member = $(this).closest(".body_table-tv");
//     var $email = $member.find(".email_tv .text__header");
//     var $name = $member.find(".hvt_tv .text__header");
//     var $mssv = $member.find(".mssv_tv .text__header");
//     var $chucvu = $member.find(".phancong_tv .text__header");

//     var email = $email.text();
//     var name = $name.text();
//     var mssv = $mssv.text();
//     var chucvu = $chucvu.text();

//     $("#input-email").val(email);
//     $("#input-name").val(name);
//     $("#input-mssv").val(mssv);
//     $("#input-cvu").val(chucvu);

//     editingMemberIndex = $member.attr("id").split("-")[1];
//     $("#member-modal").modal("show");

//     // Ẩn nút "Thêm thành viên"
//     $("#add-member-btn").hide();

//     // Hiển thị nút "Lưu"
//     $("#save-member-btn").show();
//   });

//   $("#save-member-btn").click(function () {
//     var email = $("#input-email").val();
//     var name = $("#input-name").val();
//     var mssv = $("#input-mssv").val();
//     var chucvu = $("#input-cvu").val();

//     if (email === "" || name === "" || mssv === "" || chucvu === "") {
//       alert("Vui lòng nhập đầy đủ thông tin thành viên.");
//       return;
//     }

//     var editedMemberForm = createMemberForm(email, name, mssv, chucvu);
//     $("#member-" + editingMemberIndex).replaceWith(editedMemberForm);
//     editingMemberIndex = -1;

//     // Cập nhật số thứ tự của các thành viên
//     updateMemberOrder();

//     // Thay đổi nút thành "Thêm thành viên"
//     $("#add-member-btn").text("Thêm");

//     // Ẩn nút "Lưu"
//     $("#save-member-btn").hide();

//     $("#member-modal").modal("hide");

//     $("#input-email").val("");
//     $("#input-name").val("");
//     $("#input-mssv").val("");
//     $("#input-cvu").val("");
//   });

//   function updateMemberOrder() {
//     $(".body_table-tv .stt_tv .text__header").each(function (index) {
//       var formattedCount = (index + 1).toString().padStart(2, "0");
//       $(this).text(formattedCount);
//     });
//   }

//   function createMemberForm(email, name, mssv, chucvu) {
//     var formattedCount = (memberCount + 1).toString().padStart(2, "0");

//     var memberForm =
//       '<div class="body_table-tv" id="member-' +
//       memberCount +
//       '">' +
//       '<div class="stt_tv">' +
//       '<span class="text__header">' +
//       formattedCount +
//       "</span>" +
//       "</div>" +
//       '<div class="email_tv" style="display: none;">' +
//       '<span class="text__header">' +
//       email +
//       "</span>" +
//       "</div>" +
//       '<div class="hvt_tv">' +
//       '<span class="text__header">' +
//       name +
//       "</span>" +
//       "</div>" +
//       '<div class="mssv_tv">' +
//       '<span class="text__header">' +
//       mssv +
//       "</span>" +
//       "</div>" +
//       '<div class="phancong_tv">' +
//       '<span class="text__header">' +
//       chucvu +
//       "</span>" +
//       "</div>" +
//       '<div class="action_tv">' +
//       '<div class="icon-action">' +
//       '<button class="edit-member-btn btn-xs btn-sua"><i class="bi bi-pencil-fill"></i></button>' + // Thay đổi nút "Sửa" thành "Lưu"
//       '<button class="delete-member-btn btn-xs btn-xoa"><i class="bi bi-trash3-fill"></i></button>' +
//       "</div>" +
//       "</div>" +
//       "</div>";

//     return memberForm;
//   }
// });
