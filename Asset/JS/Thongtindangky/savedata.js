// function saveFormData(event) {
//   event.preventDefault();

//   const inputNameTV = document.getElementById("inputNameTV").value;
//   const inputNameTA = document.getElementById("inputNameTA").value;
//   const inputNameHT = document.getElementById("inputNameHT").value;

//   // Kiểm tra xem các trường input có giá trị không
//   if (inputNameTV && inputNameTA && inputNameHT) {
//     const data = {
//       inputNameTV: inputNameTV,
//       inputNameTA: inputNameTA,
//       inputNameHT: inputNameHT,
//     };
//     const timestamp = Date.now();
//     localStorage.setItem(`Thông tin đã nhập_${timestamp}`, JSON.stringify(data));
//   } else {
//     // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác khi không có dữ liệu đầu vào

//   }
// }

// const nextButton = document.getElementById("btn-next");
// nextButton.addEventListener("click", saveFormData);
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
  }
}

const nextButton = document.getElementById("btn-next");
nextButton.addEventListener("click", saveFormData);

// function saveFormData(event) {
//   event.preventDefault();

//   const inputFields = document.querySelectorAll(".input-field");
//   const data = {};

//   inputFields.forEach((input) => {
//     const fieldName = input.getAttribute("name");
//     const fieldValue = input.value;
//     data[fieldName] = fieldValue;
//   });

//   const timestamp = Date.now();
//   localStorage.setItem(`Thông tin đã nhập_${timestamp}`, JSON.stringify(data));
// }

// const nextButton = document.getElementById("btn-next");
// nextButton.addEventListener("click", saveFormData);
