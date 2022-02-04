const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const content = document.querySelectorAll('.content');

about.addEventListener('click', function(e){
    const id = e.target.dataset.id;
    if(id) {
        //remove class from all, add to selected
        btns.forEach(function(btn){
            btn.classList.remove('active');
        })
        e.target.classList.add('active');
        //hide other articles, show selected
        content.forEach(function(e){
            e.classList.remove('active');
        })
        const element = document.getElementById(id);
        element.classList.add('active');
    }
})