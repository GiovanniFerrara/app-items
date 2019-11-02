const ItemConfig = require('../items')
const db = require('../db')
const site = require('../items/types/site')
const status = require('../items/types/status')
const clearTable = require('./utils/clear-table')
const errors = require('../items/errors')

afterAll(async () => {
  await clearTable(db)
})

let createdItem

const user = {
  username: 'Gigione',
  id: '6e3b8bb2-a7b3-49c2-a80b-78dc91b88da2'
}

const validItem = {
  location: 'marocco',
  creatorId: user.id,
  creatorName: user.username,
  createdAt: new Date().toString(),
  assets: [{ id: '3334452', link: 'http://somelink.com' }, { id: '342413', link: 'http://someotherlink.com' }],
  categories: [{ id: '2313', name: 'sofa' }, { id: '342413', name: 'chairs' }],
  site: site.HOMETAKE,
  status: status.AVAILABLE
}

const Item = ItemConfig(db)

describe('Create, validate and save item into database', () => {
  test('should create and save a valid Item', async () => {
    const newItem = await Item.create(validItem)
    createdItem = newItem
    expect(newItem).toHaveProperty('id')
    expect(newItem).toHaveProperty('creatorName')
    expect(newItem).toHaveProperty('assets')
    expect(Array.isArray(newItem.categories)).toBeTruthy()
    expect(newItem.assets).toHaveLength(2)
    expect(newItem.site).toBe('HOMETAKE')
  })

  test('should return an error because of missing required categories', async () => {
    const invalidItem = { ...validItem }
    delete invalidItem.categories
    try {
      await Item.create(invalidItem)
    } catch (e) {
      expect(e.message).toEqual(errors.ValidationFailed()().message)
    }
  })

  test('should return an error because of missing required fields', async () => {
    const invalidItem = { ...validItem }
    delete invalidItem.creatorId
    delete invalidItem.assets
    try {
      await Item.create(invalidItem)
    } catch (e) {
      expect(e.errors).toHaveProperty('assets')
      expect(e.errors).toHaveProperty('creatorId')
    }
  })
})

describe('Get one item by Id', () => {
  test('should get an item with success', async () => {
    const itemFound = await Item.getOne(createdItem.id)
    expect(itemFound).toHaveProperty('creatorId')
    expect(itemFound).toHaveProperty('location')
  })
})

describe('Get all items', () => {
  test('should get all item with pagination', async () => {
    await Item.create(validItem)
    const itemsFound = await Item.getAll({})
    expect(itemsFound.items).toHaveLength(2)
  })
})

describe('Get by location and status', () => {
  test('should get all item with pagination', async () => {
    const itemsFound = await Item.getByLocationStatus({ location: validItem.location })
    expect(itemsFound.items).toHaveLength(2)
  })

  test('shouldnt get any item', async () => {
    const itemsFound = await Item.getByLocationStatus({ location: 'cina' })
    expect(itemsFound.items).toHaveLength(0)
  })
})

describe('Edit an item', () => {
  test('should edit an item with success', async () => {
    let res, editedItem
    try {
      const newItem = await Item.create(validItem)
      editedItem = { ...newItem, assets: [{ id: '22', link: 'http://otherlink.com' }, { id: '33', link: 'http://still.com' }] }
      res = await Item.edit({ item: editedItem, user: user })
    } catch (e) {
      console.log(e)
    }

    expect(res.assets).toEqual(editedItem.assets)
  })

  test('shouldnt edit an item because of missing id', async () => {
    try {
      const newItem = await Item.create(validItem)
      const editedItem = { ...newItem, id: '' }
      await Item.edit({ item: editedItem, user: user })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  test('shouldnt edit an item because another user creator', async () => {
    try {
      const newItem = await Item.create(validItem)
      const editedItem = { ...newItem }
      await Item.edit({ item: editedItem, user: { id: '6e3b8bb2-a7b3-49c2-a80b-78dc91b88da8' } })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
