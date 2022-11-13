const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const category = require('../category')
const RECORDS = [
  {
    name: '早餐',
    date: '11/13/2022',
    amount: '60',
    type: '餐飲食品'
  },
  {
    name: '計程車',
    date: '11/01/2001',
    amount: '200',
    type: '交通出行'
  },
  {
    name: 'AC學費',
    date: '6/13/2022',
    amount: '60000',
    type: '其他'
  },
]
const SEED_USERS = [
  {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678',
  }
]

db.once('open', async () => {
  try {
    await Promise.all(SEED_USERS.map(async (user, user_index) => {
      const createdUser = await User.create({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10)
      })
      const categoryData = await Category.find()
      const userRecord = []
      RECORDS.map((record, user_index) => {
        record.userId = createdUser._id
        record.categoryId = categoryData.find(products => products.type === RECORDS.type)._id
        userRecord.push(record)
      })
      await Record.create(userRecord)
    }))
    console.log('Record Seeder done.')
    process.exit()
  } catch (error) { console.error(error) }
})