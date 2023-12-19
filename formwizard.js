document.addEventListener('DOMContentLoaded', function() {
  // Lấy dữ liệu từ Local Storage
  var inputData = localStorage.getItem('inputData');
  var inputFile = localStorage.getItem('inputFile');
  
  // Hiển thị thông tin lên trang 2
  var inputStep1Value = document.getElementById('inputStep1Value');
  inputStep1Value.textContent = inputData;
  
  var inputStep1FileLink = document.getElementById('inputStep1FileLink');
  inputStep1FileLink.href = inputFile;
  inputStep1FileLink.textContent = 'File';
});