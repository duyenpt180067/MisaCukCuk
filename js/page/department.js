class Department {
    urlGetAll = "http://cukcuk.manhnv.net/api/Department";
    constructor() {
        this.DepartmentId;
        this.DepartmentCode;
        this.DepartmentName;
        this.Description;
        this.CreatedDate;
        this.CreatedBy;
        this.ModifiedDate;
        this.ModifiedBy;
    }

    /**--------------------------------------
     * Load data for option
     * Author: PTDuyen
     * Create: 8/7/2021
     */
    loadOption(_url, classOption, parentOption) {
        loadData(_url).then(function(res) {
            $.each(res, function(index, item) {
                var div = $(`<div></div>`);
                div.addClass(classOption);
                div.data(item);
                div.append(item.DepartmentName);
                div.attr("id", item.DepartmentId);
                $(parentOption).append(div);
            })
        })
    }

    // /**--------------------------------------
    //  * Load data follow id
    //  * Author: PTDuyen
    //  * Create: 8/7/2021
    //  */
    // loadDepartmentId(_url, id, _function) {
    //     loadData(_url + "/" + id, function(res) {
    //         _function(res);
    //     })
    // }
}

$(document).ready(function() {
    var department = new Department();
    department.loadOption(department.urlGetAll, "departments", ".all-department");
    department.loadOption(department.urlGetAll, "formdepartments", ".all-formdepartment");
})