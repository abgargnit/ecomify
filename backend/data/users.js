import bcrypt from 'bcryptjs'

const user = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name: 'Abhi',
        email: 'abhi@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
    {
        name: 'Karan',
        email: 'karan@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
]

export default user;
