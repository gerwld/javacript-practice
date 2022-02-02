//using selectors inside the element
// traversing the dom

//select all elements
const questions = document.querySelectorAll('.question');

//map all, add event listener to the child button
questions.forEach(function (ques) {
    const button = ques.querySelector('.question-btn');
    button.addEventListener('click', function () {

        //stay the class only in current element
        questions.forEach(function (elem) {
            if (elem !== ques) {
                elem.classList.remove('show-text');
            };
        })

        ques.classList.toggle('show-text');
    })
})