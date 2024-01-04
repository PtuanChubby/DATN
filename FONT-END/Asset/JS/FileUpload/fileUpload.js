function handleFileUpload(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  
    const fileInput = document.getElementById("inputFile");
    fileInput.accept = ".pdf"; // Chỉ chấp nhận tệp PDF
    fileInput.click();
  }
  
  function displayFileInfo() {
    const fileInput = document.getElementById("inputFile");
    const fileList = document.getElementById("file-list");
  
    fileList.innerHTML = ""; // Xóa danh sách tệp hiện tại
  
    const files = [...fileInput.files];
    files.forEach((file) => {
      const listItem = document.createElement("li");
      listItem.classList.add("file-item");
      listItem.innerHTML = `
      <strong>${file.name}</strong>
      <i class="fa-solid fa-xmark delete-icon" onclick="deleteFile(this)"></i>
    `;
      fileList.appendChild(listItem);
    });
  }
  
  function deleteFile(deleteIcon) {
    const listItem = deleteIcon.parentNode;
    const fileList = document.getElementById("file-list");
    fileList.removeChild(listItem);
  }
  
  function initializeFileDropzone() {
    const dropzone = document.querySelector(".dropzone");
  
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("highlight");
    });
  
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("highlight");
    });
  
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("highlight");
      const fileInput = document.getElementById("inputFile");
      const files = e.dataTransfer.files;
      fileInput.files = files;
      displayFileInfo();
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    initializeFileDropzone();
  
    const nextButton = document.getElementById("btn-next");
    const fileButton = document.querySelector(".dropzone");
  
    nextButton.addEventListener("click", function (event) {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của form
      // Thực hiện các xử lý khác (chuyển đến bước tiếp theo, vv.)
    });
  
    fileButton.addEventListener("click", handleFileUpload);
  });