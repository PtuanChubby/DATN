// Lưu thông tin vào Local Storage
function saveInfo(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const info = {
    name: nameInput.value,
    email: emailInput.value
  };

  localStorage.setItem('info', JSON.stringify(info));

  nameInput.value = '';
  emailInput.value = '';

  window.location.href = 'display.html';
}

// Hiển thị thông tin từ Local Storage
function displayInfo() {
  const infoContainer = document.getElementById('info-container');
  const info = JSON.parse(localStorage.getItem('info'));

  if (info) {
    infoContainer.innerHTML = `
      <p><strong>Họ và tên:</strong> ${info.name}</p>
      <p><strong>Email:</strong> ${info.email}</p>
    `;
  }
}

// Xóa thông tin từ Local Storage
function deleteInfo() {
  localStorage.removeItem('info');
  window.location.href = 'display.html';
}

// Cập nhật thông tin vào Local Storage
function updateInfo(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const info = JSON.parse(localStorage.getItem('info'));

  if (info) {
    info.name = nameInput.value;
    info.email = emailInput.value;

    localStorage.setItem('info', JSON.stringify(info));

    window.location.href = 'display.html';
  }
}

// Gắn bắt sự kiện cho các biểu mẫu
const infoForm = document.getElementById('info-form');
if (infoForm) {
  infoForm.addEventListener('submit', saveInfo);
}

const editForm = document.getElementById('edit-form');
if (editForm) {
  editForm.addEventListener('submit', updateInfo);
}

// Kiểm tra trang hiển thị thông tin và trang xem thông tin
const infoContainer = document.getElementById('info-container');
if (infoContainer) {
  displayInfo();
}