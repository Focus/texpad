Pads = new Mongo.Collection('pads')

Router.route('/', function () {
  this.render('landing')
})

Router.route('/:_id', {
  loadingTemplate: 'loading',
  waitOn () {
    return Meteor.subscribe('padById', this.params._id)
  },
  data () {
    return Pads.findOne({_id: this.params._id})
  },
  action () {
    this.render('padPage')
  }
})
