const mongoose = require('mongoose'); // podpinamy mongoose
const Schema = mongoose.Schema; //	Główny konstruktor modeli
//	Modele w Mongoose są konstruktorami, które sami definiujemy. Reprezentują one dokumenty, które mogą być zapisywane
//	i odczytywane z bazy danych. W schemacie tego modelu należy określić klucz oraz typ wartości jaką będzie 
//	przechowywał. Aby to zrobić, najpierw musimy pobrać główny konstruktor takich modeli.

mongoose.connect('mongodb://localhost/nodeappdatabase', { //podpinanuie bazy danych aby nasa aplikcja miała dane, na krórych będzie pracować
    useMongoClient: true 
});

//	new user Schema
const userSchema = new Schema({ // tworzę schemat dla aplikacji, która będzie tworzyć użytkowników
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

//	Mongoose schema method
userSchema.methods.manify = function(next) { //funkcja ,która zmodyfikuje nam imię podczas tworzenia instancji
    this.name = this.name + '-boy';

    return next(null, this.name);
};

//Główny konstruktor schematów, który przypisaliśmy do zmiennej Schema posiada metodę .pre(), 
//która wykonuje się przed metodą określoną jako parametr.

//	pre-save method
userSchema.pre('save', function(next) {
    //pobranie aktualnego czasu
    const currentDate = new Date();

    //zmiana pola na aktualny czas
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    // next() jest funkcją która przechodzi do następnego hooka do
    // wykonania przed lub po requeście
    next();
});

const User = mongoose.model('User', userSchema);
//instancje klasy User
const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
});
// do tego moentu jest taki nasz szablon


kenny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

kenny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + kenny.name +  ' zapisany pomyslnie');
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

benny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + benny.name +  ' zapisany pomyslnie');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

mark.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + mark.name +  ' zapisany pomyslnie');
});
