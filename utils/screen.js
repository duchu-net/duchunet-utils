export function toggleFullScreen () {
  if (!fullscreenEnabled()) {
    // ENABLE FULLSCREEN MODE
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }
    return true
  } else {
    // DISABLE FULLSCREEN MODE
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
    return false
  }
}

export function fullscreenEnabled() {
  return !(
    !document.fullscreenElement
    && !document.mozFullScreenElement
    && !document.webkitFullscreenElement
    && !document.msFullscreenElement
  )
}
