/*!
 * jQuery SmartWizard v6.0.6
 * The awesome step wizard plugin for jQuery
 * http://www.techlaboratory.net/jquery-smartwizard
 *
 * Created by Dipu Raj (http://dipu.me)
 *
 * Licensed under the terms of the MIT License
 * https://github.com/techlab/jquery-smartwizard/blob/master/LICENSE
 */

(function (factory) {
  if (typeof define === "function" && define.amd) {
    // Nếu định nghĩa hàm "define" tồn tại và hỗ trợ AMD (Asynchronous Module Definition)
    // Đăng ký module như một module ẩn
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    // Nếu đang sử dụng Node.js hoặc CommonJS
    // Xuất module và trả về một hàm factory nhận jQuery làm đối số
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') trả về một hàm factory yêu cầu window để xây dựng một phiên bản jQuery
        // chúng ta chuẩn hóa cách sử dụng modules trong trường hợp này, nhưng window được cung cấp là "noop" (không có tác dụng)
        if (typeof window !== "undefined") {
          jQuery = require("jquery");
        } else {
          jQuery = require("jquery")(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Trường hợp sử dụng trong trình duyệt
    factory(jQuery);
  }
})(function ($) {
  "use strict";

  // Các tùy chọn mặc định
  const defaults = {
    selected: 0, // Bước ban đầu đã chọn, 0 = bước đầu tiên
    theme: "dots", // Chủ đề cho wizard, cần bao gồm css liên quan cho chủ đề khác ngoài chủ đề mặc định
    justified: true, // Căn chỉnh thanh điều hướng. true/false
    autoAdjustHeight: true, // Tự động điều chỉnh chiều cao nội dung
    backButtonSupport: true, // Kích hoạt hỗ trợ nút quay lại
    enableUrlHash: true, // Kích hoạt chọn bước dựa trên url hash
    transition: {
      animation: "none", // Hiệu ứng chuyển đổi khi điều hướng, none|fade|slideHorizontal|slideVertical|slideSwing|css(Cần chỉ định lớp CSS Animation)
      speed: "400", // Tốc độ hiệu ứng. Không sử dụng nếu animation là 'css'
      easing: "", // Easing của hiệu ứng. Không hỗ trợ nếu không có plugin jQuery easing. Không sử dụng nếu animation là 'css'
      prefixCss: "", // Chỉ sử dụng nếu animation là 'css'. Tiền tố CSS Animation
      fwdShowCss: "", // Chỉ sử dụng nếu animation là 'css'. CSS Animation hiển thị bước khi điều hướng về phía trước
      fwdHideCss: "", // Chỉ sử dụng nếu animation là 'css'. CSS Animation ẩn bước khi điều hướng về phía trước
      bckShowCss: "", // Chỉ sử dụng nếu animation là 'css'. CSS Animation hiển thị bước khi điều hướng về phía sau
      bckHideCss: "", // Chỉ sử dụng nếu animation là 'css'. CSS Animation ẩn bước khi điều hướng về phía sau
    },
    toolbar: {
      position: "bottom", // none|top|bottom|both
      showNextButton: true, // Hiển thị/ẩn nút Tiếp theo
      showPreviousButton: true, // Hiển thị/ẩn nút Quay lại
      extraHtml: "", // HTML bổ sung hiển thị trên thanh công cụ
    },
    anchor: {
      enableNavigation: true, // Kích hoạt/ Vô hiệu hóa điều hướng bằng mốc
      enableNavigationAlways: false, // Kích hoạt việc bấm vào mọi mốc luôn có thể chọn
      enableDoneState: true, // Thêm trạng thái đã hoàn thành cho các bước đã được chọn
      markPreviousStepsAsDone: true, // Khi một bước được chọn bằng url hash, tất cả các bước trước đó được đánh dấu là đã hoàn thành
      unDoneOnBackNavigation: false, // Trong quá trình điều hướng quay lại, trạng thái đã hoàn thành sẽ được xóa
      enableDoneStateNavigation: true, // Kích hoạt/Vô hiệu hóa điều hướng bằng trạng thái đã hoàn thành
    },
    keyboard: {
      keyNavigation: true, // Kích hoạt/ Vô hiệu hóa điều hướng bằng bàn phím (sử dụng các phím trái và phải nếu được kích hoạt)
      keyLeft: [37], // Mã phím Trái
      keyRight: [39], // Mã phím Phải
    },
    lang: {
      // Biến ngôn ngữ cho nút
      next: "Tiếp theo",
      previous: "Quay lại",
    },
    style: {
      // CSS Class settings
      mainCss: "sw", // Lớp CSS chính của thành phần giao diện
      navCss: "nav", // Lớp CSS của thanh điều hướng
      navLinkCss: "nav-link", // Lớp CSS của các liên kết trong thanh điều hướng
      contentCss: "form-content", // Lớp CSS của nội dung chính trong giao diện
      contentPanelCss: "form-pane", // Lớp CSS của các bảng nội dung trong giao diện
      themePrefixCss: "sw-theme-", // Tiền tố CSS cho các lớp liên quan đến chủ đề/kiểu giao diện
      anchorDefaultCss: "default", // Lớp CSS mặc định cho các mục tiêu (anchor)
      anchorDoneCss: "done", // Lớp CSS cho các mục tiêu (anchor) đã hoàn thành
      anchorActiveCss: "active", // Lớp CSS cho mục tiêu (anchor) đang hoạt động
      anchorDisabledCss: "disabled", // Lớp CSS cho mục tiêu (anchor) bị vô hiệu hóa
      anchorHiddenCss: "hidden", // Lớp CSS cho mục tiêu (anchor) bị ẩn
      anchorErrorCss: "error", // Lớp CSS cho mục tiêu (anchor) gặp lỗi
      anchorWarningCss: "warning", // Lớp CSS cho mục tiêu (anchor) gặp cảnh báo
      justifiedCss: "sw-justified", // Lớp CSS cho căn chính các mục tiêu (anchor) trong thanh điều hướng
      btnCss: "sw-btn", // Lớp CSS cho các nút trong giao diện
      btnNextCss: "sw-btn-next", // Lớp CSS cho nút "Tiếp theo"
      btnPrevCss: "sw-btn-prev", // Lớp CSS cho nút "Quay lại"
      loaderCss: "sw-loading", // Lớp CSS cho thành phần hiển thị khi đang tải dữ liệu
      progressCss: "progress", // Lớp CSS cho thanh tiến trình
      progressBarCss: "progress-bar", // Lớp CSS cho thanh tiến trình trong thanh tiến trình
      toolbarCss: "toolbar", // Lớp CSS cho thanh công cụ
      toolbarPrefixCss: "toolbar-", // Tiền tố CSS cho các lớp liên quan đến thanh công cụ
    },
    disabledSteps: [], // Mảng các bước bị vô hiệu hóa
    errorSteps: [], // Mảng các bước bị lỗi
    warningSteps: [], // Mảng các bước bị cảnh báo
    hiddenSteps: [], // Các bước bị ẩn
    getContent: null, // Hàm gọi lại để tải nội dung
  };

  class SmartWizard {
    constructor(element, options) {
      // Kết hợp cài đặt của người dùng với các giá trị mặc định
      this.options = $.extend(true, {}, defaults, options);
      // Phần tử chứa chính
      this.main = $(element);
      // Phần tử thanh điều hướng
      this.nav = this._getFirstDescendant("." + this.options.style.navCss);
      // Bộ chứa nội dung
      this.container = this._getFirstDescendant(
        "." + this.options.style.contentCss
      );
      // Các phần tử mốc bước
      this.steps = this.nav.find("." + this.options.style.navLinkCss);
      // Các trang nội dung
      this.pages = this.container.children(
        "." + this.options.style.contentPanelCss
      );
      // Thanh tiến trình
      this.progressbar = this.main.find("." + this.options.style.progressCss);
      // Hướng, RTL/LTR
      this.dir = this._getDir();
      // Chỉ mục bước ban đầu
      this.current_index = -1;
      // Đã được khởi tạo
      this.is_init = false;

      // Khởi tạo các tùy chọn
      this._init();

      // Tải wizard bất đồng bộ
      setTimeout(() => {
        this._load();
      }, 0);
    }

    // Khởi tạo các tùy chọn
    _init() {
      // Đặt các phần tử
      this._setElements();
      // Thêm thanh công cụ
      this._setToolbar();

      // Bỏ qua nếu đã khởi tạo trước đó
      if (this.is_init === true) return true;

      // Gán các sự kiện của plugin
      this._setEvents();

      this.is_init = true;
      // Kích hoạt sự kiện initialized
      this._triggerEvent("initialized");
    }

    // Phương thức Load ban đầu
    _load() {
      // Xóa các phần tử
      this.pages.hide();

      // Xóa các trạng thái khác từ các bước
      this.steps.removeClass([
        this.options.style.anchorDoneCss,
        this.options.style.anchorActiveCss,
      ]);

      // Chỉ mục bước ban đầu
      this.current_index = -1;

      // Lấy chỉ mục bước ban đầu
      let idx = this._getURLHashIndex();
      idx = idx !== false ? idx : this.options.selected;
      const idxShowable = this._getShowable(idx - 1, "forward");
      idx =
        idxShowable === null && idx > 0
          ? this._getShowable(-1, "forward")
          : idxShowable;

      // Đánh dấu các bước trước đó là đã hoàn thành
      if (
        idx > 0 &&
        this.options.anchor.enableDoneState &&
        this.options.anchor.markPreviousStepsAsDone
      ) {
        this.steps.slice(0, idx).addClass(this.options.style.anchorDoneCss);
      }

      // Hiển thị bước ban đầu
      this._showStep(idx);
      // Kích hoạt sự kiện loaded
      this._triggerEvent("loaded");
    }

    _getFirstDescendant(selector) {
      // Kiểm tra các phần tử cấp độ đầu tiên
      let elm = this.main.children(selector);
      if (elm.length > 0) {
        return elm;
      }

      // Kiểm tra các phần tử cấp độ thứ hai
      this.main.children().each((i, n) => {
        let tmp = $(n).children(selector);
        if (tmp.length > 0) {
          elm = tmp;
          return false;
        }
      });
      if (elm.length > 0) {
        return elm;
      }

      // Không tìm thấy phần tử
      this._showError("Element not found " + selector);
      return false;
    }

    _getDir() {
      let dir = this.main.prop("dir");
      if (dir.length === 0) {
        dir = document.documentElement.dir;
        // Giúp cách ly các lớp css liên quan
        this.main.prop("dir", dir);
      }
      return dir;
    }

    _setElements() {
      // Đặt các lớp cho các phần tử chính, bao gồm cả css chủ đề
      this.main
        .removeClass((i, className) => {
          return (
            className.match(
              new RegExp(
                "(^|\\s)" + this.options.style.themePrefixCss + "\\S+",
                "g"
              )
            ) || []
          ).join(" ");
        })
        .addClass(
          this.options.style.mainCss +
            " " +
            this.options.style.themePrefixCss +
            this.options.theme
        );

      // Đặt tùy chọn justify cho phần tử chính
      this.main.toggleClass(
        this.options.style.justifiedCss,
        this.options.justified
      );

      // Đặt kiểu mặc định cho các anchor
      if (
        this.options.anchor.enableNavigationAlways !== true ||
        this.options.anchor.enableNavigation !== true
      ) {
        this.steps.addClass(this.options.style.anchorDefaultCss);
      }

      // Đánh dấu các bước bị vô hiệu hóa
      $.each(this.options.disabledSteps, (i, n) => {
        this.steps.eq(n).addClass(this.options.style.anchorDisabledCss);
      });
      // Đánh dấu các bước lỗi
      $.each(this.options.errorSteps, (i, n) => {
        this.steps.eq(n).addClass(this.options.style.anchorErrorCss);
      });
      // Đánh dấu các bước cảnh báo
      $.each(this.options.warningSteps, (i, n) => {
        this.steps.eq(n).addClass(this.options.style.anchorWarningCss);
      });
      // Đánh dấu các bước ẩn
      $.each(this.options.hiddenSteps, (i, n) => {
        this.steps.eq(n).addClass(this.options.style.anchorHiddenCss);
      });
    }

    _setEvents() {
      // Xử lý sự kiện click trên anchor
      this.steps.on("click", (e) => {
        e.preventDefault();
        if (this.options.anchor.enableNavigation !== true) {
          return;
        }

        const elm = $(e.currentTarget);
        if (this._isShowable(elm)) {
          // Lấy chỉ số của bước và hiển thị bước tương ứng
          this._showStep(this.steps.index(elm));
        }
      });

      // Xử lý sự kiện click nút Tiếp theo/Trước đó
      this.main.on("click", (e) => {
        if ($(e.target).hasClass(this.options.style.btnNextCss)) {
          e.preventDefault();
          this._navigate("next");
        } else if ($(e.target).hasClass(this.options.style.btnPrevCss)) {
          e.preventDefault();
          this._navigate("prev");
        }
        return;
      });

      // Xử lý sự kiện điều hướng bằng bàn phím
      $(document).keyup((e) => {
        this._keyNav(e);
      });

      // Xử lý sự kiện nút Quay lại/Chuyển tiếp của trình duyệt
      $(window).on("hashchange", (e) => {
        if (this.options.backButtonSupport !== true) {
          return;
        }
        const idx = this._getURLHashIndex();
        if (idx !== false && this._isShowable(this.steps.eq(idx))) {
          e.preventDefault();
          this._showStep(idx);
        }
      });

      // Sửa chiều cao nội dung khi thay đổi kích thước cửa sổ
      $(window).on("resize", (e) => {
        this._fixHeight(this.current_index);
      });
    }

    _setToolbar() {
      // Xóa thanh công cụ nếu đã tồn tại
      this.main.find(".sw-toolbar-elm").remove();

      const toolbarPosition = this.options.toolbar.position;
      if (toolbarPosition === "none") {
        // Bỏ qua nếu không kích hoạt thanh công cụ
        return;
      } else if (toolbarPosition == "both") {
        this.container.before(this._createToolbar("top"));
        this.container.after(this._createToolbar("bottom"));
      } else if (toolbarPosition == "top") {
        this.container.before(this._createToolbar("top"));
      } else {
        this.container.after(this._createToolbar("bottom"));
      }
    }

    _createToolbar(position) {
      const toolbar = $("<div></div>")
        .addClass(
          "sw-toolbar-elm " +
            this.options.style.toolbarCss +
            " " +
            this.options.style.toolbarPrefixCss +
            position
        )
        .attr("role", "toolbar");
      // Tạo các nút trong thanh công cụ
      const btnNext =
        this.options.toolbar.showNextButton !== false
          ? $("<button></button>")
              .text(this.options.lang.next) // Văn bản của nút "Tiếp theo"
              .addClass(
                "btn " +
                  this.options.style.btnNextCss +
                  " " +
                  this.options.style.btnCss
              )
              .attr("type", "button")
          : null;
      const btnPrevious =
        this.options.toolbar.showPreviousButton !== false
          ? $("<button></button>")
              .text(this.options.lang.previous) // Văn bản của nút "Trước đó"
              .addClass(
                "btn " +
                  this.options.style.btnPrevCss +
                  " " +
                  this.options.style.btnCss
              )
              .attr("type", "button")
          : null;
      return toolbar.append(
        btnPrevious,
        btnNext,
        this.options.toolbar.extraHtml
      );
    }

    _navigate(dir) {
      this._showStep(this._getShowable(this.current_index, dir));
    }

    _showStep(idx) {
      if (idx === -1 || idx === null) return false;

      // Nếu bước hiện tại được yêu cầu lại, bỏ qua
      if (idx == this.current_index) return false;

      // Nếu không tìm thấy bước, bỏ qua
      if (!this.steps.eq(idx)) return false;

      // Nếu đó là một bước bị vô hiệu hóa, bỏ qua
      if (!this._isEnabled(this.steps.eq(idx))) return false;

      // Lấy hướng điều hướng
      const stepDirection = this._getStepDirection(idx);

      if (this.current_index !== -1) {
        // Kích hoạt sự kiện "leaveStep"
        if (
          this._triggerEvent("leaveStep", [
            this._getStepAnchor(this.current_index),
            this.current_index,
            idx,
            stepDirection,
          ]) === false
        ) {
          return false;
        }
      }

      this._loadContent(idx, () => {
        // Lấy phần tử của bước để hiển thị
        const selStep = this._getStepAnchor(idx);
        // Thay đổi url hash đến bước mới
        this._setURLHash(selStep.attr("href"));
        // Cập nhật các điều khiển
        this._setAnchor(idx);

        // Lấy phần tử bước hiện tại
        const curPage = this._getStepPage(this.current_index);
        // Lấy phần tử bước tiếp theo
        const selPage = this._getStepPage(idx);
        // Di chuyển qua bước
        this._transit(selPage, curPage, stepDirection, () => {
          // Sửa chiều cao với nội dung
          this._fixHeight(idx);
          // Kích hoạt sự kiện "showStep"
          this._triggerEvent("showStep", [
            selStep,
            idx,
            stepDirection,
            this._getStepPosition(idx),
          ]);
        });

        // Cập nhật chỉ số hiện tại
        this.current_index = idx;
        // Đặt các nút dựa trên bước
        this._setButtons(idx);
        // Đặt thanh tiến trình dựa trên bước
        this._setProgressbar(idx);
      });
    }

    _getShowable(idx, dir) {
      let si = null;
      const elmList =
        dir == "prev"
          ? $(this.steps.slice(0, idx).get().reverse()) // Danh sách các phần tử bước trước chỉ số (đảo ngược thứ tự)
          : this.steps.slice(idx + 1); // Danh sách các phần tử bước sau chỉ số
      // Tìm bước hiển thị tiếp theo theo hướng
      elmList.each((i, elm) => {
        if (this._isEnabled($(elm))) {
          // Kiểm tra xem phần tử có thể kích hoạt hay không
          si = dir == "prev" ? idx - (i + 1) : i + idx + 1; // Tính chỉ số của bước hiển thị tiếp theo
          return false; // Dừng vòng lặp khi tìm được bước hiển thị tiếp theo
        }
      });
      return si; // Trả về chỉ số của bước hiển thị tiếp theo hoặc null nếu không có bước nào hiển thị được
    }

    _isShowable(elm) {
      if (!this._isEnabled(elm)) {
        // Kiểm tra xem phần tử có thể kích hoạt hay không
        return false; // Nếu không, trả về false
      }

      const isDone = elm.hasClass(this.options.style.anchorDoneCss); // Kiểm tra xem phần tử đã hoàn thành hay chưa
      if (this.options.anchor.enableDoneStateNavigation === false && isDone) {
        return false; // Nếu không cho phép điều hướng dựa trên trạng thái hoàn thành và phần tử đã hoàn thành, trả về false
      }

      if (this.options.anchor.enableNavigationAlways === false && !isDone) {
        return false; // Nếu không cho phép điều hướng luôn và phần tử chưa hoàn thành, trả về false
      }

      return true; // Trả về true nếu phần tử có thể hiển thị
    }

    _isEnabled(elm) {
      // Kiểm tra xem phần tử có class anchorDisabledCss hoặc anchorHiddenCss không
      // Nếu có, trả về false, ngược lại trả về true
      return elm.hasClass(this.options.style.anchorDisabledCss) ||
        elm.hasClass(this.options.style.anchorHiddenCss)
        ? false
        : true;
    }

    _getStepDirection(idx) {
      // Trả về hướng đi của bước
      // Nếu chỉ số hiện tại nhỏ hơn chỉ số được truyền vào, trả về "forward", ngược lại trả về "backward"
      return this.current_index < idx ? "forward" : "backward";
    }

    _getStepPosition(idx) {
      // Trả về vị trí của bước
      // Nếu chỉ số là 0, trả về "first"
      // Nếu chỉ số là chỉ số cuối cùng, trả về "last"
      // Ngược lại, trả về "middle"
      if (idx === 0) {
        return "first";
      } else if (idx === this.steps.length - 1) {
        return "last";
      }
      return "middle";
    }

    _getStepAnchor(idx) {
      // Lấy phần tử anchor của bước dựa trên chỉ số
      // Nếu chỉ số là null hoặc -1, trả về null
      // Ngược lại, trả về phần tử anchor tại chỉ số đó
      if (idx == null || idx == -1) return null;
      return this.steps.eq(idx);
    }

    _getStepPage(idx) {
      // Lấy trang của bước dựa trên chỉ số
      // Nếu chỉ số là null hoặc -1, trả về null
      // Ngược lại, trả về trang tại chỉ số đó
      if (idx == null || idx == -1) return null;
      return this.pages.eq(idx);
    }

    _loadContent(idx, callback) {
      if (!$.isFunction(this.options.getContent)) {
        // Nếu hàm getContent không được định nghĩa, gọi callback và kết thúc
        callback();
        return;
      }

      const selPage = this._getStepPage(idx);
      if (!selPage) {
        // Nếu không tìm thấy trang hiện tại, gọi callback và kết thúc
        callback();
        return;
      }

      // Lấy hướng đi của bước
      const stepDirection = this._getStepDirection(idx);
      // Lấy vị trí của bước
      const stepPosition = this._getStepPosition(idx);
      // Lấy phần tử anchor của bước tiếp theo
      const selStep = this._getStepAnchor(idx);

      // Gọi hàm getContent với các thông tin vừa lấy được
      this.options.getContent(
        idx,
        stepDirection,
        stepPosition,
        selStep,
        (content) => {
          if (content) selPage.html(content);
          // Gán nội dung trả về vào trang hiện tại và gọi callback
          callback();
        }
      );
    }

    _transit(elmToShow, elmToHide, stepDirection, callback) {
      // Lấy hàm chuyển tiếp dựa trên tùy chọn animation
      const transitFn =
        $.fn.smartWizard.transitions[this.options.transition.animation];
      this._stopAnimations();
      if ($.isFunction(transitFn)) {
        // Nếu hàm chuyển tiếp tồn tại, gọi nó để thực hiện chuyển tiếp
        transitFn(elmToShow, elmToHide, stepDirection, this, (res) => {
          if (res === false) {
            if (elmToHide !== null) elmToHide.hide();
            elmToShow.show();
          }
          // Gọi callback khi chuyển tiếp hoàn thành
          callback();
        });
      } else {
        // Nếu không có hàm chuyển tiếp nào được định nghĩa, hiển thị phần tử mới và ẩn phần tử cũ
        if (elmToHide !== null) elmToHide.hide();
        elmToShow.show();
        // Gọi callback
        callback();
      }
    }

    _stopAnimations() {
      if ($.isFunction(this.container.finish)) {
        // Dừng tất cả các hoạt động hoạt ảnh đang diễn ra
        this.pages.finish();
        this.container.finish();
      }
    }

    _fixHeight(idx) {
      if (this.options.autoAdjustHeight === false) return;
      // Tự động điều chỉnh chiều cao của phần tử container
      const contentHeight = this._getStepPage(idx).outerHeight();
      if (
        $.isFunction(this.container.finish) &&
        $.isFunction(this.container.animate) &&
        contentHeight > 0
      ) {
        // Nếu trình duyệt hỗ trợ, sử dụng phương thức animate() để tạo hiệu ứng chuyển động
        this.container
          .finish()
          .animate({ height: contentHeight }, this.options.transition.speed);
      } else {
        // Nếu không, đặt chiều cao của container bằng chiều cao của trang hiện tại
        this.container.css({
          height: contentHeight > 0 ? contentHeight : "auto",
        });
      }
    }

    _setAnchor(idx) {
      // Cập nhật trạng thái của các anchor cho bước hiện tại
      if (this.current_index !== null && this.current_index >= 0) {
        let removeCss = this.options.style.anchorActiveCss;
        let addCss = "";

        if (this.options.anchor.enableDoneState !== false) {
          // Nếu cho phép trạng thái "hoàn thành", thêm class "done" vào anchor hiện tại
          addCss += this.options.style.anchorDoneCss;
          if (
            this.options.anchor.unDoneOnBackNavigation !== false &&
            this._getStepDirection(idx) === "backward"
          ) {
            // Nếu cho phép hủy trạng thái "hoàn thành" khi điều hướng quay lại, xóa class "done" khỏi anchor hiện tại
            removeCss += " " + this.options.style.anchorDoneCss;
          }
        }

        // Thêm class "done" và xóa class "active" của anchor hiện tại
        this.steps
          .eq(this.current_index)
          .addClass(addCss)
          .removeClass(removeCss);
      }

      // Cập nhật trạng thái của anchor cho bước tiếp theo
      this.steps
        .eq(idx)
        .removeClass(this.options.style.anchorDoneCss)
        .addClass(this.options.style.anchorActiveCss);
    }

    _setButtons(idx) {
      // Bật/tắt nút "Trước/Sau" dựa trên bước hiện tại
      this.main
        .find(
          "." +
            this.options.style.btnNextCss +
            ", ." +
            this.options.style.btnPrevCss
        )
        .removeClass(this.options.style.anchorDisabledCss);

      const p = this._getStepPosition(idx);
      if (p === "first") {
        // Nếu bước hiện tại là bước đầu tiên, tắt nút "Trước"
        this.main
          .find("." + this.options.style.btnPrevCss)
          .addClass(this.options.style.anchorDisabledCss);
      } else if (p === "last") {
        // Nếu bước hiện tại là bước cuối cùng, thay đổi nút "Sau" thành nút submit
        const $nextButton = this.main.find("." + this.options.style.btnNextCss);
        $nextButton
          .removeClass(this.options.style.btnNextCss)
          .addClass(this.options.style.btnSubmitCss)
          .text("Submit");
      
        // Thêm mã xử lý sự kiện cho nút submit
        $nextButton.on("click", () => {
          // Hiển thị thông báo đã hoàn thành đơn đăng ký
          alert("Đã hoàn thành đơn đăng ký!");
          
          // Gửi đơn đăng ký lên máy chủ
          this.submitForm();
        });
      
        // Thay đổi nút "Quay lại" để cho phép thực thi
        const $prevButton = this.main.find("." + this.options.style.btnPrevCss);
        $prevButton.on("click", () => {
          const prevIdx = idx - 1;
          this._goToStep(prevIdx);
        });
      
        
      } else {
        if (this._getShowable(idx, "next") === null) {
          // Nếu không thể hiển thị bước tiếp theo, tắt nút "Sau"
          this.main
            .find("." + this.options.style.btnNextCss)
            .addClass(this.options.style.anchorDisabledCss);
        }

        if (this._getShowable(idx, "prev") === null) {
          // Nếu không thể hiển thị bước trước đó, tắt nút "Trước"
          this.main
            .find("." + this.options.style.btnPrevCss)
            .addClass(this.options.style.anchorDisabledCss);
        }
      }
    }

    _setProgressbar(idx) {
      const width = this.nav.width();
      const widthPercentage =
        (((width / this.steps.length) * (idx + 1)) / width) * 100;
      // Đặt giá trị biến CSS cho các giao diện được hỗ trợ
      document.documentElement.style.setProperty(
        "--sw-progress-width",
        widthPercentage + "%"
      );
      if (this.progressbar.length > 0) {
        // Cập nhật chiều rộng của thanh tiến trình
        this.progressbar
          .find("." + this.options.style.progressBarCss)
          .css("width", widthPercentage + "%");
      }
    }

    // HELPER FUNCTIONS

    // Xử lý sự kiện phím để điều hướng bằng bàn phím
    _keyNav(e) {
      if (!this.options.keyboard.keyNavigation) {
        return;
      }

      // Điều hướng bằng phím trên bàn phím
      if ($.inArray(e.which, this.options.keyboard.keyLeft) > -1) {
        // Phím mũi tên trái
        this._navigate("prev");
        e.preventDefault();
      } else if ($.inArray(e.which, this.options.keyboard.keyRight) > -1) {
        // Phím mũi tên phải
        this._navigate("next");
        e.preventDefault();
      } else {
        return; // Thoát khỏi trình xử lý cho các phím khác
      }
    }

    // Kích hoạt một sự kiện
    _triggerEvent(name, params) {
      // Tạo một sự kiện
      var e = $.Event(name);
      this.main.trigger(e, params);
      if (e.isDefaultPrevented()) {
        return false;
      }
      return e.result;
    }

    // Đặt URL hash
    _setURLHash(hash) {
      if (this.options.enableUrlHash && window.location.hash !== hash) {
        history.pushState(null, null, hash);
      }
    }

    // Lấy chỉ số từ URL hash
    _getURLHashIndex() {
      if (this.options.enableUrlHash) {
        // Lấy số bước từ URL hash nếu có
        var hash = window.location.hash;
        if (hash.length > 0) {
          var elm = this.nav.find("a[href*='" + hash + "']");
          if (elm.length > 0) {
            return this.steps.index(elm);
          }
        }
      }
      return false;
    }

    // Hiển thị thông báo lỗi
    _showError(msg) {
      console.error(msg);
    }

    // Thay đổi trạng thái của các bước trong stepArray
    _changeState(stepArray, state, addOrRemove) {
      // addOrRemove: true => Thêm, false => Xóa
      addOrRemove = addOrRemove !== false ? true : false;

      let css = "";
      if (state == "default") {
        css = this.options.style.anchorDefaultCss;
      } else if (state == "active") {
        css = this.options.style.anchorActiveCss;
      } else if (state == "done") {
        css = this.options.style.anchorDoneCss;
      } else if (state == "disable") {
        css = this.options.style.anchorDisabledCss;
      } else if (state == "hidden") {
        css = this.options.style.anchorHiddenCss;
      } else if (state == "error") {
        css = this.options.style.anchorErrorCss;
      } else if (state == "warning") {
        css = this.options.style.anchorWarningCss;
      }

      $.each(stepArray, (i, n) => {
        this.steps.eq(n).toggleClass(css, addOrRemove);
      });
    }

    // Chuyển đến bước có chỉ số stepIndex trong wizard
    goToStep(stepIndex, force) {
      force = force !== false ? true : false;
      // Điều kiện kiểm tra xem bước có thể hiển thị hay không
      if (force !== true && !this._isShowable(this.steps.eq(stepIndex))) {
        return;
      }

      // Đánh dấu các bước trước đó là đã hoàn thành
      if (
        force === true &&
        stepIndex > 0 &&
        this.options.anchor.enableDoneState &&
        this.options.anchor.markPreviousStepsAsDone
      ) {
        this.steps
          .slice(0, stepIndex)
          .addClass(this.options.style.anchorDoneCss);
      }

      // Hiển thị bước có chỉ số stepIndex
      this._showStep(stepIndex);
    }

    // Chuyển đến bước tiếp theo trong wizard
    next() {
      this._navigate("next");
    }

    // Chuyển đến bước trước đó trong wizard
    prev() {
      this._navigate("prev");
    }

    // Đặt lại wizard về trạng thái ban đầu
    reset() {
      // Xóa các lớp css trừ các lớp mặc định, ẩn và bị vô hiệu hóa trên các bước
      this.steps.removeClass([
        this.options.style.anchorDoneCss,
        this.options.style.anchorActiveCss,
        this.options.style.anchorErrorCss,
        this.options.style.anchorWarningCss,
      ]);

      // Đặt lại URL hash về "#"
      this._setURLHash("#");
      // Khởi tạo lại wizard
      this._init();
      // Tải lại nội dung
      this._load();
    }

    // Thiết lập trạng thái cho các bước trong stepArray thành state
    setState(stepArray, state) {
      this._changeState(stepArray, state, true);
    }

    // Hủy bỏ trạng thái cho các bước trong stepArray
    unsetState(stepArray, state) {
      this._changeState(stepArray, state, false);
    }

    // Thiết lập các tùy chọn cho wizard bằng cách mở rộng các tùy chọn hiện có với các tùy chọn mới
    setOptions(options) {
      // Sử dụng $.extend để kết hợp các tùy chọn mới vào tùy chọn hiện tại
      this.options = $.extend(true, {}, this.options, options);
      // Khởi tạo lại wizard
      this._init();
    }

    // Trả về các tùy chọn hiện tại của wizard
    getOptions() {
      return this.options;
    }

    // Trả về thông tin về bước hiện tại và tổng số bước
    getStepInfo() {
      return {
        currentStep: this.current_index ? this.current_index : 0, // Bước hiện tại (nếu không có, mặc định là 0)
        totalSteps: this.steps ? this.steps.length : 0, // Tổng số bước (nếu không có, mặc định là 0)
      };
    }

    // Hiển thị hoặc ẩn loader dựa trên trạng thái được chỉ định
    loader(state) {
      this.main.toggleClass(this.options.style.loaderCss, state === "show");
    }

    // Đặt lại chiều cao của wizard để phù hợp với nội dung của bước hiện tại
    fixHeight() {
      this._fixHeight(this.current_index);
    }
  }

  // Wrapper cho plugin
  $.fn.smartWizard = function (options) {
    // Kiểm tra và xử lý các trường hợp đầu vào khác nhau
    if (options === undefined || typeof options === "object") {
      // Nếu options không được định nghĩa hoặc là một đối tượng, thực hiện cho mỗi phần tử trong tập hợp
      return this.each(function () {
        if (!$.data(this, "smartWizard")) {
          // Tạo mới một instance của SmartWizard và lưu trữ trong $.data()
          $.data(this, "smartWizard", new SmartWizard(this, options));
        }
      });
    } else if (
      typeof options === "string" &&
      options[0] !== "_" &&
      options !== "init"
    ) {
      // Xử lý các trường hợp options là một chuỗi và không phải là "_"
      let instance = $.data(this[0], "smartWizard");

      if (options === "destroy") {
        // Nếu options là "destroy", xóa instance của SmartWizard
        $.data(this, "smartWizard", null);
      }

      if (
        instance instanceof SmartWizard &&
        typeof instance[options] === "function"
      ) {
        // Nếu instance là một đối tượng SmartWizard và có phương thức tương ứng với options
        // Gọi phương thức đó và truyền các đối số còn lại
        return instance[options].apply(
          instance,
          Array.prototype.slice.call(arguments, 1)
        );
      } else {
        // Trả về đối tượng gốc nếu không có instance hoặc phương thức không tồn tại
        return this;
      }
    }
  };

  // Transition effects
  $.fn.smartWizard.transitions = {
    fade: (elmToShow, elmToHide, stepDirection, wizardObj, callback) => {
      // Kiểm tra xem phần tử elmToShow có hàm fadeOut hay không
      if (!$.isFunction(elmToShow.fadeOut)) {
        // Nếu không có, gọi callback với tham số false và kết thúc hiệu ứng chuyển tiếp
        callback(false);
        return;
      }

      if (elmToHide) {
        // Nếu có phần tử elmToHide, thực hiện hiệu ứng fadeOut cho nó
        elmToHide.fadeOut(
          wizardObj.options.transition.speed, // Tốc độ fadeOut
          wizardObj.options.transition.easing, // Kiểu easing của fadeOut
          () => {
            // Khi fadeOut hoàn thành, thực hiện hiệu ứng fadeIn cho elmToShow
            elmToShow.fadeIn(
              wizardObj.options.transition.speed, // Tốc độ fadeIn
              wizardObj.options.transition.easing, // Kiểu easing của fadeIn
              () => {
                // Khi fadeIn hoàn thành, gọi callback
                callback();
              }
            );
          }
        );
      } else {
        // Nếu không có phần tử elmToHide, thực hiện hiệu ứng fadeIn cho elmToShow mà không có fadeOut
        elmToShow.fadeIn(
          wizardObj.options.transition.speed, // Tốc độ fadeIn
          wizardObj.options.transition.easing, // Kiểu easing của fadeIn
          () => {
            // Khi fadeIn hoàn thành, gọi callback
            callback();
          }
        );
      }
    },
    slideSwing: (elmToShow, elmToHide, stepDirection, wizardObj, callback) => {
      // Kiểm tra xem phần tử elmToShow có hàm slideDown hay không
      if (!$.isFunction(elmToShow.slideDown)) {
        // Nếu không có, gọi callback với tham số false và kết thúc hiệu ứng chuyển tiếp
        callback(false);
        return;
      }

      if (elmToHide) {
        // Nếu có phần tử elmToHide, thực hiện hiệu ứng slideUp để ẩn nó
        elmToHide.slideUp(
          wizardObj.options.transition.speed, // Tốc độ slideUp
          wizardObj.options.transition.easing, // Kiểu easing của slideUp
          () => {
            // Khi slideUp hoàn thành, thực hiện hiệu ứng slideDown cho elmToShow
            elmToShow.slideDown(
              wizardObj.options.transition.speed, // Tốc độ slideDown
              wizardObj.options.transition.easing, // Kiểu easing của slideDown
              () => {
                // Khi slideDown hoàn thành, gọi callback
                callback();
              }
            );
          }
        );
      } else {
        // Nếu không có phần tử elmToHide, thực hiện hiệu ứng slideDown cho elmToShow mà không có slideUp
        elmToShow.slideDown(
          wizardObj.options.transition.speed, // Tốc độ slideDown
          wizardObj.options.transition.easing, // Kiểu easing của slideDown
          () => {
            // Khi slideDown hoàn thành, gọi callback
            callback();
          }
        );
      }
    },
    slideHorizontal: (
      elmToShow,
      elmToHide,
      stepDirection,
      wizardObj,
      callback
    ) => {
      // Kiểm tra xem phần tử elmToShow có hàm animate hay không
      if (!$.isFunction(elmToShow.animate)) {
        // Nếu không có, gọi callback với tham số false và kết thúc hiệu ứng chuyển tiếp
        callback(false);
        return;
      }

      // Hiệu ứng trượt theo chiều ngang
      const animFn = (elm, iniLeft, finLeft, cb) => {
        elm.css({ position: "absolute", left: iniLeft }).show().animate(
          { left: finLeft },
          wizardObj.options.transition.speed, // Tốc độ hiệu ứng
          wizardObj.options.transition.easing, // Kiểu easing của hiệu ứng
          cb
        );
      };

      // Kiểm tra nếu đang ở bước đầu tiên của wizard
      if (wizardObj.current_index == -1) {
        // Đặt chiều cao của container khi tải trang
        wizardObj.container.height(elmToShow.outerHeight());
      }
      const containerWidth = wizardObj.container.width();

      if (elmToHide) {
        // Lưu giữ CSS ban đầu của phần tử elmToHide
        const initCss1 = elmToHide.css(["position", "left"]);

        // Tính toán vị trí kết thúc (finLeft) dựa trên chiều rộng của container và hướng chuyển tiếp
        const finLeft = containerWidth * (stepDirection == "backward" ? 1 : -1);

        // Thực hiện hiệu ứng trượt của elmToHide
        animFn(elmToHide, 0, finLeft, () => {
          // Ẩn phần tử elmToHide và khôi phục CSS ban đầu
          elmToHide.hide().css(initCss1);
        });
      }

      // Lưu giữ CSS ban đầu của phần tử elmToShow
      const initCss2 = elmToShow.css(["position"]);

      // Tính toán vị trí ban đầu (iniLeft) dựa trên chiều rộng của container và hướng chuyển tiếp
      const iniLeft = containerWidth * (stepDirection == "backward" ? -2 : 1);

      // Thực hiện hiệu ứng trượt của elmToShow
      animFn(elmToShow, iniLeft, 0, () => {
        // Khôi phục CSS ban đầu của elmToShow
        elmToShow.css(initCss2);

        // Gọi callback để báo hiệu ứng chuyển tiếp hoàn thành
        callback();
      });
    },
    slideVertical: (
      elmToShow,
      elmToHide,
      stepDirection,
      wizardObj,
      callback
    ) => {
      // Kiểm tra xem phần tử elmToShow có hàm animate hay không
      if (!$.isFunction(elmToShow.animate)) {
        // Nếu không có, gọi callback với tham số false và kết thúc hiệu ứng chuyển tiếp
        callback(false);
        return;
      }

      // Hiệu ứng trượt theo chiều dọc
      const animFn = (elm, iniTop, finTop, cb) => {
        elm.css({ position: "absolute", top: iniTop }).show().animate(
          { top: finTop },
          wizardObj.options.transition.speed, // Tốc độ hiệu ứng
          wizardObj.options.transition.easing, // Kiểu easing của hiệu ứng
          cb
        );
      };

      if (wizardObj.current_index == -1) {
        // Đặt chiều cao của container khi tải trang
        wizardObj.container.height(elmToShow.outerHeight());
      }
      const containerHeight = wizardObj.container.height();
      if (elmToHide) {
        // Nếu có phần tử elmToHide, thực hiện hiệu ứng slide lên hoặc slide xuống để ẩn nó
        const initCss1 = elmToHide.css(["position", "top"]);
        const finTop = containerHeight * (stepDirection == "backward" ? -1 : 1);
        animFn(elmToHide, 0, finTop, () => {
          elmToHide.hide().css(initCss1);
        });
      }

      // Thực hiện hiệu ứng slide từ trên xuống hoặc từ dưới lên để hiển thị elmToShow
      const initCss2 = elmToShow.css(["position"]);
      const iniTop = containerHeight * (stepDirection == "backward" ? 1 : -2);
      animFn(elmToShow, iniTop, 0, () => {
        elmToShow.css(initCss2);
        callback();
      });
    },
    css: (elmToShow, elmToHide, stepDirection, wizardObj, callback) => {
      // Kiểm tra xem có đủ thông tin về CSS transition hay không
      if (
        wizardObj.options.transition.fwdHideCss.length == 0 ||
        wizardObj.options.transition.bckHideCss.length == 0
      ) {
        // Nếu không có, gọi callback với tham số false và kết thúc hiệu ứng
        callback(false);
        return;
      }

      // Hàm thực hiện hiệu ứng CSS
      const animFn = (elm, animation, cb) => {
        if (!animation || animation.length == 0) cb();

        // Thêm class animation vào phần tử và lắng nghe sự kiện "animationend"
        elm.addClass(animation).one("animationend", (e) => {
          $(e.currentTarget).removeClass(animation);
          cb();
        });

        // Thêm class animation vào phần tử và lắng nghe sự kiện "animationcancel"
        elm.addClass(animation).one("animationcancel", (e) => {
          $(e.currentTarget).removeClass(animation);
          cb("cancel");
        });
      };

      // Xác định CSS để hiển thị phần tử elmToShow
      const showCss =
        wizardObj.options.transition.prefixCss +
        " " +
        (stepDirection == "backward"
          ? wizardObj.options.transition.bckShowCss
          : wizardObj.options.transition.fwdShowCss);

      if (elmToHide) {
        // Nếu có phần tử elmToHide, thực hiện hiệu ứng ẩn nó và hiệu ứng hiển thị phần tử elmToShow
        const hideCss =
          wizardObj.options.transition.prefixCss +
          " " +
          (stepDirection == "backward"
            ? wizardObj.options.transition.bckHideCss
            : wizardObj.options.transition.fwdHideCss);

        // Thực hiện hiệu ứng ẩn elmToHide
        animFn(elmToHide, hideCss, () => {
          elmToHide.hide();

          // Thực hiện hiệu ứng hiển thị elmToShow
          animFn(elmToShow, showCss, () => {
            callback();
          });
          elmToShow.show();
        });
      } else {
        // Nếu không có phần tử elmToHide, chỉ thực hiện hiệu ứng hiển thị elmToShow
        animFn(elmToShow, showCss, () => {
          callback();
        });
        elmToShow.show();
      }
    },
  };
});
