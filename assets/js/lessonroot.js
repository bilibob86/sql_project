const sections = document.getElementsByTagName('section');
const parts = document.getElementsByClassName('part');
const progressBarConainers = [
    document.getElementsByClassName('progress_bar')[0],
    document.getElementsByClassName('progress_bar')[1],
    document.getElementsByClassName('progress_bar')[2],
]

const progressBars = [
    document.getElementsByClassName('progress')[0],
    document.getElementsByClassName('progress')[1],
    document.getElementsByClassName('progress')[2],
]

function nextSection() {
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].classList.contains('active')) {
            sections[i].classList.remove('active')
            sections[i + 1].classList.add('active')
            progressBarConainers[i].classList.remove('active')
            progressBarConainers[i + 1].classList.add('active')
            progressBars[i].style.width = '100%';
            window.history.pushState('', '', `?step=${i + 2}`);
            if (i == 1) {
                for (let j = 0; j < document.getElementsByClassName("part").length; j++) {
                    document.getElementsByClassName("part")[j].classList.add("hidden");
                }
                window.scrollTo(0, 0);
            }
            break
        }
    }
}

function nextPart() {
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].classList.contains('hidden')) {
            parts[i].classList.remove('hidden');
            progressBars[1].style.width = (i) / parts.length * 100 + '%';
            setTimeout(() => {
                window.location.href = "#" + (i + 1);
            }, 550);
            break
        }
    }
}

function finishLesson(x) {
    document.cookie = `progress=${x}; path=/`;
    window.location.href = `../`;
}