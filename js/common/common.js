//To move the add-form, popup----------------------------------------------
$(document).ready(function() {
    $(".add-emp").draggable();
    $(".pop").draggable();
    $(".xpop, .btn2-pop").click(function() {
        $(".general-popup").css("display", "none");
    })
})

/**------------------------------------------------------------------------------
 * Show option to select
 * Author: PTDuyen
 */
function showOption(select_option, _function) {
    var _option = $(select_option);
    // $('.select-option').slideUp(300);
    _option.slideDown(300);
    _option.siblings('.div-arrow').children('.fa-chevron-down').css('font-size', '0');
    _option.siblings('.div-arrow').children('.fa-chevron-up').css('font-size', '12px');
    // _option.siblings('.div-arrow').css({
    //     'background-color': '#bbb',
    //     'border-right': '1px solid #01b075'
    // });
    _option.siblings("input").css('border', '1px solid #01b075');
    _function();
}

/**------------------------------------------------------------------------------
 * Hide option to select
 * Author: PTDuyen
 */
function hideOption(select_option, _function) {
    var _option = $(select_option);
    _option.slideUp(300);
    _option.siblings('.div-arrow').children('.fa-chevron-up').css('font-size', '0');
    _option.siblings('.div-arrow').children('.fa-chevron-down').css('font-size', '12px');
    // _option.siblings('.div-arrow').css({
    //     'background-color': '#fff',
    //     'border-right': '1px solid #bbb'
    // });
    _option.siblings("input").css('border', '1px solid #bbb');
    _function();
}

/**------------------------------------------------------------------------------
 * Choose option to select
 * Author: PTDuyen
 * id_select is id of div select-option
 * name_option is className of div option
 */
function chooseOption(id_select, name_option, _function) {
    $(name_option).on('click', function() {
        // _check = false;
        $(this).siblings().removeClass("choose-option");
        $(this).addClass("choose-option");
        $(this).siblings().children('i').css('visibility', 'hidden');
        let select_option = $(this).parent().attr('class');
        $(this).children().css('visibility', 'visible');
        $(id_select).val($(this).text());
        $(id_select).next().css('visibility', 'visible');
        hideOption('.select-option', function() {});
        _function($(this).data());
    })
}

/**------------------------------------------------------------------------------
 * Click out the element having selector is _selector and do the _function
 * Author: PTDuyen
 */
function clickOutElement(_selector, _function) {
    $(document).click(function(event) {
        var $target = $(event.target);
        if (!$target.closest(_selector).length && !$target.closest($(_selector).children()).length &&
            $(_selector).is(":visible")) {
            _function();
        }
    });
}


/**----------------------------------------------------------------------------
 * delete the option of select has id is id_select
 * Author: PTDuyen
 */
function delOption(id_select, defaultValue) {
    $(id_select).siblings('.xselect').click(function() {
        $(id_select).val(defaultValue);
        $(id_select).siblings('.xselect').css('visibility', 'hidden');
        $(id_select).siblings('.select-option').children().removeClass('choose-option');
        $(id_select).siblings('.select-option').find('i').css('visibility', 'hidden');
        validateForm();
    })
}

/**----------------------------------------------------------------------------
 * Load data to table
 * Author: PTDuyen
 * Create 7/7/2021
 */
function loadTable(listObj) {
    $.each(listObj, function(index, obj) {
        // get element of th
        // $('table tbody tr').remove();
        var thData = $('table thead tr th');
        var tr = $(`<tr></tr>`);
        tr.data(obj);
        // map td with th 
        $.each(thData, function(index, _item) {
            var fieldName = $(_item).attr('fieldName');
            var value = obj[fieldName];
            var field = fieldName + '';
            if (field.toLowerCase() == "checkbox") {
                var td = $(`<td style="text-align: center;"><input type="checkbox"></td>`);
                td.children('input').addClass("checkbox");
                td.children('input').data(obj);
            } else if (field.toLowerCase().includes("date")) {
                var td = $(`<td style="text-align: center;"></td>`);
                td.append(value);
            } else if (field.toLowerCase() == "salary") {
                var td = $(`<td style="text-align: end;"></td>`);
                td.append(value);
            } else {
                var td = $(`<td></td>`);
                td.append(value);
            }
            tr.append(td);
            // tr.data()
            $("tbody").append(tr);
        })
    })
}


// function Draggable(_selector) {
//     $(_selector).draggable();
// }

/**-------------------------------------------------------------------------------------
 * Show popup
 * Author: PTDuyen
 * Create 7/7/2021
 */
