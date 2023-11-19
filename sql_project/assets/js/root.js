const lessonInfos = [
    document.getElementById('lesson_1'),
    document.getElementById('lesson_2'),
    document.getElementById('lesson_3'),
]

function openLesson(x) {
    lessonInfos.forEach((lessonInfo) => {
        lessonInfo.classList.remove('active')
    });
    lessonInfos[x - 1].classList.add('active')
}

function redirectLesson(x) {
    window.location.href = `lessons/${x}`
}

window.onload = () => {
    const progress = document.cookie.split('; ').find(row => row.startsWith('progress='));
    const progress_bar = document.getElementsByClassName('progress_bar')[0];
    if (progress) {
        const progressValue = progress.split('=')[1];
        for (let i = 1; i < progressValue; i++) {
            const lesson = document.getElementsByClassName('lesson')[i - 1];
            lesson.classList.add('done');
        }
        progress_bar.style.width = progressValue * 33.33 + '%';
        if (progressValue == 1) {
            document.getElementsByClassName('path1')[0].classList.add('active');
        } else if (progressValue == 2) {
            document.getElementsByClassName('path1')[0].classList.add('active');
            document.getElementsByClassName('path2')[0].classList.add('active');
        }
    }
}