var defaultDepartment = $("#department").val();
var defaultJob = $("#job").val();
var listEmployee = [];
var _urlEmployee = "http://cukcuk.manhnv.net/v1/Employees";
var _urlNewCode = "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode";
var newCode;
var checkDepartment = false;
var checkJob = false;

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
     * Load employee to table
     * Author: PTDuyen
     * Create: 7/7/2021
     */
    loadEmployee() {
        let _this = this;
        let list = [];
        // $('table').empty();
        loadData(_urlEmployee).then(function(listEmp) {
            if (listEmp != false) {
                $.each(listEmp, function(index, _emp) {
                    list.push(_this.formatData(_emp));
                })
                loadTable(list);
                showToast("load-success");
            } else {
                showToast("load-fail");
            }
        });
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
        console.log(emp);
        postData(_urlEmployee, emp).then(function(res) {
            if (res != false) {
                showToast("post-success");
                $("#table-body").empty();
                _this.loadEmployee();
            } else {
                showToast("post-fail");
            }
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
            if (res != false) {
                showToast("put-success");
                // $("")
                _this.reloadTable();
            } else {
                showToast("put-fail");
            }
        });
    }

    /**
     * Delete employee
     * Author: PTDuyen(8/7/2021)
     */
    delEmployee(id) {
        let _this = this;
        delData(_urlEmployee, id).then(function(res) {
            if (res == true) {
                // _this.loadEmployee();

                $("#table-body").empty();
            } else {
                showToast("delete-fail");
            }
        });
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


    /**
     * Take the new code of employee
     * Author: PTDuyen(10/7/2021)
     */
    newCode() {
        loadData(_urlNewCode).then(function(res) {
            if (res != false) {
                newCode = res;

            } else {
                newCode = false;
            }
        })
    }
}


$(document).ready(function() {
    var employee = new Employee();
    //js for btn reload
    $('.reload').on('click', function() {
        employee.reloadTable();
    })

    //Take data from API to table employee--------------------------------
    employee.loadEmployee();

    // css when dblclick tr and put data----------------------------------
    $('#table-body').on('dblclick', 'tr', function() {
        $(this).siblings().removeClass("choose-option");
        $(this).addClass("choose-option");
        let obj = $(this).data();
        loadDataToForm(obj, "#formAdd");
        $('.add-item').css('display', 'flex');
        $('.save').addClass('update');
        $('.update').removeClass('save');
        // validateForm();
        $(".update").on('click', function() {
            $(".btn2-pop").on('click', function() {
                $(".general-pop").css("display", 'none');
                $(".add-item").css("display", 'none');
                employee.putEmployee(obj.EmployeeId, obj);
            })
            $(".btn1-pop").on('click', function() {
                $(".general-pop").css("display", 'none');
            })
        })

    })

    // delete when click thead th i---------------------------------------
    var listDel = [];
    $('#table-body').on('click', 'tr td input', function() {
        if ($(this).prop("checked") == true) {
            console.log($(this).prop("checked"));
            listDel = listDel.filter(item => ((item) !== $(this).data()));
            listDel.push($(this).data());
        } else if ($(this).prop("checked") == false) {
            console.log($(this).prop("checked"));
            listDel = listDel.filter((item) => (item !== $(this).data()));
        }
    })
    $("table thead tr th i").on('click', function() {
        var name = "";
        showInfoPopup("delete");
        $.each(listDel, function(index, item) {
            name += (" " + item.FullName + ",");
        })
        $(".notification-pop p b span").text(name);
        $(".general-popup").css("display", "block");
        $(".btn1-pop").on("click", function() {
            $(".general-popup").css("display", "none");
        })
        $(".btn2-pop").on("click", function() {
            $.each(listDel, function(index, item) {
                listDel = listDel.filter(del => del != item);
                employee.delEmployee(item.EmployeeId);
            })
            if (listDel.length == 0) {
                showToast("delete-success");
                $('#table-body').empty();
                employee.loadEmployee(); //load fail --------------------------------------------------------------------------
            } else {
                showToast("delete-fail");
            }
        })
    })

    // js for select department---------------------------------------------------
    var checkDepartment = false;
    $('#findbydepartment, #department').on('click', function() {
        checkDepartment = !checkDepartment;
        checkJob = false;
        chooseOption('#department', '.departments', function(res) {
            // console.log(id);
            listEmployee = [];
            $('tbody').empty();
            loadData(_urlEmployee, function(listEmp) {
                $.each(listEmp, function(index, _emp) {
                    if (_emp.DepartmentId === res.DepartmentId)
                        listEmployee.push(employee.formatData(_emp));
                })
                loadTable(listEmployee);
                console.log(listEmployee);
            })
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
    employee.newCode();
    $('.btn-add-emp').on("click", function() {

        if (newCode != false) {
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
        } else {
            showToast("new-code-fail");
            $('.add-item').css('display', 'flex');
            var dataInput = $("form input");
            $.each(dataInput, function(index, input) {
                $(input).val("");
            })
            $('#code').focus();
            $('#code').addClass('input-focus');
        }

        validateForm();
    });


    // close form add-emp--------------------------------------------------------------------------------------
    $('.cancel, .btn-close-add').on("click", function() {
        showInfoPopup("post-cancel");
        $(".btn2-pop").on("click", function() {
            $('.add-item').css('display', 'none');
            $('.general-popup').css('display', 'none');
        })
        $(".btn1-pop").on("click", function() {
            $('.general-popup').css('display', 'none');
        })
    });

    //js for input---------------------------------------------------------------------------------------------
    $('.findid input').on("focus", function() {
        $('.findid').css('border', '1px solid #01b075');
    })
    $('.findid input').on("blur", function() {
        $('.findid').css('border', '1px solid #bbbbbb');
    })

    // Add new employee-------------------------------------------------------------
    $(".save").on('click', function() {
        // emp = dataForm("#formAdd", emp);
        // console.log(emp);
        showInfoPopup("post");
        $(".btn1-pop").on("click", function() {
            $('.general-popup').css('display', 'none');
        })
        $(".btn2-pop").on("click", function() {
            employee.postEmployee();
            $('.general-popup').css('display', 'none');
            $(".add-item").css('display', 'none');
        })
    })

    // $(".")
})