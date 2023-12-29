var infoCount = 0;
function createinfodata(data, key) {
  const dataDiv = document.createElement("div");
  dataDiv.setAttribute("data-index", key); // Lưu số thứ tự vào thuộc tính data-index
  dataDiv.classList.add("information_table"); // Add the "info-container" class to the parent element
  infoCount++; // Tăng giá trị biến đếm sau mỗi lần tạo thông tin

  const formattedStt = String(infoCount).padStart(2, "0"); // Định dạng số thứ tự
  dataDiv.innerHTML = `
  <div class="table_check-box">
  <input class="form-check-input" type="checkbox" />
  </div>
  <div class="cell-stt">
  <span class="text-body_stt">${formattedStt}</span>
  </div>
  <div class="cell-ttv">
  <span class="text-body_ttv"
  >${data.inputNameTV}</span
  >
  </div>
  <div class="cell-tta">
  <span class="text-body_tta"
  >${data.inputNameTA}</span
  >
  </div>
  <div class="cell-cn">
  <span class="text-body_cn">${data.inputNameHT}</span>
  </div>
  <div class="cell-time">
  <span class="text-body_time"
  >01/10/2023 - 23/01/2024</span
  >
  </div>
  <div class="cell-action">
  <div class="icon-action">
  <button class="btn-sua btn-xs" onclick="handleEdit('${key}')">
  <i class="fa fa-pencil"></i>
  </button>
  <button class="btn-xoa btn-xs" onclick="handleDelete('${key}')">
  <i class="fa fa-trash-o"></i>
  </button>
  </div>
  </div>
`;

  return dataDiv;
}

function handleView(key) {
  const data = JSON.parse(localStorage.getItem(key));
  localStorage.setItem("Thông tin xem", JSON.stringify(data));
  window.location.href = "trang3.html";
}

function handleEdit(key) {
  const allData = JSON.parse(localStorage.getItem(key));
  const data = allData;
  data.index = key; // Lưu số thứ tự vào thông tin chỉnh sửa
  const queryString = Object.keys(data)
    .map((key) => key + "=" + encodeURIComponent(data[key]))
    .join("&");
  window.location.href = "Chinhsuadetai.html?" + queryString;
}

function handleDelete(key) {
  localStorage.removeItem(key);
  const dataDiv = document.getElementById(key);
  dataDiv.parentNode.removeChild(dataDiv);

  infoCount--; // Giảm giá trị biến đếm sau mỗi lần xóa thông tin

  // Cập nhật lại số thứ tự của các thông tin còn lại
  const dataDivs = document.getElementsByClassName("information_table");
  for (let i = 0; i < dataDivs.length; i++) {
    const dataDiv = dataDivs[i];
    const sttDiv = dataDiv.querySelector(".cell-stt");
    const sttSpan = sttDiv.querySelector(".text-body_stt");
    sttSpan.innerHTML = String(i + 1).padStart(2, "0");
  }
}

function displayInfo() {
  const projectDataTable = document.getElementById("projectDataTable");

  // Lấy các khóa thông tin từ local storage
  const dataKeys = Object.keys(localStorage);

  // Kiểm tra xem có thông tin nào có sẵn hay không
  if (dataKeys.length > 0) {
    // Duyệt qua các khóa thông tin và tạo các div thông tin
    dataKeys.forEach((key) => {
      const data = JSON.parse(localStorage.getItem(key));
      const dataDiv = createinfodata(data, key);
      dataDiv.setAttribute("id", key);
      projectDataTable.appendChild(dataDiv);
    });
  }
}

// Gọi hàm displayInfo để điền thông tin vào trang web
displayInfo();
