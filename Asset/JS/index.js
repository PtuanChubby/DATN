$(document).ready(function () {
  "use strict";
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var c = 0;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".progressbar li").on("click", function () {
    var current_fs = $(this);

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!validateData(current_fs)) {
      return;
    }

    $(".progress-bar li.active").removeClass("active");
    current_fs.addClass("active");

    showActive(current_fs.index());
    showFieldset(current_fs.index());
  });

  function validateData() {
    var inputs = $("fieldset:visible").find(
      "input#inputNameHT, input#input-mssv-cn, textarea#inputNameTV, textarea#inputNameTA"
    );
    
    var isValid = true;

    inputs.each(function () {
      var input = $(this);
      var value = input.val().trim();
      // var errorContainer = input.next(".invalid-feedback");

      if (value === "") {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
        // errorContainer.show();
        isValid = false;
      } else {
        input.removeClass("is-invalid");
        input.addClass("is-valid");
        // errorContainer.hide();
      }
    });

    

    return isValid;
  }

  $(".next").click(function () {
    current_fs = $(this).parent().parent().parent();
    next_fs = $(this).parent().parent().parent().next();
    c = next_fs.index();

    // Kiểm tra xem có các id đã được gọi hay không
    var input = current_fs.find(
      "input#inputNameHT, input#input-mssv-cn,  textarea#inputNameTV, textarea#inputNameTA"
    );
    if (input.length === 0) {
      // Nếu không có các id đã được gọi, bỏ qua và chuyển đến fieldset tiếp theo
      $(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
      next_fs.show();
      next_fs.animate({ scrollTop: 0 } * 100);
      $(".fieldset-card").scrollTop(0);
      current_fs.animate(
        { opacity: 0 },
        {
          step: function (now) {
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
      return;
    }

    // Kiểm tra tính hợp lệ của dữ liệu
    var value = input.val().trim();
    var id = input.attr("id");
    if (value === "" && id) {
      input.addClass("is-invalid");
      input.removeClass("is-valid");
      return;
    }

    // Add Class Active
    $(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    // Show the next fieldset
    next_fs.show();
    next_fs.animate({ scrollTop: 0 } * 100);
    $(".fieldset-card").scrollTop(0);

    // Hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
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

  $("input#inputNameHT, input#input-mssv-cn, textarea#inputNameTV, textarea#inputNameTA").on("input", function () {
    // Kiểm tra tính hợp lệ của dữ liệu
    var value = $(this).val();
    if (value.trim() !== "") {
      // Nếu dữ liệu hợp lệ, ẩn thông báo không hợp lệ,
      // đánh dấu là hợp lệ và thêm lớp is-valid
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      // $(this).parent().find(".invalid-feedback").hide();
    } else {
      // Nếu dữ liệu không hợp lệ, hiển thị thông báo không hợp lệ,
      // đánh dấu là không hợp lệ và xóa lớp is-valid
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      // $(this).parent().find(".invalid-feedback").show();
    }
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
