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
  description: 'this is a description',
  creatorName: user.username,
  createdAt: new Date().toString(),
  assets: [{ name: '3334452.jpg' }, { name: '342413.jpg' }],
  categories: [{ id: '2313', name: 'sofa' }, { id: '342413', name: 'chairs' }],
  site: site.HOMETAKE,
  localization: { lat: '32.342423', lng: '23.234234', address: 'pispisia' },
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
    expect(newItem).toHaveProperty('location')
    expect(newItem).toHaveProperty('description')
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
      expect(e.message).toEqual(errors.ValidationFailed().message)
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

  test('should return an error because of invalid assets, missing name', async () => {
    const invalidItem = { ...validItem, assets: [{ name: '3334452.jpg' }, {}] }
    try {
      await Item.create(invalidItem)
    } catch (e) {
      expect(e.errors).toHaveProperty('assets')
    }
  })

  test('should return an error because of invalid category, missing name', async () => {
    const invalidItem = { ...validItem, categories: [{ id: '6e3b8bb2-a7b3-49c2-a80b-78dc91b88de3' }, { name: 'bed', id: '6e3b8bb2-a7b3-49c2-a80b-78dc91b88da2' }] }
    try {
      await Item.create(invalidItem)
    } catch (e) {
      expect(e.errors).toHaveProperty('categories')
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
      // try to change status as well, but should not change it
      editedItem = { ...newItem, status: status.UNAVAILABLE, description: 'Item changed', assets: [{ name: '22' }, { name: '33' }] }
      res = await Item.edit({ item: editedItem, user: user })
    } catch (e) {
      console.log(e)
    }
    expect(res.assets).toEqual(editedItem.assets)
    expect(res.description).toBe('Item changed')
    expect(res.status).toEqual(status.AVAILABLE)
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
