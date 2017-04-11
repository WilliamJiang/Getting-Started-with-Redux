// loads only de locale
import faker from 'faker/locale/en'

export const loadPeople = (no) => {

    faker.locale = "en"
    try {
        no = no || 10;
        let people = [];
        for (var i = 0; i < no; i++) {
            var person = {};
            person.id = faker.random.uuid()
            person.name = faker.name.findName(); // Rowan Nikolaus
            person.email = faker.internet.email();
            person.phone = faker.phone.phoneNumber();
            person.avatar = faker.image.avatar();
            person.url = faker.internet.url();
            person.desc = faker.lorem.paragraphs();

            people.push(person);
        }
        return people;

    } catch (e) {
        throw new Error('can not load people')
    }
}

export const addPerson = () => {
    faker.locale = "en";
    try {
        let person = {};

        person.id = faker.random.uuid()
        person.name = faker.name.findName(); // Rowan Nikolaus
        person.email = faker.internet.email();
        person.phone = faker.phone.phoneNumber();
        person.avatar = faker.image.avatar();
        person.url = faker.internet.url();
        person.desc = faker.lorem.paragraphs();

        return person;
    }
    catch(e) {
        throw new Error('can not add person')
    }
}

export const comments = [
    'state',
    'action',
    'reducer',
    'dispatching function',
    'action creator',
    'async action',
    'middleware',
    'store',
    'store creator',
    'store enhancer'
];
