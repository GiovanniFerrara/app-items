const CommentsConfig = require('../comments')
const ItemsConfig = require('../items')
const db = require('../db')
const clearTable = require('./utils/clear-table')
const status = require('../items/types/status')
const site = require('../items/types/site')

const Item = ItemsConfig(db)
const Comment = CommentsConfig(db)

const user = {
  username: 'Gigione',
  id: '6e3b8bb2-a7b3-49c2-a80b-78dc91b88da2',
  avatar: 'https://aws.s3/avatar.jpg'
}

const exampleItem = {
  location: 'marocco',
  creatorId: user.id,
  description: 'this is a description',
  creatorName: user.username,
  createdAt: new Date().toString(),
  assets: [{ name: '3334452.jpg' }, { name: '342413.jpg' }],
  categories: [{ id: '2313', name: 'sofa' }, { id: '342413', name: 'chairs' }],
  site: site.HOMETAKE,
  localization: { lat: '32.342423', lng: '23.234234', address: 'pispisia' },
  comments: [],
  status: status.AVAILABLE
}

const exampleComment1 = {
  itemId: '',
  respondsToUserId: '',
  content: '<p> This is a cool comment </p>',
  avatar: 'https://awsbucket.com/image.jpg',
  images: [],
  previousEdits: ['<p> This is a coal comment </p>', '<p> This is a coaol comment </p>']
}

const exampleComment2 = {
  itemId: '',
  respondsToUserId: '',
  content: '<p> This is a response </p>',
  avatar: 'https://awsbucket.com/image.jpg',
  images: [],
  previousEdits: ['<p> This is a coal comment </p>', '<p> This is a coaol comment </p>']
}

let createdItem
beforeAll(async () => {
  createdItem = await Item.create(exampleItem)
  exampleComment1.itemId = createdItem.id
})

afterAll(async () => {
  await clearTable(db)
})

describe('Create a new comment', () => {
  test('should create a new comment successfully', async () => {
    const createdComment1 = await Comment.create(exampleComment1)
    const createdComment2 = await Comment.create(exampleComment2)
    expect(createdComment1).toHaveProperty('id')
    expect(createdComment2).toHaveProperty('id')
  })

  test('item should have the new comments', async () => {
    const item = await Item.getOne(createdItem.id)
    expect(item.comments).toHaveLength(2)
    expect(item.comments[1].content).toBe(exampleComment2.content)
  })
})
