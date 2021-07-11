/** Load data
 *  Author: PTDuyen (7/7/2021)
 */
function loadData(_url) {
    return $.ajax({
        url: _url,
        method: 'GET',
        // data:"",
        // contentType:"application/json",
        // dataType:"json" - tham do truyen len
        success: function(res) {
            return res;
        },
        error: function(res) {
            // alert('fail!');
            return false;
        }
    });
}
/** Post data
 *  Author: PTDuyen (7/7/2021)
 */
function postData(_url, data) {
    console.log("test")
    return $.ajax({
        url: _url,
        method: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        // - tham do truyen len
        // dataType: "json",
        success: function(res) {
            return res;
        },
        error: function(res) {
            console.log(res);
            return false;
        }
    })
}

/** Put data
 *  Author: PTDuyen (8/7/2021)
 */
function putData(_url, id, data) {
    let _urlPut = _url + "/" + id;
    return $.ajax({
        url: _urlPut,
        method: 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf8",
        success: function(res) {
            console.log("ok");
            return res;
        },
        error: function() {
            alert('fail!');
            return false;
        }
    })

}

/** Put data
 *  Author: PTDuyen (9/7/2021)
 */
function delData(_url, id) {
    let _urlDel = _url + '/' + id;
    return $.ajax({
        url: _urlDel,
        method: 'DELETE',
        success: function(res) {
            return res;
        },
        error: function() {
            return false;
        }
    })
}