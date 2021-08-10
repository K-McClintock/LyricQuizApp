const copyrightBtn = document.querySelector('#copy-btn');
const lyricCopyright = document.querySelector('#lyric-copyright');
copyrightBtn.addEventListener('click', () => {
    lyricCopyright.classList.toggle('hide')
})
