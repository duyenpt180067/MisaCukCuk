// js for select gender
var checkGender = false;
$('#findbygender, #gender').on('click', function() {
    checkGender = !checkGender;
    checkPosition = false;
    checkFormDepartment = false;
    checkStatus = false;
    if (checkGender == true) {
        showOption('.all-gender', function() {
            // $('.all-gender').siblings('.div-arrow').css({
            //     'background-color': '#fff',
            //     'border-right': '1px solid #01b075'
            // });
            chooseOption('#gender', '.genders', function(res) {
                $('#gender').data(res);
            });
        });
    } else {
        hideOption('.all-gender', function() {});
    }
    clickOutElement('#findbygender, #gender', function() {
        checkGender = false;
        hideOption('all-gender', function() {});
    })
    delOption('#gender', null);
})

// js for select department
var checkPosition = false;
$('#findbyposition, #position').on('click', function() {
    checkPosition = !checkPosition;
    checkGender = false;
    checkFormDepartment = false;
    checkStatus = false;
    chooseOption('#position', '.positions', function(res) {
        $('#position').data(res);
    });
    if (checkPosition == true) {
        showOption('.all-position', function() {});
    }
    if (checkPosition == false) {
        hideOption('.all-position', function() {});
    }
    clickOutElement('#findbyposition, #position', function() {
        checkPosition = false;
        hideOption('.all-position', function() {})
    });
    delOption('#position', null);
})

// js for select department
var checkFormDepartment = false;
$('#findbyformdepartment, #formdepartment').on('click', function() {
    checkFormDepartment = !checkFormDepartment;
    checkPosition = false;
    checkGender = false;
    checkStatus = false;
    chooseOption('#formdepartment', '.formdepartments', function(res) {
        $("#formdepartment").data(res);
    });
    if (checkFormDepartment == true) {
        showOption('.all-formdepartment', function() {});
    }
    if (checkFormDepartment == false) {
        hideOption('.all-formdepartment', function() {});
    }
    clickOutElement('#findbyformdepartment, #formdepartment', function() {
        checkFormDepartment = false;
        hideOption('.all-formdepartment', function() {})
    });
    delOption('#formdepartment', null);
})

// js for select department
var checkStatus = false;
$('#findbystatus, #status').on('click', function() {
    checkStatus = !checkStatus;
    checkPosition = false;
    checkGender = false;
    checkFormDepartment = false;
    chooseOption('#status', '.statuss', function(res) {
        $("#status").data(res);
    });
    if (checkStatus == true) {
        showOption('.all-status', function() {});
    }
    if (checkStatus == false) {
        hideOption('.all-status', function() {});
    }
    clickOutElement('#findbystatus, #status', function() {
        checkStatus = false;
        hideOption('.all-status', function() {})
    });
    delOption('#status', null);
})


/** Load data to form has _selector
 *  Author: PTDuyen (7/7/2021)
 */
function loadDataToForm(obj, _selectorForm) {
    var dataInput = $(_selectorForm).find("input");
    $.each(dataInput, function(index, input) {
        var fieldName = $(input).attr('fieldName');
        if (fieldName.toLowerCase().includes("date")) {
            console.log(fieldName);
            let d = new Date(obj[fieldName] + '');
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            let year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            // var local = obj[fieldName].toLocaleDateString() + "";
            // local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
            let date = [year, month, day].join('-');
            $(input).val(date);
        } else {
            $(input).val(obj[fieldName]);
        }
    });
}


/** Take data from form has _selector
 *  Author: PTDuyen (7/7/2021)
 */
function dataForm(_selector, obj) {
    var inputs = $(_selector).find('input');
    $.each(inputs, function(index, input) {
        var name = $(input).attr('fieldName') + '';
        var fieldName = name[0].toLowerCase() + name.substr(1, );
        if (fieldName.toLowerCase() == "gendername") {
            // deledobj.genderName
            switch ($(input).val().toLowerCase()) {
                case "nam":
                    obj.gender = 1;
                    break;
                case "nữ":
                    obj.gender = 0;
                    break;
                default:
                    obj.gender = 3;
                    break;
            }
        } else if (fieldName.toLowerCase() == "departmentname") {
            obj.departmentId = $(input).data().DepartmentId;
            // delete obj.positionName;
        } else if (fieldName.toLowerCase() == "positionname") {
            obj.positionId = $(input).data().PositionId;
        } else if (fieldName.toLowerCase().includes("date")) {
            // console.log($(input).val());

            var d = $(input).val() + '';
            var date = d.split("-");
            var dateFormat = new Date(date[2], date[0] - 1, date[1]);
            // console.log(d, "  : ", date, "   : " + dateFormat);
            // let date = new Date($(input).value);
            obj[fieldName] = dateFormat;
        } else if (fieldName.toLowerCase() == "workstatus") {
            switch ($(input).val().toLowerCase()) {
                case "đang làm việc":
                    obj.workStatus = 1;
                    break;
                default:
                    obj.workStatus = 0;
                    break;
            }
        } else {
            obj[fieldName] = $(input).val();
        }

    })
    return obj;
}


/**
 * Show the tooltip 
 * Author: PTDuyen
 * Create: 10/7/2021
 */
function showTooltip(selector, mgs) {

}

/**
 * Validate Form 
 * Author: PTDuyen
 * Create: 8/7/2021
 */
