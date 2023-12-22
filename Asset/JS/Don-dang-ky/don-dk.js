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
        var inputStep1FileValue = inputFile ? inputFile.name : "";
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
        // Cuộn trang lên đầu
        $("html, body").scrollTop(0);
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


