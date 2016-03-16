const Pads = new Mongo.Collection('pads')

Pads.allow({
  insert(userId, doc) {
    return false
  },
  update(userId, doc, fields, modifier) {
    return fields.length === 1 && fields[0] === 'content'
  },
  remove(userId, doc) {
    return false
  }
})

Meteor.methods({
  newPad() {
    return Pads.insert({
      content: '',
      created: new Date()
    })
  }
})

Meteor.publish('padById', function(padId) {
  return Pads.find({_id: padId})
})
