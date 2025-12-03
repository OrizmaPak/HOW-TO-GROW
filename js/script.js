document.getElementById("basic-info-toggler").onclick = function() {
    document.getElementById("organisation-info-div-basic-info").removeAttribute("hidden");
    document.getElementById("basic-info-toggler").setAttribute("class", "subpages-header-active");
    document.getElementById("account-prefix-toggler").removeAttribute("class");
    document.getElementById("default-accounts-toggler").removeAttribute("class");
    document.getElementById("organisation-info-div-account-prefix").setAttribute("hidden", "");
    document.getElementById("organisation-info-div-default-accounts").setAttribute("hidden", "");
    // document.getElementById("append-test-script").innerHTML = '<script src="test.js" defer></script>';
}
document.getElementById("account-prefix-toggler").onclick = function() {
    document.getElementById("organisation-info-div-account-prefix").removeAttribute("hidden");
    document.getElementById("account-prefix-toggler").setAttribute("class", "subpages-header-active");
    document.getElementById("basic-info-toggler").removeAttribute("class");
    document.getElementById("default-accounts-toggler").removeAttribute("class");
    document.getElementById("organisation-info-div-basic-info").setAttribute("hidden", "");
    document.getElementById("organisation-info-div-default-accounts").setAttribute("hidden", "");
}
document.getElementById("default-accounts-toggler").onclick = function() {
    document.getElementById("organisation-info-div-default-accounts").removeAttribute("hidden");
    document.getElementById("default-accounts-toggler").setAttribute("class", "subpages-header-active");
    document.getElementById("account-prefix-toggler").removeAttribute("class");
    document.getElementById("basic-info-toggler").removeAttribute("class");
    document.getElementById("organisation-info-div-account-prefix").setAttribute("hidden", "");
    document.getElementById("organisation-info-div-basic-info").setAttribute("hidden", "");
}
document.getElementById("profile-img-edit-icon").onclick = function() {
    document.getElementById("profile-image-upload-input").click();
}
document.getElementById('profile-image-upload-input').onchange = function(e) {
    document.getElementById('profile-img').src = window.URL.createObjectURL(e.files[0]);
}