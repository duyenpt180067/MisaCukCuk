class Position {
    urlGetAll = "http://cukcuk.manhnv.net/v1/Positions";
    constructor() {
        this.PositionId;
        this.PositionCode;
        this.PositionName;
        this.Description;
        this.ParentId;
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
                div.append(item.PositionName);
                div.attr("id", item.PositionId);
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
    var position = new Position();
    position.loadOption(position.urlGetAll, "jobs", ".all-job");
    position.loadOption(position.urlGetAll, "positions", ".all-position");
})