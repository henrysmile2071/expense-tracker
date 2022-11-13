const db = require('../../config/mongoose')
const Category = require('../category')
const CATEGORY = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen",
}

db.once('open', async () => {
  try {
    for (const [key, value] of Object.entries(CATEGORY)) {
      await Category.create({
        name: key,
        icon: value,
      })
    }
    console.log('category seeder done!')
    process.exit()
  } catch (error) { console.error(error) }
})