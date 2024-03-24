document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player')
  const playButton = document.getElementById('playButton')
  const gameScreen = document.getElementById('gameScreen')
  const homeScreen = document.getElementById('homeScreen')

  let currentLane = 1
  let obstacles = []
  let gameInterval
  let obstacleSpawnInterval
  let obstacleSpeed = 2
  const lanes = [200, 250, 300]  // X-coordinaten van de lanes //

  /// /// /// Muziek dingen /// //// ///
  const audioSoundtrack = new Audio("audios/robot_city_8bit_soundtrack.mp3")
  audioSoundtrack.loop = true
  audioSoundtrack.play()
  /// bron = https://www.youtube.com/watch?v=NAKj3HJX_tM&list=PLwJjxqYuirCLkq42mGw4XKGQlpZSfxsYd&index=21 ///
  /// ChatGPT prompt: "How to add a volume dial next to the <p>Volume</p>?"

  /// volume bewegen///
  const volumeControl = document.getElementById('volumeControl')
  volumeControl.addEventListener('input', () => {
    audioSoundtrack.volume = volumeControl.value / 100
  })

  /// Pauzeerknop voor muziek ///
  const pauseButton = document.getElementById('pauseButton')
  pauseButton.addEventListener('click', () => {
    if (audioSoundtrack.paused) {
      audioSoundtrack.play()
      pauseButton.textContent = 'Pause'
    } else {
      audioSoundtrack.pause()
      pauseButton.textContent = 'Play'
    }
  })

  /// /// /// Game dingen /// /// ///
  /// Game starten ///
  const startGame = () => {
    player.style.left = lanes[currentLane] + 'px'
    player.style.bottom = '10px'
    obstacles.forEach(obstacle => obstacle.remove())
    obstacles = []
    gameInterval = setInterval(updateGame, 20)
    obstacleSpawnInterval = setInterval(spawnObstacle, 1500)
  }

  /// Toetsenbord bewegingen ///
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentLane > 0) {
      currentLane--
    } else if (e.key === 'ArrowRight' && currentLane < 2) {
      currentLane++
    }
    player.style.left = lanes[currentLane] + 'px'
  })
    /// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event ///

    /// Obstakel laten spawnen ///
  const spawnObstacle = () => {
    const obstacle = document.createElement('div')
    obstacle.className = 'obstacle'
    const lane = Math.floor(Math.random() * 3)
    obstacle.style.left = lanes[lane] + 'px'
    obstacle.style.bottom = '400px'
    gameScreen.appendChild(obstacle)
    obstacles.push(obstacle)
  }

  /// updateGame zodat de obstakels blijven spawnen ///
  const updateGame = () => {
    obstacles.forEach(obstacle => {
      let obstacleBottom = parseInt(obstacle.style.bottom, 10)
      obstacle.style.bottom = (obstacleBottom - obstacleSpeed) + 'px'
      if (obstacleBottom + 0 <= 0) {
        obstacle.remove()
        obstacles.shift()
      }
    })
  }

  /// De Play/Race knop ///
  playButton.addEventListener('click', () => {
    homeScreen.style.display = 'none'
    gameScreen.style.display = 'flex'
    startGame()
  })
})
