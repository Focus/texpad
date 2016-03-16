Template.landing.events({
  'click #new-pad'(event, template) {
    Meteor.call('newPad', function(error, result) {
      //TODO: Display error message
      event.target.innerHTML = 'New TexPad'
      event.target.removeAttribute('disabled')
      if (error) {
        console.log(error)
        return
      }
      Router.go('/' +   result)
    })
    event.target.innerHTML = 'Creating Pad'
    event.target.setAttribute('disabled', 'disabled')
  }
})
