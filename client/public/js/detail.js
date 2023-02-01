var deletes = document.querySelectorAll(".fa-trash");
console.log(deletes);
deletes.forEach(el => {
    el.addEventListener("click", () => {
        // el.parentElement.previousElementSibling.value = '';
        el.parentElement.innerHTML = '';
    })
});

function getimage(input) {
    var display_name = input.nextElementSibling;
    var image = input.value;
    var name = image.replace(/^.*\\/, "");
    display_name.innerHTML = name + "<i class=fa-trash></i>";
    display_name.children[0].classList.add("fa-solid");

    var deletess = document.querySelectorAll(".fa-trash");

    deletess.forEach(el => {
        el.addEventListener("click", () => {
            // el.parentElement.previousElementSibling.value = '';
            el.parentElement.innerHTML = '';
        })
    });
}
console.log("hello");