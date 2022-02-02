const sideBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarClose = document.querySelector('.close-btn');

sideBtn.addEventListener('click', function(){
    sidebar.classList.toggle('show-sidebar');
});

sidebarClose.addEventListener('click', function(){
    sidebar.classList.remove('show-sidebar');
});