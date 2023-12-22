$(document).ready(function () {
  "use strict";
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var c = 0;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".progressbar li").on("click", function () {
    $(".progress-bar li active").removeClass("active");
    $(this).addClass("active");
    current_fs = $(this);

    showActive(current_fs.index());
    showFieldset(current_fs.index());
  });

  $(".next").click(function () {
    current_fs = $(this).parent().parent().parent();

    next_fs = $(this).parent().parent().parent().next();
    c = next_fs.index();

    //Add Class Active
    $(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    next_fs.animate({ scrollTop: 0 } * 100);
    $(".fieldset-card").scrollTop(0);

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });

          next_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(++current);
  });

  $(".previous").click(function () {
    current_fs = $(this).parent().parent().parent();
    previous_fs = $(this).parent().parent().parent().prev();
    c = previous_fs.index();

    //Remove class active
    $(".progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    $(".fieldset-card").scrollTop(0);

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(--current);
  });

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  function showActive(index) {
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        $(".progressbar li").eq(i).addClass("active");
      } else {
        $(".progressbar li").eq(i).removeClass("active");
      }
    }
  }
  function showFieldset(index) {
    //show the next fieldset
    if (c != index) {
      $("fieldset").eq(index).show();
      $(".fieldset-card").scrollTop(0);
      //hide the current fieldset with style
      $("fieldset").eq(c).css({
        display: "none",
        position: "relative",
      });
      $("fieldset").eq(index).css({ opacity: 1 });
    }

    c = index;
  }
});
$(document).ready(function () {
  // Lưu các giá trị đã nhập vào các biến
  var inputValues = [];

  var fields = [
    { id: "inputStep1", outputId: "inputStep1Value" },
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

  // Bắt sự kiện khi nút "Tiếp theo" trong từng bước được nhấn
  var btnNext = $(".next");

        btnNext.on("click", function () {
          for (var i = 0; i < fields.length; i++) {
            var input = $("#" + fields[i].id);
            var output = $("#" + fields[i].outputId);

            if (fields[i].id === "inputFile") {
              // Handle file upload
              var fileInput = $("#inputFile")[0];
              uploadedFile = fileInput.files[0];

              // Update the file link with the uploaded file name and make it downloadable
              output.text(uploadedFile.name);
              output.attr("href", URL.createObjectURL(uploadedFile));
              output.attr("download", uploadedFile.name);
            } else {
              inputValues[i] = input.val();
              output.text(inputValues[i]);
            }
          }
        });
});
