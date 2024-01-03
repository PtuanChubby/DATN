
document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const infoData = {};
  for (const [key, value] of urlParams) {
    infoData[key] = value;
  }

  // Điền dữ liệu thông tin hiện tại vào các trường chỉnh sửa
  const inputFields = document.getElementsByClassName("input_detai");
  for (let i = 0; i < inputFields.length; i++) {
    const fieldName = inputFields[i].name;
    inputFields[i].value = infoData[fieldName];
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
    Object.assign(infoData, updatedData);

    // Lưu dữ liệu mới vào localStorage
    localStorage.setItem(infoData.index, JSON.stringify(infoData));

    // Hiển thị thông báo cập nhật thành công
    alert("Dữ liệu đã được cập nhật thành công!");

    // Xóa dữ liệu chỉnh sửa trong trường nhập liệu
    
  }

 

  const submitForm = document.getElementById("SubmitInfo");
  submitForm.addEventListener("click", handleEditSubmit);


});