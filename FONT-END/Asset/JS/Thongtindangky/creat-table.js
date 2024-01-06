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
  >${data.tenTV}</span
  >
  </div>
  <div class="cell-tta">
  <span class="text-body_tta"
  >${data.tenTA}</span
  >
  </div>
  <div class="cell-cn">
  <span class="text-body_cn">${data.hoTenCn}</span>
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
  <button class="btn-xem btn-xs" onclick="handleView('${key}')">
  <i class="fa fa-eye"></i>
  </button>
  </div>
  </div>
`;

  return dataDiv;
}

function handleView(key) {
  const allInfo = JSON.parse(localStorage.getItem(key));
  const info = allInfo;
  info.index = key; // Lưu số thứ tự vào thông tin chỉnh sửa
  const queryString = Object.keys(info)
    .map((key) => key + "=" + encodeURIComponent(info[key]))
    .join("&");
  window.location.href = "Xemdetai.html?" + queryString;
}


function handleEdit(key) {
  const allInfo = JSON.parse(localStorage.getItem(key));
  const data = allInfo;
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

  // Kiểm tra nếu không còn thông tin nào hiển thị, hiện lại emptymessage
  if (infoCount === 0) {
    const emptyMessage = document.getElementById("emptymessage");
    emptyMessage.style.display = "flex";
  }
}

function displayInfo() {
  const projectDataTable = document.getElementById("projectDataTable");
  const emptyMessage = document.getElementById("emptymessage");

  const dataKeys = Object.keys(localStorage);

  if (dataKeys.length > 0) {
    emptyMessage.style.display = "none"; // Ẩn thẻ emptymessage nếu có dữ liệu

    dataKeys.forEach((key) => {
      const data = JSON.parse(localStorage.getItem(key));
      const dataDiv = createinfodata(data, key);
      dataDiv.setAttribute("id", key);
      projectDataTable.appendChild(dataDiv);
    });
  } else {
    emptyMessage.style.display = "flex"; // Hiển thị thẻ emptymessage nếu không có dữ liệu
  }
}

// Gọi hàm displayInfo để điền thông tin vào trang web
displayInfo();
