//js to show option of company - header-left
var checkCompany = false; // option is not show
$('.find-company').on('click', function() {
    checkCompany = !checkCompany;
    chooseOption('#company', '.companies');
    if (checkCompany == true) { // show option
        showOption('.all-company', function() {});
        console.log(checkCompany);
    } else { // not show option
        hideOption('.all-company', function() {});
    }
    clickOutElement('.find-company', function() {
        checkCompany = false;
        hideOption('.all-company', function() {});
    })
})