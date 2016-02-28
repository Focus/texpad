// Renders the maths that the user entered using MathJax.
// It copies the user input to a hidden div, and compiles it there.
// This makes the transition appear smooth.
// For some reason, something screws up without the double buffer
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
    const buffer = document.getElementById('hidden-buffer').innerHTML
    document.getElementById('pad-displayarea').innerHTML = buffer.replace(/\n|\r/g,'<br />')
    this.mathsLock = false
  }
  updateMongo (content) {
    Pads.update({_id: this.pageId},{
      '$set': {content: content}
    })
  }
}

Template.mathjax.onCreated(function () {
  MathJaxHelper.config = mathJaxConfig
})

Template.padPage.onRendered(function () {
  this.renderer = new RenderMaths(this.data)
  MathJaxHelper.onMathJaxReady(() => {
    // this.renderer.render()
    this.autorun(() => {
      pad = Pads.findOne({_id: this.data})
      this.find('#pad-textarea').value = pad.content
      Session.set('content', pad.content)
      this.renderer.render()
    })
  })
})

Template.padPage.events({
  'keyup #pad-textarea' (event, template) {
    template.renderer.updateMongo(event.target.value)
    template.renderer.render()
  }
})

Template.padPage.helpers({
  content () { return Session.get('content') }
})
