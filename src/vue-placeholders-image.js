/*jshint asi: true*/
/**
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
* Based entirely on the work of Josh David Miller (https://github.com/joshdmiller/angular-placeholders)
* Ported from AngularJS to Vue.js (http://vuejs.org/)
**/

module.exports = {

  bind: function() {
    this.config  = {
      text_size: 10,
      fill_color: '#EEEEEE',
      text_color: '#AAAAAA'
    }
  },
  
  update: function (value) {
    var val     = this.value ? this.value : this.key,
        el      = this.el,
        matches = val.match( /^(\d+)x(\d+)$/ ),
        dataUrl,
        size

    if(!matches) return
    
    size = { w: matches[1], h: matches[2] }
    el.setAttribute("title", val)
    el.setAttribute("alt", val)

    dataUrl = this.drawImage(val, size)

    if (el.tagName === "IMG") {
      el.setAttribute('src', dataUrl)
    } else {
      el.style.backgroundImage = 'url("' + dataUrl + '")'
    }
  },

  getTextSize: function(size) {
    var dimension_arr = [size.h, size.w].sort(),
        maxFactor     = Math.round(dimension_arr[1] / 16)
 
    return Math.max(this.config.text_size, maxFactor)
  },

  drawImage: function(val, size) {
    var canvas    = document.createElement( 'canvas' ),
        context   = canvas.getContext( '2d' ),
        text_size = this.getTextSize(size),
        config    = this.config,
        text      = val

    canvas.width = size.w
    canvas.height = size.h
    context.fillStyle = config.fill_color
    context.fillRect( 0, 0, size.w, size.h )
    context.fillStyle = config.text_color
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = 'bold '+ text_size + 'pt sans-serif'

    if (context.measureText(text).width / size.w > 1) {
      text_size = config.text_size / (context.measureText(text).width / size.w)
      context.font = 'bold ' + text_size + 'pt sans-serif'
    }

    context.fillText( text, size.w / 2, size.h / 2 )
    return canvas.toDataURL("image/png")
  }
}
