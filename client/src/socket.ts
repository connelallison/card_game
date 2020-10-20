import io from 'socket.io-client'

const host = window.location.hostname
const socket = io.connect('http://' + host + ':4000')

socket.on('connect', (data) => {
    console.log('websocket connection established at ' + Date().toString())
    if (localStorage.getItem('displayName')) socket.emit('updateDisplayName', { displayName: localStorage.getItem('displayName') })
})

export default socket