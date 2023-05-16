const express = require('express');
const app = express();
const {Sequelize, DataTypes} = require('sequelize');

const NAMES = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "William",
    "Sophia",
    "Mason",
    "Isabella",
    "James",
    "Mia",
    "Benjamin",
    "Charlotte",
    "Jacob",
    "Amelia",
    "Michael",
    "Evelyn",
    "Elijah",
    "Abigail",
    "Ethan",
    "Harper",
    "Alexander",
    "Emily",
    "Oliver",
    "Elizabeth",
    "Daniel",
    "Avery",
    "Lucas",
    "Sofia",
    "Matthew",
    "Ella",
    "Aiden",
    "Madison",
    "Jackson",
    "Scarlett",
    "Logan",
    "Victoria",
    "David",
    "Aria",
    "Joseph",
    "Grace",
    "Samuel",
    "Chloe",
    "Henry",
    "Camila",
    "Owen",
    "Penelope",
    "Sebastian",
    "Riley",
    "Gabriel",
    "Luna",
    "Carter",
    "Layla",
    "Jayden",
    "Aurora",
    "John",
    "Zoey",
    "Luke",
    "Nora",
    "Anthony",
    "Hazel",
    "Isaac",
    "Ellie",
    "Dylan",
    "Stella",
    "Wyatt",
    "Paisley",
    "Andrew",
    "Audrey",
    "Joshua",
    "Skylar",
    "Christopher",
    "Violet",
    "Grayson",
    "Claire",
    "Julian",
    "Bella",
    "Mateo",
    "Aaliyah",
    "Leo",
    "Lucy",
    "Lincoln",
    "Anna",
    "Ryan",
    "Savannah",
    "Jaxon",
    "Maya",
    "Nathan",
    "Leah",
    "Aaron",
    "Serenity",
    "Isaiah",
    "Elena",
    "Thomas",
    "Gabriella",
    "Charles",
    "Isabelle",
    "Caleb",
    "Nova",
    "Josiah",
    "Emilia",
    "Christian",
    "Valentina",
    "Hunter",
    "Everly",
    ];

const sequelize = new Sequelize("maindb", "root", "rootpass", {
    host: "database",
    dialect: "mysql",
    port: 3306,

    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 1000
    }
});

const People = sequelize.define('People', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

People.sync({force: true});

app.get('/', async (req, res) => {
    await People.create({name: NAMES[Math.floor(Math.random() * NAMES.length)]});
    const peopleList = await People.findAll();

    let response = `
        <h1>Full Cycle Rocks!</h1>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (peopleList.length > 0) {
        for (let people of peopleList) {
            response += `<tr><td>${people.name}</td></tr>`;
        }
    }

    response += `
            </tbody>
        </table>`;

    res.send(response);
})

app.listen(5000, () => console.log('Server is up and running'));