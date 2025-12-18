document.addEventListener('DOMContentLoaded', function() {
    const gallerySlider = document.getElementById('slider');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    const pagerPoints = document.getElementById('points');
    const pagerInfo = document.getElementById('info');

const images = [
    'https://github.com/Heralt529/task6/blob/main/1.jpg?raw=true',
    'https://github.com/Heralt529/task6/blob/main/2.jpg?raw=true',
    'https://github.com/Heralt529/task6/blob/main/3.jpg?raw=true',
    'https://github.com/Heralt529/task6/blob/main/4.jpg?raw=true',
    'https://github.com/Heralt529/task6/blob/main/5.jpg?raw=true',
    'https://github.com/Heralt529/task6/blob/main/6.jpg?raw=true',
    'https://github.com/Heralt529/task6/blob/main/7.jpg?raw=true',
    'https://github.com/Heralt529/task6/blob/main/8.jpg?raw=true'
];

const par = '?w=800&h=600&fit=crop&crop=center&auto=format';

let cur_page = 0;
let max_images = 3;

function MaxImagesManager()
{
    max_images = window.innerWidth <= 768 ? 1:3;
    GalleryManager();
}

function getPagesCount()
{
    return Math.ceil(images.length/max_images);
}

function DrawGallery()
{
    gallerySlider.innerHTML = '';
    images.forEach((url,index) => 
    {
        const slide = document.createElement('div');
        slide.className = 'slide';

        const image_container = document.createElement('div');
        image_container.className = 'image-container';

        const img = document.createElement('img');
        img.src = `${url}${par}`;
        image_container.appendChild(img);
        slide.appendChild(image_container);
        gallerySlider.appendChild(slide);
    });
}

function DrawPoints()
{
    pagerPoints.innerHTML='';
    const pages = getPagesCount();

    for (let i = 0; i < pages; i++)
    {
        const point = document.createElement('div');
        point.className = `dot ${i === cur_page ? 'active' : ''}`;
        point.dataset.page = i;
        point.addEventListener('click', () => ChangePage(i));
        pagerPoints.appendChild(point);
    }
}

function PagerManager()
{
    const pages = getPagesCount();
    pagerInfo.textContent =  `${cur_page + 1}/${pages}`;
}

function PointsManager()
{
    const points = document.querySelectorAll('.dot');
    points.forEach((point,index) => {
        point.classList.toggle('active', index === cur_page);
    });
}

function ChangePage(page)
{
    const pages = getPagesCount();
    if (page < 0 || page >= pages) return;

    cur_page = page;
    const width = 100/max_images;
    const x = -(cur_page*100);

    gallerySlider.style.transform = `translateX(${x}%)`;

    PointsManager();
    PagerManager();
    ButtonsManager();
}

function ButtonsManager()
{
    const pages = getPagesCount();
    leftButton.disabled = cur_page === 0;
    rightButton.disabled = cur_page === pages - 1;
}

function GalleryManager()
{
    const pages = getPagesCount();
    if (cur_page>=pages)
    {
        cur_page= Math.max(0,pages-1);
    }

    const slides = document.querySelectorAll('.slide');
    const width = 100/max_images;
    slides.forEach(slide => {
        slide.style.flex = `0 0 ${width}%`;
    });

    ChangePage(cur_page);
    DrawPoints();
}

function StartListening()
{
    DrawGallery();
    MaxImagesManager();

    leftButton.addEventListener('click', () => ChangePage(cur_page-1));
    rightButton.addEventListener('click', () => ChangePage(cur_page+1));

    window.addEventListener('resize', MaxImagesManager);

    GalleryManager();
}


StartListening();
});
