class RenderMaths {
  constructor (pageId) {
    this.timeout = false
    this.mathsLock = false
    this.pageId = pageId
  }
  render () {
    if(this.timeout){ clearTimeout(this.timeout) }
    this.timeout = setTimeout( () => {this.mathJaxHook()}, 150)
  }
  mathJaxHook () {
    if(this.mathsLock){ return }
    this.mathsLock = true
    document.getElementById('hidden-buffer').innerHTML = document.getElementById('hidden-maths').innerHTML
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'hidden-buffer'], [() => {this.copyMaths()}])
  }
  copyMaths () {
    document.getElementById('pad-displayarea').innerHTML = document.getElementById('hidden-buffer').innerHTML
    this.mathsLock = false
    this.updateMongo()
  }
  updateMongo (content) {
    Pads.update({_id: this.pageId},{
      '$set': {content: Session.get('hiddenMaths')}
    })
  }
}

Template.mathjax.onCreated(function () {
  MathJaxHelper.config = mathJaxConfig
})

Template.padPage.onRendered(function () {
  this.renderer = new RenderMaths(this.data._id)
  Session.set('hiddenMaths', this.data.content)
  this.find('#pad-textarea').innerHTML = this.data.content
  MathJaxHelper.onMathJaxReady(() => {
    this.renderer.render()
  })
})

Template.padPage.events({
  'keyup #pad-textarea' (event, template) {
    Session.set('hiddenMaths', event.target.value)
    template.renderer.render()
  }
})

Template.padPage.helpers({
  hiddenMaths() {
    return Session.get('hiddenMaths')
  }
})
