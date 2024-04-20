import browserSync from 'browser-sync'

const bs = browserSync.create();


bs.init({
    notify: false,
    port: 3001,
    open: true,
    files: `dist/**`,
    server: {
        baseDir: ['src/examples'],
        routes: {
            '/dist': './dist'
        }
    }
})