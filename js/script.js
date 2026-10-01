
function upDate(previewPic) {

    console.log("upDate function called!");
    console.log("Alt: " + previewPic.alt);
    console.log("Source: " + previewPic.src);

    let imageDiv = document.getElementById("image");
    imageDiv.style.backgroundImage = "url('" + previewPic.src + "')";
    imageDiv.innerHTML = previewPic.alt;
}

function unDo() {


    console.log("unDo function called!");

    let imageDiv = document.getElementById("image");
    imageDiv.style.backgroundImage = "url('')";
    imageDiv.innerHTML = "Hover over an image below to display here.";
}

const pageOrder = {
    'index.html': 1,
    'About.html': 2,
    'myDreamJob.html': 3
};

function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return pageOrder[path] || 1;
}

function getTargetPage(href) {
    const filename = href.split('/').pop().split('#')[0] || 'index.html';
    return pageOrder[filename] || 1;
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.href && !this.href.includes('#')) {
            e.preventDefault();

            const currentPage = getCurrentPage();
            const targetPage = getTargetPage(this.getAttribute('href'));

            let outClass, inClass;

            if (targetPage > currentPage) {
                outClass = 'slide-out-left';
                inClass = 'slide-in-left';
            } else if (targetPage < currentPage) {
                outClass = 'slide-out-right';
                inClass = 'slide-in-right';
            } else {
                window.location.href = this.href;
                return;
            }

            sessionStorage.setItem('slideDirection', inClass);
            document.body.classList.add(outClass);

            setTimeout(() => {
                window.location.href = this.href;
            }, 600);
        }
    });
});

window.addEventListener('load', function () {
    const direction = sessionStorage.getItem('slideDirection');
    if (direction) {
        document.body.classList.add(direction);
        sessionStorage.removeItem('slideDirection');
    }
});
