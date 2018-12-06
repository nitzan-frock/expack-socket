import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import historyApiFallback from 'connect-history-api-fallback';
import config from '../../webpack.config.dev.js'

const app=express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
    compiler = webpack(config)

const http = require('http').Server(app);
const io = require('socket.io')(http);

console.log('\n\n\n\nTHIS IS THE SERVER\n\n\n');

io.on('connection', client => {
    console.log('new connection');

    client.on('connect');

    client.on('hello', () => {
        client.emit('welcome', 'welcome to the club');
    })
})

app.use(historyApiFallback({
    verbose: false
}));

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
        color: true
    }
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

const PORT=process.env.PORT||8080

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})