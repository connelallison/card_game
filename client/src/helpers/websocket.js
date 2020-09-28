import io from 'socket.io-client'

const host = window.location.hostname
const socket = io.connect('http://' + host + ':4000')

socket.on('connect', (data) => {
  console.log('websocket connection established at ' + Date().toString())
  if (localStorage.getItem('displayName')) {
    socket.emit('updateDisplayName', {
      displayName: localStorage.getItem('displayName')
    })
  }
  if (localStorage.getItem('deckID')) {
    socket.emit('updateDeckID', {
      deckID: localStorage.getItem('deckID')
    })
  }
})
socket.on('displayNameAnnouncement', (data) => {
  console.log(data.message)
})
socket.on('disconnect', (data) => {
  console.log('disconnected from websocket connection at ' + Date().toString())
})

export default socket
