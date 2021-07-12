var defaultDepartment = $("#department").val();
var defaultJob = $("#job").val();
var listEmployee = [];
var _urlEmployee = "http://cukcuk.manhnv.net/v1/Employees";
var _urlNewCode = "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode";
var newCode;
var checkDepartment = false;
var checkJob = false;
var listFilter;


class Employee {
    constructor(employeeCode, fullName, gender, dateOfBirth, phoneNumber, email, positionName, departmentName, salary, workStatus) {
        this.employeeCode = employeeCode;
        this.fullName = fullName;
        this.genderName = gender;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.positionName = positionName;
        this.departmentName = departmentName;
        this.salary = salary;
        this.workStatus = workStatus;
    }

    /**
     * Format data
     * Author: PTDuyen
     * Create: 7/7/2021
     */
    formatData(emp) {
        // let e = new Employee();
        emp.EmployeeCode = (emp.EmployeeCode) ? emp.EmployeeCode : 'Không xác định';
        emp.FullName = (emp.FullName) ? emp.FullName : 'Không xác định';
        emp.GenderName = (emp.GenderName) ? emp.GenderName : 'Không xác định';
        //format date
        let date = new Date(emp.DateOfBirth + '');
        emp.DateOfBirth = (emp.DateOfBirth) ? date.toLocaleDateString() : ""; // tolocalDateString("en-GB")
        emp.PhoneNumber = (emp.PhoneNumber) ? emp.PhoneNumber : 'Không xác định';
        emp.Email = (emp.Email) ? emp.Email : 'Không xác định';
        emp.PositionName = (emp.PositionName) ? emp.PositionName : 'Không xác định';
        emp.DepartmentName = (emp.DepartmentName) ? emp.DepartmentName : 'Không xác định';
        //format salary
        emp.Salary = (emp.Salary) ? parseFloat(emp.Salary).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : 'Không xác định';
        emp.WorkStatus = (emp.WorkStatus) ? emp.WorkStatus : 'Không xác định';
        return emp;
    }

    /**
     * Take employee by code
     * Author: PTDuyen(1/7/2021)
     */
    getEmployeeById(code) {
        var listGet = [];
        let emp;
        // let urlId = _urlEmployee + "/" + id;
        return loadData(_urlEmployee).then(function(res) {
            if (res != false) {
                listGet = res;
                // emp
                return res;
            } else return false;
        })
    }

    /**
     * Load employee to table
     * Author: PTDuyen
     * Create: 7/7/2021
     */
    loadEmployee() {
        let _this = this;
        let list = [];
        // $('table').empty();
        loadData(_urlEmployee).then(function(listEmp) {
            $.each(listEmp, function(index, _emp) {
                list.push(_this.formatData(_emp));
            })
            loadTable(list);
            showToast("load-success");
        }, function() {
            showToast("load-fail");
        })
    }

    /**
     * Post employee
     * Author: PTDuyen(8/7/2021)
     */
    postEmployee() {
        let _this = this;
        var emp = dataForm("#formAdd", _this);
        delete emp.genderName;
        delete emp.positionName;
        delete emp.departmentName;
        // console.log(emp);
        postData(_urlEmployee, emp).then(function(res) {
            console.log(res);
            showToast("post-success");
            _this.reloadTable();
        }, function() {
            showToast("post-fail");
        });
    }

    /**
     * Put employee
     * Author: PTDuyen(8/7/2021)
     */
    putEmployee(id) {
        let _this = this;
        var emp = dataForm("#formAdd", _this);
        console.log(emp);
        delete emp.genderName;
        delete emp.positionName;
        delete emp.departmentName;
        putData(_urlEmployee, id, emp).then(function(res) {
            showToast("put-success");
            // $("")
            _this.reloadTable();
        }, function() {
            showToast("put-fail");
        });
    }

    /**
     * Delete employee
     * Author: PTDuyen(8/7/2021)
     */
    delEmployee(id) {
        let _this = this;
        delData(_urlEmployee, id).then(function(res) {
            // $("#table-body").empty();
            _this.loadEmployee();
        }, function() {
            // showToast("delete-fail");
        });
    }

    filterEmployee(pageSize, pageNumber, departmentId, positionId) {
        var params = {
            pageSize: pageSize,
            pageNumber: pageNumber,
            employeeFilter: "NV",
            departmentId: departmentId,
            positionId: positionId
        }
        filterObj(_urlEmployee + "employeeFilter", params).then(function(res) {
            listFilter = res;
        }, function(res) {
            listFilter = false;
        })
    }

    /**
     * Reload table employee
     * Author: PTDuyen(8/7/2021)
     */
    reloadTable() {
        var _this = this;
        $('tbody').empty();
        _this.loadEmployee();
        // showToast("load-success");
        checkDepartment = false;
        checkJob = false;
        $("#department").val(defaultDepartment);
        $("#job").val(defaultJob);
        $("#department, #job").siblings('.xselect').addClass('hidden');
        $("#department, #job").siblings('.select-option').children().removeClass('choose-option');
        $("#department, #job").siblings('.select-option').find('i').addClass('hidden');
    }


