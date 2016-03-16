// Renders the maths that the user entered using MathJax.
// It copies the user input to a hidden div, and compiles it there.
// This makes the transition appear smooth.
// For some reason, something screws up without the double buffer
class RenderMaths {
  constructor(pageId) {
    this.timeout = false
    this.mathsLock = false
    this.pageId = pageId
    this.hiddenBuffer = document.getElementById('hidden-buffer')
    this.hiddenMaths = document.getElementById('hidden-maths')
    this.padDisplay = document.getElementById('pad-displayarea')
    this.padTextarea = document.getElementById('pad-textarea')
  }
  render() {
    if (this.timeout) { clearTimeout(this.timeout) }
    this.timeout = setTimeout(() => {this.mathJaxHook()}, 150)
  }
  mathJaxHook() {
    if (this.mathsLock) { return }
    this.mathsLock = true
    this.hiddenBuffer.innerHTML = this.hiddenMaths.innerHTML
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'hidden-buffer'],
                      [() => {this.copyMaths()}])
  }
  copyMaths() {
    this.padDisplay.innerHTML = this.hiddenBuffer.innerHTML.replace(/\n|\r/g,'<br />')
    const padHeight = this.padDisplay.offsetHeight + 10;
    if (padHeight > 600 && padHeight > this.padTextarea.offsetHeight + 10) {
      this.padTextarea.style.height =  padHeight + 'px'
    }
    this.mathsLock = false
  }
  updateMongo(content) {
    Pads.update({_id: this.pageId},{
      $set: {content: content}
    })
  }
}

Template.mathjax.onCreated(function() {
  MathJaxHelper.config = mathJaxConfig
})

Template.padPage.onRendered(function() {
  this.renderer = new RenderMaths(this.data)
  MathJaxHelper.onMathJaxReady(() => {
    // this.renderer.render()
    this.autorun(() => {
      const pad = Pads.findOne({_id: this.data})
      const padTextArea = this.find('#pad-textarea')
      const begin = padTextArea.selectionStart
      const end = padTextArea.selectionEnd
      padTextArea.value = pad.content
      padTextArea.setSelectionRange(begin, end)
      Session.set('content', pad.content)
      this.renderer.render()
    })
  })
})

Template.padPage.events({
  'keyup #pad-textarea'(event, template) {
    template.renderer.updateMongo(event.target.value)
    template.renderer.render()
  }
})

Template.padPage.helpers({
  content() { return Session.get('content') }
})
