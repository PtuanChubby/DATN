$(document).ready(function () {
    $("input[data-type='currency']").on("input", function () {
      var input = $(this)[0];
      var inputValue = input.value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      var caretPosition = input.selectionStart;
      var formattedValue = inputValue;

      input.value = formattedValue;
      var newCaretPosition = caretPosition + 1;
      input.setSelectionRange(newCaretPosition, newCaretPosition);
    });
  });