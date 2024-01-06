function saveFormData(event) {
  event.preventDefault();

  const inputFields = document.querySelectorAll(".input_detai");
  const data = {};

  inputFields.forEach((input) => {
    const fieldName = input.getAttribute("name");
    const fieldValue = input.value;
  
    // Kiểm tra xem trường input có giá trị không
    if (fieldValue) {
      data[fieldName] = fieldValue;
    }
  });
  
  if (Object.keys(data).length > 0) {
    const timestamp = Date.now();
    localStorage.setItem(
      `Thông tin đã nhập_${timestamp}`,
      JSON.stringify(data)
    );
  } else {
    console.log("Không có dữ liệu được nhập vào.");
    // Thực hiện các hành động khác tại đây nếu cần thiết
  }
}

const nextButton = document.getElementById("btn-next");
nextButton.addEventListener("click", saveFormData);