function showInfoPopup(action) {
    var title, message, btn1, btn2;
    var pop = $(".general-popup");
    pop.css("display", "block");
    var p_mgs = $(`<p></p>`);
    var p_title = $(`<p></p>`);
    var icon = $(`<i class="fas fa-exclamation-triangle"></i>`)
    var img = $(`<img src = "../lib/icon/warning.png">`);
    pop.find(".title-pop").empty();
    pop.find(".icon-pop").empty();
    pop.find(".notification-pop").empty();
    if (action == "post-cancel") {
        title = "Đóng Form thông tin chung";
        message = "Bạn có chắc muốn đóng form nhập thông tin<b> Thêm mới nhân viên <span></span></b> không?";
        btn1 = "Tiếp tục nhập";
        btn2 = "Đóng";
        p_title.text(title);
        pop.find(".title-pop").append(p_title);
        pop.find(".icon-pop").append(img);
        p_mgs.append(message);
        pop.find(".notification-pop").append(p_mgs);
        pop.find(".btn1-pop").text(btn1);
        pop.find(".btn2-pop").text(btn2);
        pop.find(".btn2-pop").addClass("primary-pop");
    } else if (action == "put-cancel") {
        title = "Đóng Form thông tin chung";
        message = "Bạn có chắc muốn đóng form <b> Cập nhật thông tin nhân viên <span></span></b> không?";
        btn1 = "Tiếp tục nhập";
        btn2 = "Đóng";
        p_title.text(title);
        pop.find(".title-pop").append(p_title);
        pop.find(".icon-pop").append(img);
        p_mgs.append(message);
        pop.find(".notification-pop").append(p_mgs);
        pop.find(".btn1-pop").text(btn1);
        pop.find(".btn2-pop").text(btn2);
        pop.find(".btn2-pop").addClass("primary-pop");
    } else if (action == "post") {
        title = "Form thêm mới thông tin";
        message = "Bạn có chắc muốn <b> Thêm mới nhân viên</b> không?";
        btn1 = "Hủy";
        btn2 = "Thêm";
        pop.find(".icon-pop").append(img);
        p_mgs.append(message);
        pop.find(".notification-pop").append(p_mgs);
        pop.find(".btn1-pop").text(btn1);
        pop.find(".btn2-pop").text(btn2);
        pop.find(".btn2-pop").addClass("primary-pop");
    } else if (action == "put") {
        title = "Form cập nhật thông tin";
        message = "Bạn có chắc muốn <b> Cập nhật thông tin nhân viên <span></span></b> không?";
        btn1 = "Hủy";
        btn2 = "Lưu";
        pop.find(".icon-pop").append(img);
        p_mgs.append(message);
        pop.find(".notification-pop").append(p_mgs);
        pop.find(".btn1-pop").text(btn1);
        pop.find(".btn2-pop").text(btn2);
        pop.find(".btn2-pop").addClass("primary-pop");
    } else if (action == "delete") {
        title = "Xóa thông tin nhân viên";
        message = "Bạn có chắc muốn <b> Xóa thông tin <i></i> nhân viên <span></span></b> không?";
        btn1 = "Hủy";
        btn2 = "Xóa";
        p_title.text(title);
        pop.find(".title-pop").append(p_title);
        pop.find(".icon-pop").append(icon);
        pop.find(".icon-pop i").addClass('delete-icon-pop');
        p_mgs.append(message);
        pop.find(".notification-pop").append(p_mgs);
        pop.find(".btn1-pop").text(btn1);
        pop.find(".btn2-pop").text(btn2);
        pop.find(".btn2-pop").addClass('delete-pop');
    }

}

/**-------------------------
 * Show toast
 * Author: PTDuyen
 * Create 7/7/2021
 */
function showToast(action) {
    var icon = $(`<div class="icon-toast"></div>`);
    var content = $(`<div class="content-toast"></div>`);
    var btnx = $(`<button class="xtoast"><i class="fas fa-times"></i></button>`);
    var toast = $(`<div class="toastMgs"></div>`);

    if (action == "post-success") { //po-s
        icon.addClass("icon-toast-green");
        content.text("Thêm mới thông tin nhân viên thành công!")
        btnx.css("color", "#BAFFE7");
    } else if (action == "load-success") { //lo-s
        icon.addClass("icon-toast-green");
        content.text("Tải dữ liệu thành công!")
        btnx.css("color", "#BAFFE7");
    } else if (action == "put-success") { //pu-s
        icon.addClass("icon-toast-green");
        content.text("Cập nhật thông tin nhân viên thành công!")
        btnx.css("color", "#BAFFE7");
    } else if (action == "delete-success") { //de-s
        icon.addClass("icon-toast-green");
        content.text("Xóa thông tin nhân viên thành công!")
        btnx.css("color", "#BAFFE7");
    } else if (action == "new-code-success") { //nc-s
        icon.addClass("icon-toast-green");
        content.text("Lấy mã nhân viên mới thành công!")
        btnx.css("color", "#BAFFE7");
    } else if (action == "post-fail") { //po-f
        icon.addClass("icon-toast-yellow");
        content.text("Thêm mới nhân viên thất bại! Vui lòng thử lại hoặc báo cho quản trị viên!")
        btnx.css("color", "#FFE7AF");
    } else if (action == "put-fail") { //pu-f
        icon.addClass("icon-toast-yellow");
        content.text("Cập nhật nhân viên thất bại! Vui lòng thử lại hoặc báo cho quản trị viên!")
        btnx.css("color", "#FFE7AF");
    } else if (action == "delete-fail") { // de-f
        icon.addClass("icon-toast-red");
        content.text("Xóa nhân viên thất bại! Vui lòng thử lại hoặc báo cho quản trị viên!")
        btnx.css("color", "#FFCECE");
    } else if (action == "load-fail") { //lo-f
        icon.addClass("icon-toast-blue");
        content.text("Tải dữ liệu thất bại! Vui lòng thử lại hoặc báo cho quản trị viên!")
        btnx.css("color", "#D8EAFF");
    } else if (action == "new-code-fail") { //nc-f
        icon.addClass("icon-toast-blue");
        content.text("Lấy mã nhân viên mới thất bại! Vui lòng nhập mã mới hoặc thử lại, hoặc báo cho quản trị viên!")
        btnx.css("color", "#D8EAFF");
    } else if (action == "invalid-form") { // de-f
        icon.addClass("icon-toast-red");
        content.text("Dữ liệu không hợp lệ! Vui lòng kiểm tra lại!")
        btnx.css("color", "#FFCECE");
    }
    toast.addClass("show-toast");
    toast.append(icon);
    toast.append(content);
    toast.append(btnx);
    $(".toastMessage").append(toast);
    setTimeout(function() {
        $(toast).remove();
    }, 5000)
    btnx.on("click", function() {
        $(".toastMgs").remove();
    })
}