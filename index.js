require('./script')
let app = require('./app');

app.listen(app.get('port'), app.get('host'), ()=> {
	console.log(`listening on ${app.get('port')}`);
});
