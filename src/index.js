import logMessage from './js/logger'
import './css/style.css'
import io from 'socket.io-client';
import $ from 'jquery';

$('document').ready(main());

function main () {
    const socket = io();
    console.log('hello');

    socket.emit('ping');

    socket.on('connect', () => {
        console.log(socket.connected);
    })

    // socket.on('connection', socket => {
    //     socket.once('connect', () => {
    //         console.log('client connected to server');
    //     })
    
    //     socket.on('welcome', data => {
    //         console.log('connected');
    //     })
    // })


    // io.on('connection', () => {
    //     console.log('connected');
    //     server.emit('hello');
    //     server.on('welcome', res => {
    //         logMessage(res);
    //     });
    // });

    // Log message to console
    logMessage('A very warm welcome to Expack!')

    // Needed for Hot Module Replacement
    if(typeof(module.hot) !== 'undefined') {
        module.hot.accept() // eslint-disable-line no-undef  
    }
}