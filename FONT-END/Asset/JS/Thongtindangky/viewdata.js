window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const infoData = {};
    for (const [key, value] of urlParams) {
      infoData[key] = value;
    }

    // Điền dữ liệu thông tin đã nhập vào các trường chỉnh sửa
    const inputFields = document.getElementsByClassName("input_detai");
    for (let i = 0; i < inputFields.length; i++) {
      const fieldName = inputFields[i].name;
      if (infoData.hasOwnProperty(fieldName)) {
        inputFields[i].value = infoData[fieldName];
      }
    }

    function handleGoBack() {
      window.history.back();
    }

    const goBackButton = document.getElementById("goBackButton");
    goBackButton.addEventListener("click", handleGoBack);
  };