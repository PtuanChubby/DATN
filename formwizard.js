$(document).ready(function () {
    var current_fs, next_fs, previous_fs; // fieldsets
  var opacity;

  // Kiểm tra và hiển thị thông báo khi không có dữ liệu nhập vào
  function validateForm() {
    var form = document.getElementById("msform");
    var currentFieldset = form.querySelector("fieldset:not([style='display:none'])");
    var inputs = currentFieldset.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
        alert("Please fill in all fields.");
        return false;
      }
    }

    return true;
  }

  $(".next").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    // Check if all required fields are filled
    if (!validateFields(current_fs) || !validateForm()) {
      return false;
    }

    // Add Class Active
    $("#progressbar li")
      .eq($("fieldset").index(next_fs))
      .addClass("active");

    // Show the next fieldset
    next_fs.show();
    // Hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fieldset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 600,
        complete: function() {
          // Display values when reaching step 3
          if ($("fieldset").index(next_fs) === 2) {
            displayValues();
          }
        }
      }
    );
  });
  
    $(".previous").click(function () {
      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();
  
      // Remove class active
      $("#progressbar li")
        .eq($("fieldset").index(current_fs))
        .removeClass("active");
  
      // Show the previous fieldset
      previous_fs.show();
  
      // Hide the current fieldset with style
      current_fs.animate(
        { opacity: 0 },
        {
          step: function (now) {
            // for making fieldset appear animation
            opacity = 1 - now;
  
            current_fs.css({
              display: "none",
              position: "relative",
            });
            previous_fs.css({ opacity: opacity });
          },
          duration: 600,
        }
      );
    });
  
    $(".radio-group .radio").click(function () {
      $(this).parent().find(".radio").removeClass("selected");
      $(this).addClass("selected");
    });
  
    $(".submit").click(function () {
      // Check if all required fields are filled
      if (!validateFields($("fieldset").last()) || !validateForm()) {
        alert("Please fill in all required fields.");
        return false;
      }
  
      // Show completion message
      alert("Form submitted successfully!");
  
      return false;
    });
  });
  
  // Function to display entered values on the last step
  function displayValues() {
    var fname = $("input[name='fname']").val();
    var lname = $("input[name='lname']").val();
    var email = $("input[name='email']").val();
    var contact = $("input[name='phno']").val();
    var contact2 = $("input[name='phno_2']").val();
    var payment = $(".radio-group .radio.selected").attr("data-value");
  
    $("#fname-val").text(fname);
    $("#lname-val").text(lname);
    $("#email-val").text(email);
    $("#contact-val").text(contact);
    $("#contact2-val").text(contact2);
    $("#payment-val").text(payment);
  }
  
  // Function to validate required fields in a fieldset
  function validateFields(fieldset) {
  var isValid = true;

  fieldset.find("input.required").each(function () {
    if ($(this).val() === "") {
      isValid = false;
      $(this).addClass("error");

      // Thêm thông báo lỗi
      var fieldName = $(this).attr("name");
      $(this).after("<span class='error-message'>Please enter a value for " + fieldName + ".</span>");
    } else {
      $(this).removeClass("error");
      // Xóa thông báo lỗi (nếu có)
      $(this).next(".error-message").remove();
    }
  });

  return isValid;
}
  
  // Call the displayValues function when the form is submitted
  $("form").submit(function (e) {
    e.preventDefault();
    displayValues();
  });