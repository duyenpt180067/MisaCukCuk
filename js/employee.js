var listemp = document.getElementById("employee");
$('.btn-add-emp').click(function() {
    $('.add-emp').addClass('open-add-emp');
    listemp.style.filter = "opacity(0.1)";
});
$('.btn-close-add').click(function() {
    $('.add-emp').removeClass('open-add-emp');
    listemp.style.filter = "opacity(1)";
});

$('.findid input').on("focus", function() {
    var findid = document.getElementById("findid");
    findid.style.boxShadow = "2px 2px 20px rgb(0 0 0 / 40%)";
})
$('.findid input').on("blur", function() {
    var findid = document.getElementById("findid");
    findid.style.boxShadow = "none";
})
$('.reload').click(function() {
    location.reload();
})