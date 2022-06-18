const songName = document.querySelector('.song-details__name')
const songArtist = document.querySelector('.song-details__artist')
const songImg = document.querySelector('.song-img__img')
const currentAudio = document.querySelector('.current-audio')
const playAndPauseBtn = document.querySelector('.controls__btn--pause')
const nextSongBtn = document.querySelector('.controls__btn--next')
const prevSongBtn = document.querySelector('.controls__btn--prev')
const progressBar = document.querySelector('.song-progress__bar')
const progressArea = document.querySelector('.song-progress')
const repeatBtn = document.querySelector('.controls__btn--repeat')

let songIndex = 0

//-----------------------//

//FUNCTIONS

//load song
const loadSong = e => {
	songName.textContent = songs[songIndex].name
	songArtist.textContent = songs[songIndex].artist
	songImg.src = `img/${songs[songIndex].img}.jpg`
	currentAudio.src = `audio/${songs[songIndex].src}.mp3`
}

//start song function
const playSong = () => {
	currentAudio.play()
	playAndPauseBtn.classList.remove('paused')
	playAndPauseBtn.textContent = 'pause'
}

//pause song function
const pauseSong = () => {
	currentAudio.pause()
	playAndPauseBtn.classList.add('paused')
	playAndPauseBtn.textContent = 'play_arrow'
}

//next song function
const nextSong = () => {
	songIndex++
	songIndex > songs.length - 1 ? (songIndex = 0) : songIndex
	loadSong(songIndex)
	playSong()
}

//prev song function
const prevSong = () => {
	songIndex--
	songIndex < 0 ? (songIndex = songs.length - 1) : songIndex
	loadSong(songIndex)
	playSong()
}

//-----------------------//
//EVENTS

//first load of song event
window.addEventListener('load', loadSong())

//play and pause song btn event
playAndPauseBtn.addEventListener('click', () => {
	const isSongPaused = playAndPauseBtn.classList.contains('paused')
	isSongPaused ? playSong() : pauseSong()
})

//play next song btn event
nextSongBtn.addEventListener('click', nextSong)

//play prev song btn event
prevSongBtn.addEventListener('click', prevSong)

//update progress bar witdth and current time of song
currentAudio.addEventListener('timeupdate', e => {
	const songCurrentTimeSpan = document.querySelector('.song-progress__timer--current')

	const currentTime = e.target.currentTime
	const duration = e.target.duration

	let progressWidth = (currentTime / duration) * 100
	progressBar.style.width = `${progressWidth}%`

	//show current song duration
	let currentMin = Math.floor(currentTime / 60)
	let currentSec = Math.floor(currentTime % 60)
	if (currentSec < 10) {
		currentSec = `0${currentSec}`
	}
	songCurrentTimeSpan.textContent = `${currentMin}:${currentSec}`

	//show full song duration
	currentAudio.addEventListener('loadeddata', e => {
		const songDurationSpan = document.querySelector('.song-progress__timer--duration')
		const songDuration = e.target.duration
		const durationMin = Math.floor(songDuration / 60)
		let durationSec = Math.floor(songDuration % 60)
		if (durationSec < 10) {
			durationSec = `0${durationSec}`
		}
		songDurationSpan.textContent = `${durationMin}:${durationSec}`
	})
})

//update song current time use bar area
progressArea.addEventListener('click', e => {
	const progressAreaWidth = progressArea.clientWidth
	const clickOffSet = e.offsetX
	const songDuration = currentAudio.duration
	currentAudio.currentTime = (clickOffSet * songDuration) / progressAreaWidth
	playSong()
})

//repeat, shuffle btn event
repeatBtn.addEventListener('click', () => {
	let typeOfIcon = repeatBtn.innerText
	switch (typeOfIcon) {
		case 'repeat':
			repeatBtn.innerText = 'repeat_one'
			repeatBtn.setAttribute('title', 'Song looped')
			break
		case 'repeat_one':
			repeatBtn.innerText = 'shuffle'
			repeatBtn.setAttribute('title', 'Playback shuffle')
			break
		case 'shuffle':
			repeatBtn.innerText = 'repeat'
			repeatBtn.setAttribute('title', 'Playlist looped')
			break
	}
})

//repeat, shuffle audio event
currentAudio.addEventListener('ended', () => {
	let typeOfIcon = repeatBtn.innerText
	switch (typeOfIcon) {
		case 'repeat':
			nextSong()
			break
		case 'repeat_one':
			currentAudio.currentTime = 0;
			playSong()
			break
		case 'shuffle':
			console.log('dont work!! to do'); // TO DO!
			break
	}
})