    // /**
    //  * Take the new code of employee
    //  * Author: PTDuyen(10/7/2021)
    //  */
    // newCode() {
    //     let _this = this;
    //     _this.reloadTable();

    // }

    async initEvents() {
        var employee = this;
        //js for btn reload
        $('.reload').on('click', function() {
            employee.reloadTable();
        })

        //Take data from API to table employee--------------------------------
        employee.loadEmployee();

        // css when dblclick tr and put data----------------------------------
        $('#table-body').on('dblclick', 'tr', function() {
            $(".cancel").addClass("cancel-update").removeClass("cancel");
            $(".btn-close-add").addClass("btn-close-update").removeClass("btn-close-add");
            let _tr = this;
            validateForm("#formAdd")
            $(_tr).siblings().removeClass("choose-option");
            $(_tr).addClass("choose-option");
            let obj = $(this).data();
            loadDataToForm(obj, "#formAdd");
            $('.add-item').css('display', 'flex');
            $('.save').addClass('update');
            $('.update').removeClass('save');
            //close form update-emp
            $('.cancel-update, .btn-close-update').click(function() {
                showInfoPopup("post-cancel");
                $(".btn2-pop").off("click").on("click", function() {
                    $('.add-item').css('display', 'none');
                    $('.general-popup').css('display', 'none');
                    $(_tr).removeClass("choose-option");
                })
                $(".btn1-pop").off("click").on("click", function() {
                    $('.general-popup').css('display', 'none');
                })
            });
            // update employee
            $(".update").on('click', function() {
                showInfoPopup("put");
                var name = (" " + obj.FullName);
                $(".notification-pop p b span").text(name);
                $(".btn2-pop").off('click').on('click', function() {
                    $('.general-popup').css('display', 'none');
                    $(_tr).removeClass("choose-option");
                    var inputs = $("#formAdd input");
                    var invalid = 0;
                    var invalid1;
                    $.each(inputs, function(index, input) {
                        if (validateInput(input) == false) {
                            invalid += 1;
                            if (invalid == 1) {
                                invalid1 = input;
                            }
                        }
                        $(input).trigger("blur");
                    })
                    if (invalid > 0) {
                        showToast("invalid-form");
                        $(invalid1).focus();
                        return;
                    } else {
                        employee.putEmployee(obj.EmployeeId, obj);
                        $(".add-item").css('display', 'none');
                    }
                })
                $(".btn1-pop").off('click').on('click', function() {
                    $(".general-popup").css("display", 'none');
                    // $(_tr).removeClass("choose-option");
                })
            })

        })

        // delete when click thead th i---------------------------------------
        // listDel is list employee choosed
        var listDel = [];
        $('#table-body').off("click").on('click', 'tr td input', function() {
            if ($(this).prop("checked") == true) {
                console.log($(this).prop("checked"));
                listDel = listDel.filter(item => ((item) !== $(this).data()));
                listDel.push($(this).data());
            } else if ($(this).prop("checked") == false) {
                console.log($(this).prop("checked"));
                listDel = listDel.filter((item) => (item !== $(this).data()));
            }
        })

        //  Click icon waste backet then delete
        $("table thead tr th i").off("click").on('click', function() {
            var name = "";
            showInfoPopup("delete");
            $.each(listDel, function(index, item) {
                name += (" " + item.FullName + ",");
            })
            $(".notification-pop p b span").text(name);
            $(".general-popup").css("display", "block");
            $(".btn1-pop").off("click").on("click", function() {
                $(".general-popup").css("display", "none");
            })
            $(".btn2-pop").off("click").on("click", function() {
                $(".general-popup").css("display", "none");
                $.each(listDel, function(index, item) {
                    listDel = listDel.filter(del => del != item);
                    employee.delEmployee(item.EmployeeId);
                })
                if (listDel.length == 0) {
                    showToast("delete-success");
                    $('#table-body').empty();
                    setTimeout(employee.loadEmployee(), 100);
                    //load fail --------------------------------------------------------------------------
                } else {
                    $('#table-body').empty();
                    employee.loadEmployee();
                    showToast("delete-fail");
                }
            })
        })

        // js for select department---------------------------------------------------
        var checkDepartment = false;
        var _this = this;
        $('#findbydepartment, #department').on('click', function() {
            checkDepartment = !checkDepartment;
            checkJob = false;
            // choose option for the select
            chooseOption('#department', '.departments', function(res) {
                // then load table
                // listEmployee = [];
                $('tbody').empty();
                _this.filterEmployee(10, 1, res.DepartmentId, "");
                loadTable(listFilter);

                // loadData(_urlEmployee + "", function(listEmp) {
                //     $.each(listEmp, function(index, _emp) {
                //         if (_emp.DepartmentId === res.DepartmentId)
                //             listEmployee.push(employee.formatData(_emp));
                //     })
                //     loadTable(listEmployee);
                //     console.log(listEmployee);
                // })
            });
            if (checkDepartment == true) {
                showOption('.all-department', function() {
                    $('.all-department').siblings('.div-arrow').css({
                        'background-color': '#bbb',
                        'border-right': '1px solid #01b075'
                    });
                });
            }
            if (checkDepartment == false) {
                hideOption('.all-department', function() {
                    $('.all-department').siblings('.div-arrow').css({
                        'background-color': '#fff',
                        'border-right': '1px solid #bbb'
                    });
                });
            }
            clickOutElement('#findbydepartment, #department', function() {
                checkDepartment = false;
                hideOption('.all-department', function() {
                    $('.all-department').siblings('.div-arrow').css({
                        'background-color': '#fff',
                        'border-right': '1px solid #bbb'
                    });
                })
            });
            delOption('#department', defaultDepartment);
        })

        //js for select job-----------------------------------------------------------
        var checkJob = false;
        $('#findbyjob , #job').on('click', function() {
            checkJob = !checkJob;
            checkDepartment = false;
            chooseOption('#job', '.jobs', function(res) {
                $('#job').data(res);
            })
            if (checkJob == true) {
                showOption('.all-job', function() {
                    $('.all-job').siblings('.div-arrow').css({
                        'background-color': '#bbb',
                        'border-right': '1px solid #01b075'
                    });
                });
            }
            if (checkJob == false) {
                hideOption('.all-job', function() {
                    $('.all-job').siblings('.div-arrow').css({
                        'background-color': '#fff',
                        'border-right': '1px solid #bbb'
                    });
                });
            }
            clickOutElement('#findbyjob , #job', function() {
                checkJob = false;
                hideOption('.all-job', function() {
                    $('.all-job').siblings('.div-arrow').css({
                        'background-color': '#fff',
                        'border-right': '1px solid #bbb'
                    });
                })
            });
            delOption('#job', defaultJob);
        })


        // show form add employee-------------------------------------------------------------
        // get the new code of new employee and put it in the input
        $('.btn-add-emp').on("click", function() {
            validateForm("#formAdd")
            loadData(_urlNewCode).then(function(res) {
                newCode = res;
                showToast("new-code-success");
                $('.add-item').css('display', 'flex');
                var dataInput = $("form input");
                $.each(dataInput, function(index, input) {
                    $(input).val("");
                })
                $('.add-item form #code').val(newCode);
                console.log()
                $('#code').focus();
                $('#code').addClass('input-focus');
            }, function() {
                showToast("new-code-fail");
                $('.add-item').css('display', 'flex');
                var dataInput = $("form input");
                $.each(dataInput, function(index, input) {
                    $(input).val("");
                })
                $('#code').focus();
                $('#code').addClass('input-focus');
            })
        });

        //js for input---------------------------------------------------------------------------------------------
        $('.findid input').on("focus", function() {
            $('.findid').css('border', '1px solid #01b075');
        })
        $('.findid input').on("blur", function() {
            $('.findid').css('border', '1px solid #bbbbbb');
        })

        // Add new employee when click save-------------------------------------------------------------
        $(".save").off("click").click(function() {
            // emp = dataForm("#formAdd", emp);
            // console.log(emp);
            showInfoPopup("post");
            $(".btn1-pop").off("click").on("click", function() {
                $('.general-popup').css('display', 'none');
            })
            $(".btn2-pop").off("click").on("click", function() {
                var inputs = $("#formAdd input");
                var invalid = 0;
                var invalid1;
                $.each(inputs, function(index, input) {
                    if (validateInput(input) == false) {
                        invalid += 1;
                        if (invalid == 1) {
                            invalid1 = input;
                        }
                    }
                    $(input).trigger("blur");
                })
                if (invalid > 0) {
                    $('.general-popup').css('display', 'none');
                    showToast("invalid-form");
                    $(invalid1).focus();
                    return;
                } else {
                    employee.postEmployee();
                    $('.general-popup').css('display', 'none');
                    $(".add-item").css('display', 'none');
                }
            })
        })



        // close form add-emp--------------------------------------------------------------------------------------
        $('.cancel, .btn-close-add').click(function() {
            showInfoPopup("post-cancel");
            $(".btn2-pop").off("click").on("click", function() {
                $('.add-item').css('display', 'none');
                $('.general-popup').css('display', 'none');
            })
            $(".btn1-pop").off("click").on("click", function() {
                $('.general-popup').css('display', 'none');
            })
        });
    }
}

$(document).ready(function() {
    new Employee().initEvents();
    //To move the add-form, popup----------------------------------------------
    $(".add-emp").css("cursor", "all-scroll");
    $(".add-emp").draggable();
    $(".pop").draggable();
    $(".xpop, .btn2-pop").click(function() {
        $(".general-popup").css("display", "none");
    })
})