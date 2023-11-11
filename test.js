(function () {
    "use strict";
  
    var treeviewMenu = $(".app-menu");
  
    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $(".app").toggleClass("sidenav-toggled");
    });
  
    // Activate sidebar treeview toggle
    $("[data-toggle='treeview']").click(function (event) {
      event.preventDefault();
      if (!$(this).parent().hasClass("is-expanded")) {
        treeviewMenu
          .find("[data-toggle='treeview']")
          .parent()
          .removeClass("is-expanded");
      }
      $(this).parent().toggleClass("is-expanded");
    });
  })();
  function redirectToUserPage() {
    window.location.href = "profile.html";
  }
  function redirectToRegisterTopic() {
    window.location.href = "dk-de-tai.html";
  }
  $(document).ready(function () {
    var memberCount = 0;
    var maxMemberCount = 5;
  
    $("#add-member-btn").click(function () {
      if (memberCount >= maxMemberCount) {
        alert("Đã quá số lượng thành viên được thêm vào.");
        return;
      }
  
      var email = $("#input-email").val();
      var name = $("#input-name").val();
      var mssv = $("#input-mssv").val();
      var khoa = $("#input-khoa").val();
  
      if (email === "" || name === "" || mssv === "" || khoa === "") {
        alert("Vui lòng nhập đầy đủ thông tin thành viên.");
        return;
      }
  
      var memberForm = createMemberForm(email, name, mssv, khoa);
      $("#member-list").append(memberForm);
  
      $("#member-modal").modal("hide");
  
      $("#input-email").val("");
      $("#input-name").val("");
      $("#input-mssv").val("");
      $("#input-khoa").val("");
  
      memberCount++;
    });
  
    $(document).on("click", ".delete-member-btn", function () {
      $(this).closest(".member-group").remove();
      memberCount--;
    });
  
    function createMemberForm(email, name, mssv, khoa) {
      var memberForm =
      '<tr>' +
      '<td class="text-center"></td>' +
      '<td>' +
        'ĐH. TUẤN PHẠM VĂN<span class="ml-2">' +
          '<i class="researcher-owner pi pi-exclamation-circle" ' +
            'data-pr-tooltip="Chưa đăng tải lý lịch khoa học" ' +
            'data-pr-position="right" ' +
            'data-pr-at="" ' +
            'style="color: var(--red-600); font-size: 15px">' +
          '</i>' +
        '</span>' +
      '</td>' +
      '<td>Trường Đại học Khoa học Xã hội và Nhân văn</td>' +
      '<td>' +
        '<div class="field text-input">' +
          '<div class="">' +
            '<input id="general.owner.assignedTask" type="text" placeholder="" class="input-group-text" value="">' +
          '</div>' +
        '</div>' +
      '</td>' +
      '<td class="float"></td>' +
    '</tr>';
  
        
  
      return memberForm;
    }
  
    $(".collapse-link").on("click", function () {
      var e = $(this).closest(".p_panel"),
        a = $(this).find("i"),
        t = e.find(".p_content");
      e.attr("style")
        ? t.slideToggle(200, function () {
            e.removeAttr("style");
          })
        : (t.slideToggle(200), e.css("height", "auto")),
        a.toggleClass("fa-chevron-up fa-chevron-down");
    }),
      $(".close-link").click(function () {
        $(this).closest(".p_panel").remove();
      });
      
  });
  