function validateForm(selector) {
    var formInput = $(selector).find(' input');

    $.each(formInput, function(index, _input) {
        $(_input).on('focus', function() {
            // -------------------------------When focus on input ---------------------------------------------------
            $(_input).addClass('input-focus');
            if ($(_input).siblings('.select-option').length != 0) {
                console.log($(_input).siblings(".select-option"));
                showOption($(_input).siblings(".select-option"), function() {});
            }
            if ($(_input).val() != "") {
                $(_input).siblings(".xselect").css('visibility', 'visible');
                delOption(_input, "");
            }
            validateInput(_input)
            if (validateInput(_input) == false) {

                $(_input).addClass("invalid-input");
                $(_input).removeClass("input-focus");
                return false;
            }
        })
        $(_input).on('change', function() {
            if (($(_input).siblings('.select-option').length == 0)) {
                $(_input).addClass('input-focus');
            }
            if ($(_input).val() != "") {
                $(_input).siblings(".xselect").css('visibility', 'visible');
                // console.log("ok")
                delOption(_input, "");
            }
            if ($(_input).attr('validate')) {
                $(".tooltipMgs").hide();
            }
        })
        $(_input).on('focusout', function() {
            // console.log($(_input).parent().attr('class'));
            if ($(_input).siblings('.select-option').length == 0) {
                // $(_input).removeClass('input-focus');
            }
        })

        //-----------------------------------Validate--------------------------------------------------------------
        // if ($(_input).attr('validate')) {
        //     var tooltip = $(`<div></div>`);
        //     var triangle = $(`<div id="triangle-down"></div>`);
        //     var validate = $(_input).attr('validate');
        //     $(_input).on('blur', function() {
        //         if (($(_input).val() !== "")) {
        //             if ($(_input).attr('fieldName') == "Email") {
        //                 if ((email.test($(_input).val()) == false) && ($(_input).val() != "")) {
        //                     // $(_input).attr('data-original-title', 'Vui lòng nhập đúng định dạng email!');
        //                     tooltip.text("");
        //                     tooltip.append("Vui lòng nhập đúng định dạng email");
        //                     tooltip.append(triangle);
        //                     tooltip.addClass("tooltipMgs");
        //                     $(_input).parent().append(tooltip);
        //                     $(_input).addClass("invalid-input");

        //                     // $(_input).tooltip('show');
        //                 } else if (email.test($(_input).val()) == true) {
        //                     // $(_input).attr('data-original-title', null);
        //                     tooltip.hide();
        //                     $(_input).removeClass("invalid-input");
        //                 }
        //             } else if ($(_input).attr('fieldName') == "PhoneNumber") {
        //                 if (phone.test($(_input).val()) == false && ($(_input).val() != "")) {
        //                     tooltip.text("");
        //                     tooltip.append("Vui lòng nhập đúng định dạng của số điện thoại");
        //                     tooltip.append(triangle);
        //                     tooltip.addClass("tooltipMgs");
        //                     $(_input).parent().append(tooltip);
        //                     $(_input).addClass("invalid-input");
        //                 } else if (phone.test($(_input).val()) == true) {
        //                     tooltip.hide();
        //                     $(_input).removeClass("invalid-input");
        //                 }
        //             } else {
        //                 $(".tooltipMgs").hide();
        //                 $(_input).removeClass("invalid-input");
        //             }
        //         } else {
        //             // console.log("okasa")
        //             $(_input).removeClass('focus-input');
        //             tooltip.text("");
        //             tooltip.append("Vui lòng nhập " + validate);
        //             tooltip.append(triangle);
        //             tooltip.addClass("tooltipMgs");
        //             $(_input).parent().append(tooltip);
        //             $(_input).addClass("invalid-input");
        //         }
        //     })

        //     // $(_input).on('change', function() {})
        //     // console.log(validate);
        // }
    })
    return true;
}

// $(".cancel").click(function() {
//     console.log(validateForm("#formAdd"));
//     console.log($("#formAdd").find("input"));
// })


function validateInput(_input) {
    // var formInput = $('form input');
    if ($(_input).attr('validate')) {
        var email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        var phone = /^\d{10}$/;
        var tooltip = $(`<div></div>`);
        var triangle = $(`<div id="triangle-down"></div>`);
        var validate = $(_input).attr('validate');
        if (($(_input).val() != "")) {
            if ($(_input).attr("fieldName").toLowerCase().includes("email")) {
                if ((email.test($(_input).val()) == false) && ($(_input).val() != "")) {
                    // $(_input).attr('data-original-title', 'Vui lòng nhập đúng định dạng email!');
                    tooltip.text("");
                    tooltip.append("Vui lòng nhập đúng định dạng email");
                    tooltip.append(triangle);
                    tooltip.addClass("tooltipMgs");
                    $(_input).parent().append(tooltip);
                    $(_input).addClass("invalid-input");
                    return false;
                } else if (email.test($(_input).val()) == true) {
                    // $(_input).attr('data-original-title', null);
                    tooltip.hide();
                    $(_input).removeClass("invalid-input");
                    return true;
                }
            } else if ($(_input).attr('fieldName').toLowerCase().includes("phone")) {
                if (phone.test($(_input).val()) == false && ($(_input).val() != "")) {
                    tooltip.text("");
                    tooltip.append("Vui lòng nhập đúng định dạng của số điện thoại");
                    tooltip.append(triangle);
                    tooltip.addClass("tooltipMgs");
                    $(_input).parent().append(tooltip);
                    $(_input).addClass("invalid-input");
                    return false;
                } else if (phone.test($(_input).val()) == true) {
                    tooltip.hide();
                    $(_input).removeClass("invalid-input");
                    return true;
                }
            } else {
                $(".tooltipMgs").hide();
                $(_input).removeClass("invalid-input");
                return true;
            }
        } else {
            $(_input).removeClass('focus-input');
            tooltip.text("");
            tooltip.append("Vui lòng nhập " + validate);
            tooltip.append(triangle);
            tooltip.addClass("tooltipMgs");
            $(_input).parent().append(tooltip);
            $(_input).addClass("invalid-input");
            return false;
        }
    } else {
        return true;
    }
}