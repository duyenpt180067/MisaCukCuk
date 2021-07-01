// show form add-emp
var listemp = document.getElementById("employee");
$('.btn-add-emp').click(function() {
    $('.add-emp').addClass('open-add-emp');
    listemp.style.filter = "opacity(0.1)";
});
// close form add-emp
$('.btn-close-add').click(function() {
    $('.add-emp').removeClass('open-add-emp');
    listemp.style.filter = "opacity(1)";
});
// focus and blur input find emp
$('.findid input').on("focus", function() {
    var findid = document.getElementById("findid");
    findid.style.border = "1px solid #01b075";
    findid.style.borderRadius = "5px";
})
$('.findid input').on("blur", function() {
    var findid = document.getElementById("findid");
    findid.style.border = "1px solid #bbbbbb";
})

// btn reload
$('.reload').click(function() {
    location.reload();
})

// Find by input
$('.find').click(function() {
    var string_find = document.getElementById('findbyid');
    console.log(string_find.value);
});

//Find by select
$('.find-department').click(function() {
    document.getElementById('arrow-department').style.backgroundImage = "url(../../lib/icon/up.png)";
})
$('.find-job').click(function() {
    document.getElementById('arrow-job').style.backgroundImage = "url(../../lib/icon/up.png)";
})
document.getElementById("arrow-job").ondblclick = function() { myFunction() };

function myFunction() {
    document.getElementById('arrow-department').style.backgroundImage = "url(../../lib/icon/down.png)";
}