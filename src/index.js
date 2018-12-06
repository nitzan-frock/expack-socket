import logMessage from './js/logger'
import './css/style.css'
import io from 'socket.io-client';
import $ from 'jquery';

$('document').ready(main());

function main () {
    const socket = io('http://localhost:8080');
    console.log('hello');

    socket.once('connect', () => {
        console.log('client connected to server');
    })

    socket.on('welcome', data => {
        console.log('connected');
    })


    // io.on('connection', () => {
    //     console.log('connected');
    //     server.emit('hello');
    //     server.on('welcome', res => {
    //         logMessage(res);
    //     });
    // });

    // Log message to console
    logMessage('A very warm welcome to Expack!')

    const text = $('text');
    text.val('hello')

    // Needed for Hot Module Replacement
    if(typeof(module.hot) !== 'undefined') {
        module.hot.accept() // eslint-disable-line no-undef  
    }
}