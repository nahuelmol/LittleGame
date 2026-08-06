import app from './app.js';

app.listen(app.get('port'), app.get('host'), ()=> {
	console.log(`listening on ${app.get('port')}`);
});
