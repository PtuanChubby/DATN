window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const dataInfo = {};
  for (const [key, value] of urlParams) {
    dataInfo[key] = value;
  }

  // Điền dữ liệu thông tin hiện tại vào các trường chỉnh sửa
  const inputFields = document.getElementsByClassName("input_detai");
  for (let i = 0; i < inputFields.length; i++) {
    const fieldName = inputFields[i].name;
    inputFields[i].value = dataInfo[fieldName];
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    // Lấy dữ liệu từ các trường chỉnh sửa
    const updatedData = {};
    for (let i = 0; i < inputFields.length; i++) {
      const fieldName = inputFields[i].name;
      const fieldValue = inputFields[i].value;
      updatedData[fieldName] = fieldValue;
    }

    // Cập nhật dữ liệu thông tin mới
    Object.assign(dataInfo, updatedData);

    // Lưu dữ liệu mới vào localStorage
    localStorage.setItem(dataInfo.index, JSON.stringify(dataInfo));

    // Hiển thị thông báo cập nhật thành công
    alert("Dữ liệu đã được cập nhật thành công!");

    // Xóa dữ liệu chỉnh sửa trong trường nhập liệu
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].value = "";
    }
  }

  function handleGoBack() {
    window.history.back();
  }

  const submitForm = document.getElementById("SubmitInfo");
  submitForm.addEventListener("click", handleEditSubmit);

  const goBackButton = document.getElementById("goBackButton");
  goBackButton.addEventListener("click", handleGoBack);
};
