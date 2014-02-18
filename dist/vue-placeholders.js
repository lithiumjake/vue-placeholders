(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
* which is itself based, in part, on https://github.com/fkadeveloper/loremjs
* Ported from AngularJS to Vue.js (http://vuejs.org/)
**/

Vue.directive('phimg', require('./vue-placeholders-image'))
Vue.directive('phtxt', require('./vue-placeholders-text'))

},{"./vue-placeholders-image":2,"./vue-placeholders-text":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
* which is itself based, in part, on https://github.com/fkadeveloper/loremjs
* Ported from AngularJS to Vue.js (http://vuejs.org/)
**/

module.exports = {

  update: function(value) {
 
    var val      = this.value ? this.value : this.key,
        el       = this.el,
        numSentences,
        numParagraphs,
        p_match,
        s_match

    p_match = val.match( /(\d+)p/ )
    s_match = val.match( /(\d+)s/ )

    if ( p_match !== null) {
      numParagraphs = parseInt( p_match[1], 10 )
    } else {
      numParagraphs = false;
    }

    if ( s_match !== null ) {
      numSentences = parseInt( s_match[1], 10 )
    } else {
      numSentences = false;
    }

    this.populate(numParagraphs, numSentences, el)
  },

  populate: function(numParagraphs, numSentences, el) {
    var contents

    if ( numParagraphs || !numSentences ) {
      contents = this.createParagraphs( numParagraphs, numSentences )
    } else {
      contents = this.createSentences( numSentences )
    }
    
    el.innerHTML =  contents 
  },

  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  createSentence: function (sentenceLength) {
    var wordIndex,
        sentence
         
    sentenceLength = sentenceLength || this.randomInt( 5, 20 )
    wordIndex = this.randomInt(0, this.words.length - sentenceLength - 1)
    sentence = this.words.slice(wordIndex, wordIndex + sentenceLength)
      .join(' ')
      .replace(/\,$/g, '') + '.'
 
    return sentence.charAt(0).toUpperCase() + sentence.slice(1)
  },

  createSentences: function(numSentences) {
    var sentences = []

    numSentences = numSentences || this.randomInt( 3, 7 )
   
    for (var i = 0; i < numSentences; i++ ) {
      sentences.push(this.createSentence())
    }

    return sentences.join(' ')
  },

  createParagraph: function(numSentences) {
    var sentences = this.createSentences( numSentences )
    return "<p>" + sentences + "</p>"
  },

  createParagraphs: function (numParagraphs, numSentences) {
    var paragraphs = [],
        randomInt  = this.randomInt

    numParagraphs = numParagraphs || randomInt( 3, 7 )
    for (var i = 0; i < numParagraphs; i++ ) {
      paragraphs.push( this.createParagraph( numSentences ) )
    }
    
    return paragraphs.join('\n')
  },
 
  words: ["lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing",
    "elit", "ut", "aliquam,", "purus", "sit", "amet", "luctus", "venenatis,",
    "lectus", "magna", "fringilla", "urna,", "porttitor", "rhoncus", "dolor",
    "purus", "non", "enim", "praesent", "elementum", "facilisis", "leo,", "vel",
    "fringilla", "est", "ullamcorper", "eget", "nulla", "facilisi", "etiam",
    "dignissim", "diam", "quis", "enim", "lobortis", "scelerisque", "fermentum",
    "dui", "faucibus", "in", "ornare", "quam", "viverra", "orci", "sagittis", "eu",
    "volutpat", "odio", "facilisis", "mauris", "sit", "amet", "massa", "vitae",
    "tortor", "condimentum", "lacinia", "quis", "vel", "eros", "donec", "ac",
    "odio", "tempor", "orci", "dapibus", "ultrices", "in", "iaculis", "nunc",
    "sed", "augue", "lacus,", "viverra", "vitae", "congue", "eu,", "consequat",
    "ac", "felis", "donec", "et", "odio", "pellentesque", "diam", "volutpat",
    "commodo", "sed", "egestas", "egestas", "fringilla", "phasellus", "faucibus",
    "scelerisque", "eleifend", "donec", "pretium", "vulputate", "sapien", "nec",
    "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae", "elementum",
    "curabitur", "vitae", "nunc", "sed", "velit", "dignissim", "sodales", "ut",
    "eu", "sem", "integer", "vitae", "justo", "eget", "magna", "fermentum",
    "iaculis", "eu", "non", "diam", "phasellus", "vestibulum", "lorem", "sed",
    "risus", "ultricies", "tristique", "nulla", "aliquet", "enim", "tortor,", "at",
    "auctor", "urna", "nunc", "id", "cursus", "metus", "aliquam", "eleifend", "mi",
    "in", "nulla", "posuere", "sollicitudin", "aliquam", "ultrices", "sagittis",
    "orci,", "a", "scelerisque", "purus", "semper", "eget", "duis", "at", "tellus",
    "at", "urna", "condimentum", "mattis", "pellentesque", "id", "nibh", "tortor,",
    "id", "aliquet", "lectus", "proin", "nibh", "nisl,", "condimentum", "id",
    "venenatis", "a,", "condimentum", "vitae", "sapien", "pellentesque",
    "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada",
    "fames", "ac", "turpis", "egestas", "sed", "tempus,", "urna", "et", "pharetra",
    "pharetra,", "massa", "massa", "ultricies", "mi,", "quis", "hendrerit",
    "dolor", "magna", "eget", "est", "lorem", "ipsum", "dolor", "sit", "amet,",
    "consectetur", "adipiscing", "elit", "pellentesque", "habitant", "morbi",
    "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac",
    "turpis", "egestas", "integer", "eget", "aliquet", "nibh", "praesent",
    "tristique", "magna", "sit", "amet", "purus", "gravida", "quis", "blandit",
    "turpis", "cursus", "in", "hac", "habitasse", "platea", "dictumst", "quisque",
    "sagittis,", "purus", "sit", "amet", "volutpat", "consequat,", "mauris",
    "nunc", "congue", "nisi,", "vitae", "suscipit", "tellus", "mauris", "a",
    "diam", "maecenas", "sed", "enim", "ut", "sem", "viverra", "aliquet", "eget",
    "sit", "amet", "tellus", "cras", "adipiscing", "enim", "eu", "turpis",
    "egestas", "pretium", "aenean", "pharetra,", "magna", "ac", "placerat",
    "vestibulum,", "lectus", "mauris", "ultrices", "eros,", "in", "cursus",
    "turpis", "massa", "tincidunt", "dui", "ut", "ornare", "lectus", "sit", "amet",
    "est", "placerat", "in", "egestas", "erat", "imperdiet", "sed", "euismod",
    "nisi", "porta", "lorem", "mollis", "aliquam", "ut", "porttitor", "leo", "a",
    "diam", "sollicitudin", "tempor", "id", "eu", "nisl", "nunc", "mi", "ipsum,",
    "faucibus", "vitae", "aliquet", "nec,", "ullamcorper", "sit", "amet", "risus",
    "nullam", "eget", "felis", "eget", "nunc", "lobortis", "mattis", "aliquam",
    "faucibus", "purus", "in", "massa", "tempor", "nec", "feugiat", "nisl",
    "pretium", "fusce", "id", "velit", "ut", "tortor", "pretium", "viverra",
    "suspendisse", "potenti", "nullam", "ac", "tortor", "vitae", "purus",
    "faucibus", "ornare", "suspendisse", "sed", "nisi", "lacus,", "sed", "viverra",
    "tellus", "in", "hac", "habitasse", "platea", "dictumst", "vestibulum",
    "rhoncus", "est", "pellentesque", "elit", "ullamcorper", "dignissim", "cras",
    "tincidunt", "lobortis", "feugiat", "vivamus", "at", "augue", "eget", "arcu",
    "dictum", "varius", "duis", "at", "consectetur", "lorem", "donec", "massa",
    "sapien,", "faucibus", "et", "molestie", "ac,", "feugiat", "sed", "lectus",
    "vestibulum", "mattis", "ullamcorper", "velit", "sed", "ullamcorper", "morbi",
    "tincidunt", "ornare", "massa,", "eget", "egestas", "purus", "viverra",
    "accumsan", "in", "nisl", "nisi,", "scelerisque", "eu", "ultrices", "vitae,",
    "auctor", "eu", "augue", "ut", "lectus", "arcu,", "bibendum", "at", "varius",
    "vel,", "pharetra", "vel", "turpis", "nunc", "eget", "lorem", "dolor,", "sed",
    "viverra", "ipsum", "nunc", "aliquet", "bibendum", "enim,", "facilisis",
    "gravida", "neque", "convallis", "a", "cras", "semper", "auctor", "neque,",
    "vitae", "tempus", "quam", "pellentesque", "nec", "nam", "aliquam", "sem",
    "et", "tortor", "consequat", "id", "porta", "nibh", "venenatis", "cras", "sed",
    "felis", "eget", "velit", "aliquet", "sagittis", "id", "consectetur", "purus",
    "ut", "faucibus", "pulvinar", "elementum", "integer", "enim", "neque,",
    "volutpat", "ac", "tincidunt", "vitae,", "semper", "quis", "lectus", "nulla",
    "at", "volutpat", "diam", "ut", "venenatis", "tellus", "in", "metus",
    "vulputate", "eu", "scelerisque", "felis", "imperdiet", "proin", "fermentum",
    "leo", "vel", "orci", "porta", "non", "pulvinar", "neque", "laoreet",
    "suspendisse", "interdum", "consectetur", "libero,", "id", "faucibus", "nisl",
    "tincidunt", "eget", "nullam", "non", "nisi", "est,", "sit", "amet",
    "facilisis", "magna", "etiam", "tempor,", "orci", "eu", "lobortis",
    "elementum,", "nibh", "tellus", "molestie", "nunc,", "non", "blandit", "massa",
    "enim", "nec", "dui", "nunc", "mattis", "enim", "ut", "tellus", "elementum",
    "sagittis", "vitae", "et", "leo", "duis", "ut", "diam", "quam", "nulla",
    "porttitor", "massa", "id", "neque", "aliquam", "vestibulum", "morbi",
    "blandit", "cursus", "risus,", "at", "ultrices", "mi", "tempus", "imperdiet",
    "nulla", "malesuada", "pellentesque", "elit", "eget", "gravida", "cum",
    "sociis", "natoque", "penatibus", "et", "magnis", "dis", "parturient",
    "montes,", "nascetur", "ridiculus", "mus", "mauris", "vitae", "ultricies",
    "leo", "integer", "malesuada", "nunc", "vel", "risus", "commodo", "viverra",
    "maecenas", "accumsan,", "lacus", "vel", "facilisis", "volutpat,", "est",
    "velit", "egestas", "dui,", "id", "ornare", "arcu", "odio", "ut", "sem",
    "nulla", "pharetra", "diam", "sit", "amet", "nisl", "suscipit", "adipiscing",
    "bibendum", "est", "ultricies", "integer", "quis", "auctor", "elit", "sed",
    "vulputate", "mi", "sit", "amet", "mauris", "commodo", "quis", "imperdiet",
    "massa", "tincidunt", "nunc", "pulvinar", "sapien", "et", "ligula",
    "ullamcorper", "malesuada", "proin", "libero", "nunc,", "consequat",
    "interdum", "varius", "sit", "amet,", "mattis", "vulputate", "enim", "nulla",
    "aliquet", "porttitor", "lacus,", "luctus", "accumsan", "tortor", "posuere",
    "ac", "ut", "consequat", "semper", "viverra", "nam", "libero", "justo,",
    "laoreet", "sit", "amet", "cursus", "sit", "amet,", "dictum", "sit", "amet",
    "justo", "donec", "enim", "diam,", "vulputate", "ut", "pharetra", "sit",
    "amet,", "aliquam", "id", "diam", "maecenas", "ultricies", "mi", "eget",
    "mauris", "pharetra", "et", "ultrices", "neque", "ornare", "aenean", "euismod",
    "elementum", "nisi,", "quis", "eleifend", "quam", "adipiscing", "vitae",
    "proin", "sagittis,", "nisl", "rhoncus", "mattis", "rhoncus,", "urna", "neque",
    "viverra", "justo,", "nec", "ultrices", "dui", "sapien", "eget", "mi", "proin",
    "sed", "libero", "enim,", "sed", "faucibus", "turpis", "in", "eu", "mi",
    "bibendum", "neque", "egestas", "congue", "quisque", "egestas", "diam", "in",
    "arcu", "cursus", "euismod", "quis", "viverra", "nibh", "cras", "pulvinar",
    "mattis", "nunc,", "sed", "blandit", "libero", "volutpat", "sed", "cras",
    "ornare", "arcu", "dui", "vivamus", "arcu", "felis,", "bibendum", "ut",
    "tristique", "et,", "egestas", "quis", "ipsum", "suspendisse", "ultrices",
    "fusce", "ut", "placerat", "orci", "nulla", "pellentesque",
    "dignissim", "enim,", "sit", "amet", "venenatis", "urna", "cursus", "eget",
    "nunc", "scelerisque", "viverra", "mauris,", "in", "aliquam", "sem",
    "fringilla", "ut", "morbi", "tincidunt", "augue", "interdum", "velit",
    "euismod", "in", "pellentesque", "massa", "placerat", "duis", "ultricies",
    "lacus", "sed", "turpis", "tincidunt", "id", "aliquet", "risus", "feugiat",
    "in", "ante", "metus,", "dictum", "at", "tempor", "commodo,", "ullamcorper",
    "a", "lacus", "vestibulum", "sed", "arcu", "non", "odio", "euismod", "lacinia",
    "at", "quis", "risus", "sed", "vulputate", "odio", "ut", "enim", "blandit",
    "volutpat", "maecenas", "volutpat", "blandit", "aliquam", "etiam", "erat",
    "velit,", "scelerisque", "in", "dictum", "non,", "consectetur", "a", "erat",
    "nam", "at", "lectus", "urna", "duis", "convallis", "convallis", "tellus,",
    "id", "interdum", "velit", "laoreet", "id", "donec", "ultrices", "tincidunt",
    "arcu,", "non", "sodales", "neque", "sodales", "ut", "etiam", "sit", "amet",
    "nisl", "purus,", "in", "mollis", "nunc", "sed", "id", "semper", "risus", "in",
    "hendrerit", "gravida", "rutrum", "quisque", "non", "tellus", "orci,", "ac",
    "auctor", "augue", "mauris", "augue", "neque,", "gravida", "in", "fermentum",
    "et,", "sollicitudin", "ac", "orci", "phasellus", "egestas", "tellus",
    "rutrum", "tellus", "pellentesque", "eu", "tincidunt", "tortor", "aliquam",
    "nulla", "facilisi", "cras", "fermentum,", "odio", "eu", "feugiat", "pretium,",
    "nibh", "ipsum", "consequat", "nisl,", "vel", "pretium", "lectus", "quam",
    "id", "leo", "in", "vitae", "turpis", "massa", "sed", "elementum", "tempus",
    "egestas", "sed", "sed", "risus", "pretium", "quam", "vulputate", "dignissim",
    "suspendisse", "in", "est", "ante", "in", "nibh", "mauris,", "cursus",
    "mattis", "molestie", "a,", "iaculis", "at", "erat", "pellentesque",
    "adipiscing", "commodo", "elit,", "at", "imperdiet", "dui", "accumsan", "sit",
    "amet", "nulla", "facilisi", "morbi", "tempus", "iaculis", "urna,", "id",
    "volutpat", "lacus", "laoreet", "non", "curabitur", "gravida", "arcu", "ac",
    "tortor", "dignissim", "convallis", "aenean", "et", "tortor", "at", "risus",
    "viverra", "adipiscing", "at", "in", "tellus", "integer", "feugiat",
    "scelerisque", "varius", "morbi", "enim", "nunc,", "faucibus", "a",
    "pellentesque", "sit", "amet,", "porttitor", "eget", "dolor", "morbi", "non",
    "arcu", "risus,", "quis", "varius", "quam", "quisque", "id", "diam", "vel",
    "quam", "elementum", "pulvinar", "etiam", "non", "quam", "lacus",
    "suspendisse", "faucibus", "interdum", "posuere", "lorem", "ipsum", "dolor",
    "sit", "amet,", "consectetur", "adipiscing", "elit", "duis", "tristique",
    "sollicitudin", "nibh", "sit", "amet", "commodo", "nulla", "facilisi",
    "nullam", "vehicula", "ipsum", "a", "arcu", "cursus", "vitae", "congue",
    "mauris", "rhoncus", "aenean", "vel", "elit", "scelerisque", "mauris",
    "pellentesque", "pulvinar", "pellentesque", "habitant", "morbi", "tristique",
    "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis",
    "egestas", "maecenas", "pharetra", "convallis", "posuere", "morbi", "leo",
    "urna,", "molestie", "at", "elementum", "eu,", "facilisis", "sed", "odio",
    "morbi", "quis", "commodo", "odio", "aenean", "sed", "adipiscing", "diam",
    "donec", "adipiscing", "tristique", "risus", "nec", "feugiat", "in",
    "fermentum", "posuere", "urna", "nec", "tincidunt", "praesent", "semper",
    "feugiat", "nibh", "sed", "pulvinar", "proin", "gravida", "hendrerit",
    "lectus", "a", "molestie", "gravida", "dictum"
  ]
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9qYWtlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qYWtlL2NvZGUvdnVlLXBsYWNlaG9sZGVycy9zcmMvaW5kZXguanMiLCIvaG9tZS9qYWtlL2NvZGUvdnVlLXBsYWNlaG9sZGVycy9zcmMvdnVlLXBsYWNlaG9sZGVycy1pbWFnZS5qcyIsIi9ob21lL2pha2UvY29kZS92dWUtcGxhY2Vob2xkZXJzL3NyYy92dWUtcGxhY2Vob2xkZXJzLXRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuLyoqXG4qIEJhc2VkIGVudGlyZWx5IG9uIHRoZSB3b3JrIG9mIEpvc2ggRGF2aWQgTWlsbGVyIChodHRwczovL2dpdGh1Yi5jb20vam9zaGRtaWxsZXIvYW5ndWxhci1wbGFjZWhvbGRlcnMpXG4qIHdoaWNoIGlzIGl0c2VsZiBiYXNlZCwgaW4gcGFydCwgb24gaHR0cHM6Ly9naXRodWIuY29tL2ZrYWRldmVsb3Blci9sb3JlbWpzXG4qIFBvcnRlZCBmcm9tIEFuZ3VsYXJKUyB0byBWdWUuanMgKGh0dHA6Ly92dWVqcy5vcmcvKVxuKiovXG5cblZ1ZS5kaXJlY3RpdmUoJ3BoaW1nJywgcmVxdWlyZSgnLi92dWUtcGxhY2Vob2xkZXJzLWltYWdlJykpXG5WdWUuZGlyZWN0aXZlKCdwaHR4dCcsIHJlcXVpcmUoJy4vdnVlLXBsYWNlaG9sZGVycy10ZXh0JykpXG4iLCIvKmpzaGludCBhc2k6IHRydWUqL1xuLyoqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuKiBCYXNlZCBlbnRpcmVseSBvbiB0aGUgd29yayBvZiBKb3NoIERhdmlkIE1pbGxlciAoaHR0cHM6Ly9naXRodWIuY29tL2pvc2hkbWlsbGVyL2FuZ3VsYXItcGxhY2Vob2xkZXJzKVxuKiBQb3J0ZWQgZnJvbSBBbmd1bGFySlMgdG8gVnVlLmpzIChodHRwOi8vdnVlanMub3JnLylcbioqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBiaW5kOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbmZpZyAgPSB7XG4gICAgICB0ZXh0X3NpemU6IDEwLFxuICAgICAgZmlsbF9jb2xvcjogJyNFRUVFRUUnLFxuICAgICAgdGV4dF9jb2xvcjogJyNBQUFBQUEnXG4gICAgfVxuICB9LFxuICBcbiAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgdmFsICAgICA9IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlIDogdGhpcy5rZXksXG4gICAgICAgIGVsICAgICAgPSB0aGlzLmVsLFxuICAgICAgICBtYXRjaGVzID0gdmFsLm1hdGNoKCAvXihcXGQrKXgoXFxkKykkLyApLFxuICAgICAgICBkYXRhVXJsLFxuICAgICAgICBzaXplXG5cbiAgICBpZighbWF0Y2hlcykgcmV0dXJuXG4gICAgXG4gICAgc2l6ZSA9IHsgdzogbWF0Y2hlc1sxXSwgaDogbWF0Y2hlc1syXSB9XG4gICAgZWwuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgdmFsKVxuICAgIGVsLnNldEF0dHJpYnV0ZShcImFsdFwiLCB2YWwpXG5cbiAgICBkYXRhVXJsID0gdGhpcy5kcmF3SW1hZ2UodmFsLCBzaXplKVxuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnc3JjJywgZGF0YVVybClcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIicgKyBkYXRhVXJsICsgJ1wiKSdcbiAgICB9XG4gIH0sXG5cbiAgZ2V0VGV4dFNpemU6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICB2YXIgZGltZW5zaW9uX2FyciA9IFtzaXplLmgsIHNpemUud10uc29ydCgpLFxuICAgICAgICBtYXhGYWN0b3IgICAgID0gTWF0aC5yb3VuZChkaW1lbnNpb25fYXJyWzFdIC8gMTYpXG4gXG4gICAgcmV0dXJuIE1hdGgubWF4KHRoaXMuY29uZmlnLnRleHRfc2l6ZSwgbWF4RmFjdG9yKVxuICB9LFxuXG4gIGRyYXdJbWFnZTogZnVuY3Rpb24odmFsLCBzaXplKSB7XG4gICAgdmFyIGNhbnZhcyAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICksXG4gICAgICAgIGNvbnRleHQgICA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICksXG4gICAgICAgIHRleHRfc2l6ZSA9IHRoaXMuZ2V0VGV4dFNpemUoc2l6ZSksXG4gICAgICAgIGNvbmZpZyAgICA9IHRoaXMuY29uZmlnLFxuICAgICAgICB0ZXh0ICAgICAgPSB2YWxcblxuICAgIGNhbnZhcy53aWR0aCA9IHNpemUud1xuICAgIGNhbnZhcy5oZWlnaHQgPSBzaXplLmhcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbmZpZy5maWxsX2NvbG9yXG4gICAgY29udGV4dC5maWxsUmVjdCggMCwgMCwgc2l6ZS53LCBzaXplLmggKVxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29uZmlnLnRleHRfY29sb3JcbiAgICBjb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJ1xuICAgIGNvbnRleHQuZm9udCA9ICdib2xkICcrIHRleHRfc2l6ZSArICdwdCBzYW5zLXNlcmlmJ1xuXG4gICAgaWYgKGNvbnRleHQubWVhc3VyZVRleHQodGV4dCkud2lkdGggLyBzaXplLncgPiAxKSB7XG4gICAgICB0ZXh0X3NpemUgPSBjb25maWcudGV4dF9zaXplIC8gKGNvbnRleHQubWVhc3VyZVRleHQodGV4dCkud2lkdGggLyBzaXplLncpXG4gICAgICBjb250ZXh0LmZvbnQgPSAnYm9sZCAnICsgdGV4dF9zaXplICsgJ3B0IHNhbnMtc2VyaWYnXG4gICAgfVxuXG4gICAgY29udGV4dC5maWxsVGV4dCggdGV4dCwgc2l6ZS53IC8gMiwgc2l6ZS5oIC8gMiApXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIilcbiAgfVxufVxuIiwiLyoqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuKiBCYXNlZCBlbnRpcmVseSBvbiB0aGUgd29yayBvZiBKb3NoIERhdmlkIE1pbGxlciAoaHR0cHM6Ly9naXRodWIuY29tL2pvc2hkbWlsbGVyL2FuZ3VsYXItcGxhY2Vob2xkZXJzKVxuKiB3aGljaCBpcyBpdHNlbGYgYmFzZWQsIGluIHBhcnQsIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9ma2FkZXZlbG9wZXIvbG9yZW1qc1xuKiBQb3J0ZWQgZnJvbSBBbmd1bGFySlMgdG8gVnVlLmpzIChodHRwOi8vdnVlanMub3JnLylcbioqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICB1cGRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXG4gICAgdmFyIHZhbCAgICAgID0gdGhpcy52YWx1ZSA/IHRoaXMudmFsdWUgOiB0aGlzLmtleSxcbiAgICAgICAgZWwgICAgICAgPSB0aGlzLmVsLFxuICAgICAgICBudW1TZW50ZW5jZXMsXG4gICAgICAgIG51bVBhcmFncmFwaHMsXG4gICAgICAgIHBfbWF0Y2gsXG4gICAgICAgIHNfbWF0Y2hcblxuICAgIHBfbWF0Y2ggPSB2YWwubWF0Y2goIC8oXFxkKylwLyApXG4gICAgc19tYXRjaCA9IHZhbC5tYXRjaCggLyhcXGQrKXMvIClcblxuICAgIGlmICggcF9tYXRjaCAhPT0gbnVsbCkge1xuICAgICAgbnVtUGFyYWdyYXBocyA9IHBhcnNlSW50KCBwX21hdGNoWzFdLCAxMCApXG4gICAgfSBlbHNlIHtcbiAgICAgIG51bVBhcmFncmFwaHMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIHNfbWF0Y2ggIT09IG51bGwgKSB7XG4gICAgICBudW1TZW50ZW5jZXMgPSBwYXJzZUludCggc19tYXRjaFsxXSwgMTAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBudW1TZW50ZW5jZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcHVsYXRlKG51bVBhcmFncmFwaHMsIG51bVNlbnRlbmNlcywgZWwpXG4gIH0sXG5cbiAgcG9wdWxhdGU6IGZ1bmN0aW9uKG51bVBhcmFncmFwaHMsIG51bVNlbnRlbmNlcywgZWwpIHtcbiAgICB2YXIgY29udGVudHNcblxuICAgIGlmICggbnVtUGFyYWdyYXBocyB8fCAhbnVtU2VudGVuY2VzICkge1xuICAgICAgY29udGVudHMgPSB0aGlzLmNyZWF0ZVBhcmFncmFwaHMoIG51bVBhcmFncmFwaHMsIG51bVNlbnRlbmNlcyApXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnRzID0gdGhpcy5jcmVhdGVTZW50ZW5jZXMoIG51bVNlbnRlbmNlcyApXG4gICAgfVxuICAgIFxuICAgIGVsLmlubmVySFRNTCA9ICBjb250ZW50cyBcbiAgfSxcblxuICByYW5kb21JbnQ6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5cbiAgfSxcblxuICBjcmVhdGVTZW50ZW5jZTogZnVuY3Rpb24gKHNlbnRlbmNlTGVuZ3RoKSB7XG4gICAgdmFyIHdvcmRJbmRleCxcbiAgICAgICAgc2VudGVuY2VcbiAgICAgICAgIFxuICAgIHNlbnRlbmNlTGVuZ3RoID0gc2VudGVuY2VMZW5ndGggfHwgdGhpcy5yYW5kb21JbnQoIDUsIDIwIClcbiAgICB3b3JkSW5kZXggPSB0aGlzLnJhbmRvbUludCgwLCB0aGlzLndvcmRzLmxlbmd0aCAtIHNlbnRlbmNlTGVuZ3RoIC0gMSlcbiAgICBzZW50ZW5jZSA9IHRoaXMud29yZHMuc2xpY2Uod29yZEluZGV4LCB3b3JkSW5kZXggKyBzZW50ZW5jZUxlbmd0aClcbiAgICAgIC5qb2luKCcgJylcbiAgICAgIC5yZXBsYWNlKC9cXCwkL2csICcnKSArICcuJ1xuIFxuICAgIHJldHVybiBzZW50ZW5jZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHNlbnRlbmNlLnNsaWNlKDEpXG4gIH0sXG5cbiAgY3JlYXRlU2VudGVuY2VzOiBmdW5jdGlvbihudW1TZW50ZW5jZXMpIHtcbiAgICB2YXIgc2VudGVuY2VzID0gW11cblxuICAgIG51bVNlbnRlbmNlcyA9IG51bVNlbnRlbmNlcyB8fCB0aGlzLnJhbmRvbUludCggMywgNyApXG4gICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVNlbnRlbmNlczsgaSsrICkge1xuICAgICAgc2VudGVuY2VzLnB1c2godGhpcy5jcmVhdGVTZW50ZW5jZSgpKVxuICAgIH1cblxuICAgIHJldHVybiBzZW50ZW5jZXMuam9pbignICcpXG4gIH0sXG5cbiAgY3JlYXRlUGFyYWdyYXBoOiBmdW5jdGlvbihudW1TZW50ZW5jZXMpIHtcbiAgICB2YXIgc2VudGVuY2VzID0gdGhpcy5jcmVhdGVTZW50ZW5jZXMoIG51bVNlbnRlbmNlcyApXG4gICAgcmV0dXJuIFwiPHA+XCIgKyBzZW50ZW5jZXMgKyBcIjwvcD5cIlxuICB9LFxuXG4gIGNyZWF0ZVBhcmFncmFwaHM6IGZ1bmN0aW9uIChudW1QYXJhZ3JhcGhzLCBudW1TZW50ZW5jZXMpIHtcbiAgICB2YXIgcGFyYWdyYXBocyA9IFtdLFxuICAgICAgICByYW5kb21JbnQgID0gdGhpcy5yYW5kb21JbnRcblxuICAgIG51bVBhcmFncmFwaHMgPSBudW1QYXJhZ3JhcGhzIHx8IHJhbmRvbUludCggMywgNyApXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1QYXJhZ3JhcGhzOyBpKysgKSB7XG4gICAgICBwYXJhZ3JhcGhzLnB1c2goIHRoaXMuY3JlYXRlUGFyYWdyYXBoKCBudW1TZW50ZW5jZXMgKSApXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBwYXJhZ3JhcGhzLmpvaW4oJ1xcbicpXG4gIH0sXG4gXG4gIHdvcmRzOiBbXCJsb3JlbVwiLCBcImlwc3VtXCIsIFwiZG9sb3JcIiwgXCJzaXRcIiwgXCJhbWV0LFwiLCBcImNvbnNlY3RldHVyXCIsIFwiYWRpcGlzY2luZ1wiLFxuICAgIFwiZWxpdFwiLCBcInV0XCIsIFwiYWxpcXVhbSxcIiwgXCJwdXJ1c1wiLCBcInNpdFwiLCBcImFtZXRcIiwgXCJsdWN0dXNcIiwgXCJ2ZW5lbmF0aXMsXCIsXG4gICAgXCJsZWN0dXNcIiwgXCJtYWduYVwiLCBcImZyaW5naWxsYVwiLCBcInVybmEsXCIsIFwicG9ydHRpdG9yXCIsIFwicmhvbmN1c1wiLCBcImRvbG9yXCIsXG4gICAgXCJwdXJ1c1wiLCBcIm5vblwiLCBcImVuaW1cIiwgXCJwcmFlc2VudFwiLCBcImVsZW1lbnR1bVwiLCBcImZhY2lsaXNpc1wiLCBcImxlbyxcIiwgXCJ2ZWxcIixcbiAgICBcImZyaW5naWxsYVwiLCBcImVzdFwiLCBcInVsbGFtY29ycGVyXCIsIFwiZWdldFwiLCBcIm51bGxhXCIsIFwiZmFjaWxpc2lcIiwgXCJldGlhbVwiLFxuICAgIFwiZGlnbmlzc2ltXCIsIFwiZGlhbVwiLCBcInF1aXNcIiwgXCJlbmltXCIsIFwibG9ib3J0aXNcIiwgXCJzY2VsZXJpc3F1ZVwiLCBcImZlcm1lbnR1bVwiLFxuICAgIFwiZHVpXCIsIFwiZmF1Y2lidXNcIiwgXCJpblwiLCBcIm9ybmFyZVwiLCBcInF1YW1cIiwgXCJ2aXZlcnJhXCIsIFwib3JjaVwiLCBcInNhZ2l0dGlzXCIsIFwiZXVcIixcbiAgICBcInZvbHV0cGF0XCIsIFwib2Rpb1wiLCBcImZhY2lsaXNpc1wiLCBcIm1hdXJpc1wiLCBcInNpdFwiLCBcImFtZXRcIiwgXCJtYXNzYVwiLCBcInZpdGFlXCIsXG4gICAgXCJ0b3J0b3JcIiwgXCJjb25kaW1lbnR1bVwiLCBcImxhY2luaWFcIiwgXCJxdWlzXCIsIFwidmVsXCIsIFwiZXJvc1wiLCBcImRvbmVjXCIsIFwiYWNcIixcbiAgICBcIm9kaW9cIiwgXCJ0ZW1wb3JcIiwgXCJvcmNpXCIsIFwiZGFwaWJ1c1wiLCBcInVsdHJpY2VzXCIsIFwiaW5cIiwgXCJpYWN1bGlzXCIsIFwibnVuY1wiLFxuICAgIFwic2VkXCIsIFwiYXVndWVcIiwgXCJsYWN1cyxcIiwgXCJ2aXZlcnJhXCIsIFwidml0YWVcIiwgXCJjb25ndWVcIiwgXCJldSxcIiwgXCJjb25zZXF1YXRcIixcbiAgICBcImFjXCIsIFwiZmVsaXNcIiwgXCJkb25lY1wiLCBcImV0XCIsIFwib2Rpb1wiLCBcInBlbGxlbnRlc3F1ZVwiLCBcImRpYW1cIiwgXCJ2b2x1dHBhdFwiLFxuICAgIFwiY29tbW9kb1wiLCBcInNlZFwiLCBcImVnZXN0YXNcIiwgXCJlZ2VzdGFzXCIsIFwiZnJpbmdpbGxhXCIsIFwicGhhc2VsbHVzXCIsIFwiZmF1Y2lidXNcIixcbiAgICBcInNjZWxlcmlzcXVlXCIsIFwiZWxlaWZlbmRcIiwgXCJkb25lY1wiLCBcInByZXRpdW1cIiwgXCJ2dWxwdXRhdGVcIiwgXCJzYXBpZW5cIiwgXCJuZWNcIixcbiAgICBcInNhZ2l0dGlzXCIsIFwiYWxpcXVhbVwiLCBcIm1hbGVzdWFkYVwiLCBcImJpYmVuZHVtXCIsIFwiYXJjdVwiLCBcInZpdGFlXCIsIFwiZWxlbWVudHVtXCIsXG4gICAgXCJjdXJhYml0dXJcIiwgXCJ2aXRhZVwiLCBcIm51bmNcIiwgXCJzZWRcIiwgXCJ2ZWxpdFwiLCBcImRpZ25pc3NpbVwiLCBcInNvZGFsZXNcIiwgXCJ1dFwiLFxuICAgIFwiZXVcIiwgXCJzZW1cIiwgXCJpbnRlZ2VyXCIsIFwidml0YWVcIiwgXCJqdXN0b1wiLCBcImVnZXRcIiwgXCJtYWduYVwiLCBcImZlcm1lbnR1bVwiLFxuICAgIFwiaWFjdWxpc1wiLCBcImV1XCIsIFwibm9uXCIsIFwiZGlhbVwiLCBcInBoYXNlbGx1c1wiLCBcInZlc3RpYnVsdW1cIiwgXCJsb3JlbVwiLCBcInNlZFwiLFxuICAgIFwicmlzdXNcIiwgXCJ1bHRyaWNpZXNcIiwgXCJ0cmlzdGlxdWVcIiwgXCJudWxsYVwiLCBcImFsaXF1ZXRcIiwgXCJlbmltXCIsIFwidG9ydG9yLFwiLCBcImF0XCIsXG4gICAgXCJhdWN0b3JcIiwgXCJ1cm5hXCIsIFwibnVuY1wiLCBcImlkXCIsIFwiY3Vyc3VzXCIsIFwibWV0dXNcIiwgXCJhbGlxdWFtXCIsIFwiZWxlaWZlbmRcIiwgXCJtaVwiLFxuICAgIFwiaW5cIiwgXCJudWxsYVwiLCBcInBvc3VlcmVcIiwgXCJzb2xsaWNpdHVkaW5cIiwgXCJhbGlxdWFtXCIsIFwidWx0cmljZXNcIiwgXCJzYWdpdHRpc1wiLFxuICAgIFwib3JjaSxcIiwgXCJhXCIsIFwic2NlbGVyaXNxdWVcIiwgXCJwdXJ1c1wiLCBcInNlbXBlclwiLCBcImVnZXRcIiwgXCJkdWlzXCIsIFwiYXRcIiwgXCJ0ZWxsdXNcIixcbiAgICBcImF0XCIsIFwidXJuYVwiLCBcImNvbmRpbWVudHVtXCIsIFwibWF0dGlzXCIsIFwicGVsbGVudGVzcXVlXCIsIFwiaWRcIiwgXCJuaWJoXCIsIFwidG9ydG9yLFwiLFxuICAgIFwiaWRcIiwgXCJhbGlxdWV0XCIsIFwibGVjdHVzXCIsIFwicHJvaW5cIiwgXCJuaWJoXCIsIFwibmlzbCxcIiwgXCJjb25kaW1lbnR1bVwiLCBcImlkXCIsXG4gICAgXCJ2ZW5lbmF0aXNcIiwgXCJhLFwiLCBcImNvbmRpbWVudHVtXCIsIFwidml0YWVcIiwgXCJzYXBpZW5cIiwgXCJwZWxsZW50ZXNxdWVcIixcbiAgICBcImhhYml0YW50XCIsIFwibW9yYmlcIiwgXCJ0cmlzdGlxdWVcIiwgXCJzZW5lY3R1c1wiLCBcImV0XCIsIFwibmV0dXNcIiwgXCJldFwiLCBcIm1hbGVzdWFkYVwiLFxuICAgIFwiZmFtZXNcIiwgXCJhY1wiLCBcInR1cnBpc1wiLCBcImVnZXN0YXNcIiwgXCJzZWRcIiwgXCJ0ZW1wdXMsXCIsIFwidXJuYVwiLCBcImV0XCIsIFwicGhhcmV0cmFcIixcbiAgICBcInBoYXJldHJhLFwiLCBcIm1hc3NhXCIsIFwibWFzc2FcIiwgXCJ1bHRyaWNpZXNcIiwgXCJtaSxcIiwgXCJxdWlzXCIsIFwiaGVuZHJlcml0XCIsXG4gICAgXCJkb2xvclwiLCBcIm1hZ25hXCIsIFwiZWdldFwiLCBcImVzdFwiLCBcImxvcmVtXCIsIFwiaXBzdW1cIiwgXCJkb2xvclwiLCBcInNpdFwiLCBcImFtZXQsXCIsXG4gICAgXCJjb25zZWN0ZXR1clwiLCBcImFkaXBpc2NpbmdcIiwgXCJlbGl0XCIsIFwicGVsbGVudGVzcXVlXCIsIFwiaGFiaXRhbnRcIiwgXCJtb3JiaVwiLFxuICAgIFwidHJpc3RpcXVlXCIsIFwic2VuZWN0dXNcIiwgXCJldFwiLCBcIm5ldHVzXCIsIFwiZXRcIiwgXCJtYWxlc3VhZGFcIiwgXCJmYW1lc1wiLCBcImFjXCIsXG4gICAgXCJ0dXJwaXNcIiwgXCJlZ2VzdGFzXCIsIFwiaW50ZWdlclwiLCBcImVnZXRcIiwgXCJhbGlxdWV0XCIsIFwibmliaFwiLCBcInByYWVzZW50XCIsXG4gICAgXCJ0cmlzdGlxdWVcIiwgXCJtYWduYVwiLCBcInNpdFwiLCBcImFtZXRcIiwgXCJwdXJ1c1wiLCBcImdyYXZpZGFcIiwgXCJxdWlzXCIsIFwiYmxhbmRpdFwiLFxuICAgIFwidHVycGlzXCIsIFwiY3Vyc3VzXCIsIFwiaW5cIiwgXCJoYWNcIiwgXCJoYWJpdGFzc2VcIiwgXCJwbGF0ZWFcIiwgXCJkaWN0dW1zdFwiLCBcInF1aXNxdWVcIixcbiAgICBcInNhZ2l0dGlzLFwiLCBcInB1cnVzXCIsIFwic2l0XCIsIFwiYW1ldFwiLCBcInZvbHV0cGF0XCIsIFwiY29uc2VxdWF0LFwiLCBcIm1hdXJpc1wiLFxuICAgIFwibnVuY1wiLCBcImNvbmd1ZVwiLCBcIm5pc2ksXCIsIFwidml0YWVcIiwgXCJzdXNjaXBpdFwiLCBcInRlbGx1c1wiLCBcIm1hdXJpc1wiLCBcImFcIixcbiAgICBcImRpYW1cIiwgXCJtYWVjZW5hc1wiLCBcInNlZFwiLCBcImVuaW1cIiwgXCJ1dFwiLCBcInNlbVwiLCBcInZpdmVycmFcIiwgXCJhbGlxdWV0XCIsIFwiZWdldFwiLFxuICAgIFwic2l0XCIsIFwiYW1ldFwiLCBcInRlbGx1c1wiLCBcImNyYXNcIiwgXCJhZGlwaXNjaW5nXCIsIFwiZW5pbVwiLCBcImV1XCIsIFwidHVycGlzXCIsXG4gICAgXCJlZ2VzdGFzXCIsIFwicHJldGl1bVwiLCBcImFlbmVhblwiLCBcInBoYXJldHJhLFwiLCBcIm1hZ25hXCIsIFwiYWNcIiwgXCJwbGFjZXJhdFwiLFxuICAgIFwidmVzdGlidWx1bSxcIiwgXCJsZWN0dXNcIiwgXCJtYXVyaXNcIiwgXCJ1bHRyaWNlc1wiLCBcImVyb3MsXCIsIFwiaW5cIiwgXCJjdXJzdXNcIixcbiAgICBcInR1cnBpc1wiLCBcIm1hc3NhXCIsIFwidGluY2lkdW50XCIsIFwiZHVpXCIsIFwidXRcIiwgXCJvcm5hcmVcIiwgXCJsZWN0dXNcIiwgXCJzaXRcIiwgXCJhbWV0XCIsXG4gICAgXCJlc3RcIiwgXCJwbGFjZXJhdFwiLCBcImluXCIsIFwiZWdlc3Rhc1wiLCBcImVyYXRcIiwgXCJpbXBlcmRpZXRcIiwgXCJzZWRcIiwgXCJldWlzbW9kXCIsXG4gICAgXCJuaXNpXCIsIFwicG9ydGFcIiwgXCJsb3JlbVwiLCBcIm1vbGxpc1wiLCBcImFsaXF1YW1cIiwgXCJ1dFwiLCBcInBvcnR0aXRvclwiLCBcImxlb1wiLCBcImFcIixcbiAgICBcImRpYW1cIiwgXCJzb2xsaWNpdHVkaW5cIiwgXCJ0ZW1wb3JcIiwgXCJpZFwiLCBcImV1XCIsIFwibmlzbFwiLCBcIm51bmNcIiwgXCJtaVwiLCBcImlwc3VtLFwiLFxuICAgIFwiZmF1Y2lidXNcIiwgXCJ2aXRhZVwiLCBcImFsaXF1ZXRcIiwgXCJuZWMsXCIsIFwidWxsYW1jb3JwZXJcIiwgXCJzaXRcIiwgXCJhbWV0XCIsIFwicmlzdXNcIixcbiAgICBcIm51bGxhbVwiLCBcImVnZXRcIiwgXCJmZWxpc1wiLCBcImVnZXRcIiwgXCJudW5jXCIsIFwibG9ib3J0aXNcIiwgXCJtYXR0aXNcIiwgXCJhbGlxdWFtXCIsXG4gICAgXCJmYXVjaWJ1c1wiLCBcInB1cnVzXCIsIFwiaW5cIiwgXCJtYXNzYVwiLCBcInRlbXBvclwiLCBcIm5lY1wiLCBcImZldWdpYXRcIiwgXCJuaXNsXCIsXG4gICAgXCJwcmV0aXVtXCIsIFwiZnVzY2VcIiwgXCJpZFwiLCBcInZlbGl0XCIsIFwidXRcIiwgXCJ0b3J0b3JcIiwgXCJwcmV0aXVtXCIsIFwidml2ZXJyYVwiLFxuICAgIFwic3VzcGVuZGlzc2VcIiwgXCJwb3RlbnRpXCIsIFwibnVsbGFtXCIsIFwiYWNcIiwgXCJ0b3J0b3JcIiwgXCJ2aXRhZVwiLCBcInB1cnVzXCIsXG4gICAgXCJmYXVjaWJ1c1wiLCBcIm9ybmFyZVwiLCBcInN1c3BlbmRpc3NlXCIsIFwic2VkXCIsIFwibmlzaVwiLCBcImxhY3VzLFwiLCBcInNlZFwiLCBcInZpdmVycmFcIixcbiAgICBcInRlbGx1c1wiLCBcImluXCIsIFwiaGFjXCIsIFwiaGFiaXRhc3NlXCIsIFwicGxhdGVhXCIsIFwiZGljdHVtc3RcIiwgXCJ2ZXN0aWJ1bHVtXCIsXG4gICAgXCJyaG9uY3VzXCIsIFwiZXN0XCIsIFwicGVsbGVudGVzcXVlXCIsIFwiZWxpdFwiLCBcInVsbGFtY29ycGVyXCIsIFwiZGlnbmlzc2ltXCIsIFwiY3Jhc1wiLFxuICAgIFwidGluY2lkdW50XCIsIFwibG9ib3J0aXNcIiwgXCJmZXVnaWF0XCIsIFwidml2YW11c1wiLCBcImF0XCIsIFwiYXVndWVcIiwgXCJlZ2V0XCIsIFwiYXJjdVwiLFxuICAgIFwiZGljdHVtXCIsIFwidmFyaXVzXCIsIFwiZHVpc1wiLCBcImF0XCIsIFwiY29uc2VjdGV0dXJcIiwgXCJsb3JlbVwiLCBcImRvbmVjXCIsIFwibWFzc2FcIixcbiAgICBcInNhcGllbixcIiwgXCJmYXVjaWJ1c1wiLCBcImV0XCIsIFwibW9sZXN0aWVcIiwgXCJhYyxcIiwgXCJmZXVnaWF0XCIsIFwic2VkXCIsIFwibGVjdHVzXCIsXG4gICAgXCJ2ZXN0aWJ1bHVtXCIsIFwibWF0dGlzXCIsIFwidWxsYW1jb3JwZXJcIiwgXCJ2ZWxpdFwiLCBcInNlZFwiLCBcInVsbGFtY29ycGVyXCIsIFwibW9yYmlcIixcbiAgICBcInRpbmNpZHVudFwiLCBcIm9ybmFyZVwiLCBcIm1hc3NhLFwiLCBcImVnZXRcIiwgXCJlZ2VzdGFzXCIsIFwicHVydXNcIiwgXCJ2aXZlcnJhXCIsXG4gICAgXCJhY2N1bXNhblwiLCBcImluXCIsIFwibmlzbFwiLCBcIm5pc2ksXCIsIFwic2NlbGVyaXNxdWVcIiwgXCJldVwiLCBcInVsdHJpY2VzXCIsIFwidml0YWUsXCIsXG4gICAgXCJhdWN0b3JcIiwgXCJldVwiLCBcImF1Z3VlXCIsIFwidXRcIiwgXCJsZWN0dXNcIiwgXCJhcmN1LFwiLCBcImJpYmVuZHVtXCIsIFwiYXRcIiwgXCJ2YXJpdXNcIixcbiAgICBcInZlbCxcIiwgXCJwaGFyZXRyYVwiLCBcInZlbFwiLCBcInR1cnBpc1wiLCBcIm51bmNcIiwgXCJlZ2V0XCIsIFwibG9yZW1cIiwgXCJkb2xvcixcIiwgXCJzZWRcIixcbiAgICBcInZpdmVycmFcIiwgXCJpcHN1bVwiLCBcIm51bmNcIiwgXCJhbGlxdWV0XCIsIFwiYmliZW5kdW1cIiwgXCJlbmltLFwiLCBcImZhY2lsaXNpc1wiLFxuICAgIFwiZ3JhdmlkYVwiLCBcIm5lcXVlXCIsIFwiY29udmFsbGlzXCIsIFwiYVwiLCBcImNyYXNcIiwgXCJzZW1wZXJcIiwgXCJhdWN0b3JcIiwgXCJuZXF1ZSxcIixcbiAgICBcInZpdGFlXCIsIFwidGVtcHVzXCIsIFwicXVhbVwiLCBcInBlbGxlbnRlc3F1ZVwiLCBcIm5lY1wiLCBcIm5hbVwiLCBcImFsaXF1YW1cIiwgXCJzZW1cIixcbiAgICBcImV0XCIsIFwidG9ydG9yXCIsIFwiY29uc2VxdWF0XCIsIFwiaWRcIiwgXCJwb3J0YVwiLCBcIm5pYmhcIiwgXCJ2ZW5lbmF0aXNcIiwgXCJjcmFzXCIsIFwic2VkXCIsXG4gICAgXCJmZWxpc1wiLCBcImVnZXRcIiwgXCJ2ZWxpdFwiLCBcImFsaXF1ZXRcIiwgXCJzYWdpdHRpc1wiLCBcImlkXCIsIFwiY29uc2VjdGV0dXJcIiwgXCJwdXJ1c1wiLFxuICAgIFwidXRcIiwgXCJmYXVjaWJ1c1wiLCBcInB1bHZpbmFyXCIsIFwiZWxlbWVudHVtXCIsIFwiaW50ZWdlclwiLCBcImVuaW1cIiwgXCJuZXF1ZSxcIixcbiAgICBcInZvbHV0cGF0XCIsIFwiYWNcIiwgXCJ0aW5jaWR1bnRcIiwgXCJ2aXRhZSxcIiwgXCJzZW1wZXJcIiwgXCJxdWlzXCIsIFwibGVjdHVzXCIsIFwibnVsbGFcIixcbiAgICBcImF0XCIsIFwidm9sdXRwYXRcIiwgXCJkaWFtXCIsIFwidXRcIiwgXCJ2ZW5lbmF0aXNcIiwgXCJ0ZWxsdXNcIiwgXCJpblwiLCBcIm1ldHVzXCIsXG4gICAgXCJ2dWxwdXRhdGVcIiwgXCJldVwiLCBcInNjZWxlcmlzcXVlXCIsIFwiZmVsaXNcIiwgXCJpbXBlcmRpZXRcIiwgXCJwcm9pblwiLCBcImZlcm1lbnR1bVwiLFxuICAgIFwibGVvXCIsIFwidmVsXCIsIFwib3JjaVwiLCBcInBvcnRhXCIsIFwibm9uXCIsIFwicHVsdmluYXJcIiwgXCJuZXF1ZVwiLCBcImxhb3JlZXRcIixcbiAgICBcInN1c3BlbmRpc3NlXCIsIFwiaW50ZXJkdW1cIiwgXCJjb25zZWN0ZXR1clwiLCBcImxpYmVybyxcIiwgXCJpZFwiLCBcImZhdWNpYnVzXCIsIFwibmlzbFwiLFxuICAgIFwidGluY2lkdW50XCIsIFwiZWdldFwiLCBcIm51bGxhbVwiLCBcIm5vblwiLCBcIm5pc2lcIiwgXCJlc3QsXCIsIFwic2l0XCIsIFwiYW1ldFwiLFxuICAgIFwiZmFjaWxpc2lzXCIsIFwibWFnbmFcIiwgXCJldGlhbVwiLCBcInRlbXBvcixcIiwgXCJvcmNpXCIsIFwiZXVcIiwgXCJsb2JvcnRpc1wiLFxuICAgIFwiZWxlbWVudHVtLFwiLCBcIm5pYmhcIiwgXCJ0ZWxsdXNcIiwgXCJtb2xlc3RpZVwiLCBcIm51bmMsXCIsIFwibm9uXCIsIFwiYmxhbmRpdFwiLCBcIm1hc3NhXCIsXG4gICAgXCJlbmltXCIsIFwibmVjXCIsIFwiZHVpXCIsIFwibnVuY1wiLCBcIm1hdHRpc1wiLCBcImVuaW1cIiwgXCJ1dFwiLCBcInRlbGx1c1wiLCBcImVsZW1lbnR1bVwiLFxuICAgIFwic2FnaXR0aXNcIiwgXCJ2aXRhZVwiLCBcImV0XCIsIFwibGVvXCIsIFwiZHVpc1wiLCBcInV0XCIsIFwiZGlhbVwiLCBcInF1YW1cIiwgXCJudWxsYVwiLFxuICAgIFwicG9ydHRpdG9yXCIsIFwibWFzc2FcIiwgXCJpZFwiLCBcIm5lcXVlXCIsIFwiYWxpcXVhbVwiLCBcInZlc3RpYnVsdW1cIiwgXCJtb3JiaVwiLFxuICAgIFwiYmxhbmRpdFwiLCBcImN1cnN1c1wiLCBcInJpc3VzLFwiLCBcImF0XCIsIFwidWx0cmljZXNcIiwgXCJtaVwiLCBcInRlbXB1c1wiLCBcImltcGVyZGlldFwiLFxuICAgIFwibnVsbGFcIiwgXCJtYWxlc3VhZGFcIiwgXCJwZWxsZW50ZXNxdWVcIiwgXCJlbGl0XCIsIFwiZWdldFwiLCBcImdyYXZpZGFcIiwgXCJjdW1cIixcbiAgICBcInNvY2lpc1wiLCBcIm5hdG9xdWVcIiwgXCJwZW5hdGlidXNcIiwgXCJldFwiLCBcIm1hZ25pc1wiLCBcImRpc1wiLCBcInBhcnR1cmllbnRcIixcbiAgICBcIm1vbnRlcyxcIiwgXCJuYXNjZXR1clwiLCBcInJpZGljdWx1c1wiLCBcIm11c1wiLCBcIm1hdXJpc1wiLCBcInZpdGFlXCIsIFwidWx0cmljaWVzXCIsXG4gICAgXCJsZW9cIiwgXCJpbnRlZ2VyXCIsIFwibWFsZXN1YWRhXCIsIFwibnVuY1wiLCBcInZlbFwiLCBcInJpc3VzXCIsIFwiY29tbW9kb1wiLCBcInZpdmVycmFcIixcbiAgICBcIm1hZWNlbmFzXCIsIFwiYWNjdW1zYW4sXCIsIFwibGFjdXNcIiwgXCJ2ZWxcIiwgXCJmYWNpbGlzaXNcIiwgXCJ2b2x1dHBhdCxcIiwgXCJlc3RcIixcbiAgICBcInZlbGl0XCIsIFwiZWdlc3Rhc1wiLCBcImR1aSxcIiwgXCJpZFwiLCBcIm9ybmFyZVwiLCBcImFyY3VcIiwgXCJvZGlvXCIsIFwidXRcIiwgXCJzZW1cIixcbiAgICBcIm51bGxhXCIsIFwicGhhcmV0cmFcIiwgXCJkaWFtXCIsIFwic2l0XCIsIFwiYW1ldFwiLCBcIm5pc2xcIiwgXCJzdXNjaXBpdFwiLCBcImFkaXBpc2NpbmdcIixcbiAgICBcImJpYmVuZHVtXCIsIFwiZXN0XCIsIFwidWx0cmljaWVzXCIsIFwiaW50ZWdlclwiLCBcInF1aXNcIiwgXCJhdWN0b3JcIiwgXCJlbGl0XCIsIFwic2VkXCIsXG4gICAgXCJ2dWxwdXRhdGVcIiwgXCJtaVwiLCBcInNpdFwiLCBcImFtZXRcIiwgXCJtYXVyaXNcIiwgXCJjb21tb2RvXCIsIFwicXVpc1wiLCBcImltcGVyZGlldFwiLFxuICAgIFwibWFzc2FcIiwgXCJ0aW5jaWR1bnRcIiwgXCJudW5jXCIsIFwicHVsdmluYXJcIiwgXCJzYXBpZW5cIiwgXCJldFwiLCBcImxpZ3VsYVwiLFxuICAgIFwidWxsYW1jb3JwZXJcIiwgXCJtYWxlc3VhZGFcIiwgXCJwcm9pblwiLCBcImxpYmVyb1wiLCBcIm51bmMsXCIsIFwiY29uc2VxdWF0XCIsXG4gICAgXCJpbnRlcmR1bVwiLCBcInZhcml1c1wiLCBcInNpdFwiLCBcImFtZXQsXCIsIFwibWF0dGlzXCIsIFwidnVscHV0YXRlXCIsIFwiZW5pbVwiLCBcIm51bGxhXCIsXG4gICAgXCJhbGlxdWV0XCIsIFwicG9ydHRpdG9yXCIsIFwibGFjdXMsXCIsIFwibHVjdHVzXCIsIFwiYWNjdW1zYW5cIiwgXCJ0b3J0b3JcIiwgXCJwb3N1ZXJlXCIsXG4gICAgXCJhY1wiLCBcInV0XCIsIFwiY29uc2VxdWF0XCIsIFwic2VtcGVyXCIsIFwidml2ZXJyYVwiLCBcIm5hbVwiLCBcImxpYmVyb1wiLCBcImp1c3RvLFwiLFxuICAgIFwibGFvcmVldFwiLCBcInNpdFwiLCBcImFtZXRcIiwgXCJjdXJzdXNcIiwgXCJzaXRcIiwgXCJhbWV0LFwiLCBcImRpY3R1bVwiLCBcInNpdFwiLCBcImFtZXRcIixcbiAgICBcImp1c3RvXCIsIFwiZG9uZWNcIiwgXCJlbmltXCIsIFwiZGlhbSxcIiwgXCJ2dWxwdXRhdGVcIiwgXCJ1dFwiLCBcInBoYXJldHJhXCIsIFwic2l0XCIsXG4gICAgXCJhbWV0LFwiLCBcImFsaXF1YW1cIiwgXCJpZFwiLCBcImRpYW1cIiwgXCJtYWVjZW5hc1wiLCBcInVsdHJpY2llc1wiLCBcIm1pXCIsIFwiZWdldFwiLFxuICAgIFwibWF1cmlzXCIsIFwicGhhcmV0cmFcIiwgXCJldFwiLCBcInVsdHJpY2VzXCIsIFwibmVxdWVcIiwgXCJvcm5hcmVcIiwgXCJhZW5lYW5cIiwgXCJldWlzbW9kXCIsXG4gICAgXCJlbGVtZW50dW1cIiwgXCJuaXNpLFwiLCBcInF1aXNcIiwgXCJlbGVpZmVuZFwiLCBcInF1YW1cIiwgXCJhZGlwaXNjaW5nXCIsIFwidml0YWVcIixcbiAgICBcInByb2luXCIsIFwic2FnaXR0aXMsXCIsIFwibmlzbFwiLCBcInJob25jdXNcIiwgXCJtYXR0aXNcIiwgXCJyaG9uY3VzLFwiLCBcInVybmFcIiwgXCJuZXF1ZVwiLFxuICAgIFwidml2ZXJyYVwiLCBcImp1c3RvLFwiLCBcIm5lY1wiLCBcInVsdHJpY2VzXCIsIFwiZHVpXCIsIFwic2FwaWVuXCIsIFwiZWdldFwiLCBcIm1pXCIsIFwicHJvaW5cIixcbiAgICBcInNlZFwiLCBcImxpYmVyb1wiLCBcImVuaW0sXCIsIFwic2VkXCIsIFwiZmF1Y2lidXNcIiwgXCJ0dXJwaXNcIiwgXCJpblwiLCBcImV1XCIsIFwibWlcIixcbiAgICBcImJpYmVuZHVtXCIsIFwibmVxdWVcIiwgXCJlZ2VzdGFzXCIsIFwiY29uZ3VlXCIsIFwicXVpc3F1ZVwiLCBcImVnZXN0YXNcIiwgXCJkaWFtXCIsIFwiaW5cIixcbiAgICBcImFyY3VcIiwgXCJjdXJzdXNcIiwgXCJldWlzbW9kXCIsIFwicXVpc1wiLCBcInZpdmVycmFcIiwgXCJuaWJoXCIsIFwiY3Jhc1wiLCBcInB1bHZpbmFyXCIsXG4gICAgXCJtYXR0aXNcIiwgXCJudW5jLFwiLCBcInNlZFwiLCBcImJsYW5kaXRcIiwgXCJsaWJlcm9cIiwgXCJ2b2x1dHBhdFwiLCBcInNlZFwiLCBcImNyYXNcIixcbiAgICBcIm9ybmFyZVwiLCBcImFyY3VcIiwgXCJkdWlcIiwgXCJ2aXZhbXVzXCIsIFwiYXJjdVwiLCBcImZlbGlzLFwiLCBcImJpYmVuZHVtXCIsIFwidXRcIixcbiAgICBcInRyaXN0aXF1ZVwiLCBcImV0LFwiLCBcImVnZXN0YXNcIiwgXCJxdWlzXCIsIFwiaXBzdW1cIiwgXCJzdXNwZW5kaXNzZVwiLCBcInVsdHJpY2VzXCIsXG4gICAgXCJmdXNjZVwiLCBcInV0XCIsIFwicGxhY2VyYXRcIiwgXCJvcmNpXCIsIFwibnVsbGFcIiwgXCJwZWxsZW50ZXNxdWVcIixcbiAgICBcImRpZ25pc3NpbVwiLCBcImVuaW0sXCIsIFwic2l0XCIsIFwiYW1ldFwiLCBcInZlbmVuYXRpc1wiLCBcInVybmFcIiwgXCJjdXJzdXNcIiwgXCJlZ2V0XCIsXG4gICAgXCJudW5jXCIsIFwic2NlbGVyaXNxdWVcIiwgXCJ2aXZlcnJhXCIsIFwibWF1cmlzLFwiLCBcImluXCIsIFwiYWxpcXVhbVwiLCBcInNlbVwiLFxuICAgIFwiZnJpbmdpbGxhXCIsIFwidXRcIiwgXCJtb3JiaVwiLCBcInRpbmNpZHVudFwiLCBcImF1Z3VlXCIsIFwiaW50ZXJkdW1cIiwgXCJ2ZWxpdFwiLFxuICAgIFwiZXVpc21vZFwiLCBcImluXCIsIFwicGVsbGVudGVzcXVlXCIsIFwibWFzc2FcIiwgXCJwbGFjZXJhdFwiLCBcImR1aXNcIiwgXCJ1bHRyaWNpZXNcIixcbiAgICBcImxhY3VzXCIsIFwic2VkXCIsIFwidHVycGlzXCIsIFwidGluY2lkdW50XCIsIFwiaWRcIiwgXCJhbGlxdWV0XCIsIFwicmlzdXNcIiwgXCJmZXVnaWF0XCIsXG4gICAgXCJpblwiLCBcImFudGVcIiwgXCJtZXR1cyxcIiwgXCJkaWN0dW1cIiwgXCJhdFwiLCBcInRlbXBvclwiLCBcImNvbW1vZG8sXCIsIFwidWxsYW1jb3JwZXJcIixcbiAgICBcImFcIiwgXCJsYWN1c1wiLCBcInZlc3RpYnVsdW1cIiwgXCJzZWRcIiwgXCJhcmN1XCIsIFwibm9uXCIsIFwib2Rpb1wiLCBcImV1aXNtb2RcIiwgXCJsYWNpbmlhXCIsXG4gICAgXCJhdFwiLCBcInF1aXNcIiwgXCJyaXN1c1wiLCBcInNlZFwiLCBcInZ1bHB1dGF0ZVwiLCBcIm9kaW9cIiwgXCJ1dFwiLCBcImVuaW1cIiwgXCJibGFuZGl0XCIsXG4gICAgXCJ2b2x1dHBhdFwiLCBcIm1hZWNlbmFzXCIsIFwidm9sdXRwYXRcIiwgXCJibGFuZGl0XCIsIFwiYWxpcXVhbVwiLCBcImV0aWFtXCIsIFwiZXJhdFwiLFxuICAgIFwidmVsaXQsXCIsIFwic2NlbGVyaXNxdWVcIiwgXCJpblwiLCBcImRpY3R1bVwiLCBcIm5vbixcIiwgXCJjb25zZWN0ZXR1clwiLCBcImFcIiwgXCJlcmF0XCIsXG4gICAgXCJuYW1cIiwgXCJhdFwiLCBcImxlY3R1c1wiLCBcInVybmFcIiwgXCJkdWlzXCIsIFwiY29udmFsbGlzXCIsIFwiY29udmFsbGlzXCIsIFwidGVsbHVzLFwiLFxuICAgIFwiaWRcIiwgXCJpbnRlcmR1bVwiLCBcInZlbGl0XCIsIFwibGFvcmVldFwiLCBcImlkXCIsIFwiZG9uZWNcIiwgXCJ1bHRyaWNlc1wiLCBcInRpbmNpZHVudFwiLFxuICAgIFwiYXJjdSxcIiwgXCJub25cIiwgXCJzb2RhbGVzXCIsIFwibmVxdWVcIiwgXCJzb2RhbGVzXCIsIFwidXRcIiwgXCJldGlhbVwiLCBcInNpdFwiLCBcImFtZXRcIixcbiAgICBcIm5pc2xcIiwgXCJwdXJ1cyxcIiwgXCJpblwiLCBcIm1vbGxpc1wiLCBcIm51bmNcIiwgXCJzZWRcIiwgXCJpZFwiLCBcInNlbXBlclwiLCBcInJpc3VzXCIsIFwiaW5cIixcbiAgICBcImhlbmRyZXJpdFwiLCBcImdyYXZpZGFcIiwgXCJydXRydW1cIiwgXCJxdWlzcXVlXCIsIFwibm9uXCIsIFwidGVsbHVzXCIsIFwib3JjaSxcIiwgXCJhY1wiLFxuICAgIFwiYXVjdG9yXCIsIFwiYXVndWVcIiwgXCJtYXVyaXNcIiwgXCJhdWd1ZVwiLCBcIm5lcXVlLFwiLCBcImdyYXZpZGFcIiwgXCJpblwiLCBcImZlcm1lbnR1bVwiLFxuICAgIFwiZXQsXCIsIFwic29sbGljaXR1ZGluXCIsIFwiYWNcIiwgXCJvcmNpXCIsIFwicGhhc2VsbHVzXCIsIFwiZWdlc3Rhc1wiLCBcInRlbGx1c1wiLFxuICAgIFwicnV0cnVtXCIsIFwidGVsbHVzXCIsIFwicGVsbGVudGVzcXVlXCIsIFwiZXVcIiwgXCJ0aW5jaWR1bnRcIiwgXCJ0b3J0b3JcIiwgXCJhbGlxdWFtXCIsXG4gICAgXCJudWxsYVwiLCBcImZhY2lsaXNpXCIsIFwiY3Jhc1wiLCBcImZlcm1lbnR1bSxcIiwgXCJvZGlvXCIsIFwiZXVcIiwgXCJmZXVnaWF0XCIsIFwicHJldGl1bSxcIixcbiAgICBcIm5pYmhcIiwgXCJpcHN1bVwiLCBcImNvbnNlcXVhdFwiLCBcIm5pc2wsXCIsIFwidmVsXCIsIFwicHJldGl1bVwiLCBcImxlY3R1c1wiLCBcInF1YW1cIixcbiAgICBcImlkXCIsIFwibGVvXCIsIFwiaW5cIiwgXCJ2aXRhZVwiLCBcInR1cnBpc1wiLCBcIm1hc3NhXCIsIFwic2VkXCIsIFwiZWxlbWVudHVtXCIsIFwidGVtcHVzXCIsXG4gICAgXCJlZ2VzdGFzXCIsIFwic2VkXCIsIFwic2VkXCIsIFwicmlzdXNcIiwgXCJwcmV0aXVtXCIsIFwicXVhbVwiLCBcInZ1bHB1dGF0ZVwiLCBcImRpZ25pc3NpbVwiLFxuICAgIFwic3VzcGVuZGlzc2VcIiwgXCJpblwiLCBcImVzdFwiLCBcImFudGVcIiwgXCJpblwiLCBcIm5pYmhcIiwgXCJtYXVyaXMsXCIsIFwiY3Vyc3VzXCIsXG4gICAgXCJtYXR0aXNcIiwgXCJtb2xlc3RpZVwiLCBcImEsXCIsIFwiaWFjdWxpc1wiLCBcImF0XCIsIFwiZXJhdFwiLCBcInBlbGxlbnRlc3F1ZVwiLFxuICAgIFwiYWRpcGlzY2luZ1wiLCBcImNvbW1vZG9cIiwgXCJlbGl0LFwiLCBcImF0XCIsIFwiaW1wZXJkaWV0XCIsIFwiZHVpXCIsIFwiYWNjdW1zYW5cIiwgXCJzaXRcIixcbiAgICBcImFtZXRcIiwgXCJudWxsYVwiLCBcImZhY2lsaXNpXCIsIFwibW9yYmlcIiwgXCJ0ZW1wdXNcIiwgXCJpYWN1bGlzXCIsIFwidXJuYSxcIiwgXCJpZFwiLFxuICAgIFwidm9sdXRwYXRcIiwgXCJsYWN1c1wiLCBcImxhb3JlZXRcIiwgXCJub25cIiwgXCJjdXJhYml0dXJcIiwgXCJncmF2aWRhXCIsIFwiYXJjdVwiLCBcImFjXCIsXG4gICAgXCJ0b3J0b3JcIiwgXCJkaWduaXNzaW1cIiwgXCJjb252YWxsaXNcIiwgXCJhZW5lYW5cIiwgXCJldFwiLCBcInRvcnRvclwiLCBcImF0XCIsIFwicmlzdXNcIixcbiAgICBcInZpdmVycmFcIiwgXCJhZGlwaXNjaW5nXCIsIFwiYXRcIiwgXCJpblwiLCBcInRlbGx1c1wiLCBcImludGVnZXJcIiwgXCJmZXVnaWF0XCIsXG4gICAgXCJzY2VsZXJpc3F1ZVwiLCBcInZhcml1c1wiLCBcIm1vcmJpXCIsIFwiZW5pbVwiLCBcIm51bmMsXCIsIFwiZmF1Y2lidXNcIiwgXCJhXCIsXG4gICAgXCJwZWxsZW50ZXNxdWVcIiwgXCJzaXRcIiwgXCJhbWV0LFwiLCBcInBvcnR0aXRvclwiLCBcImVnZXRcIiwgXCJkb2xvclwiLCBcIm1vcmJpXCIsIFwibm9uXCIsXG4gICAgXCJhcmN1XCIsIFwicmlzdXMsXCIsIFwicXVpc1wiLCBcInZhcml1c1wiLCBcInF1YW1cIiwgXCJxdWlzcXVlXCIsIFwiaWRcIiwgXCJkaWFtXCIsIFwidmVsXCIsXG4gICAgXCJxdWFtXCIsIFwiZWxlbWVudHVtXCIsIFwicHVsdmluYXJcIiwgXCJldGlhbVwiLCBcIm5vblwiLCBcInF1YW1cIiwgXCJsYWN1c1wiLFxuICAgIFwic3VzcGVuZGlzc2VcIiwgXCJmYXVjaWJ1c1wiLCBcImludGVyZHVtXCIsIFwicG9zdWVyZVwiLCBcImxvcmVtXCIsIFwiaXBzdW1cIiwgXCJkb2xvclwiLFxuICAgIFwic2l0XCIsIFwiYW1ldCxcIiwgXCJjb25zZWN0ZXR1clwiLCBcImFkaXBpc2NpbmdcIiwgXCJlbGl0XCIsIFwiZHVpc1wiLCBcInRyaXN0aXF1ZVwiLFxuICAgIFwic29sbGljaXR1ZGluXCIsIFwibmliaFwiLCBcInNpdFwiLCBcImFtZXRcIiwgXCJjb21tb2RvXCIsIFwibnVsbGFcIiwgXCJmYWNpbGlzaVwiLFxuICAgIFwibnVsbGFtXCIsIFwidmVoaWN1bGFcIiwgXCJpcHN1bVwiLCBcImFcIiwgXCJhcmN1XCIsIFwiY3Vyc3VzXCIsIFwidml0YWVcIiwgXCJjb25ndWVcIixcbiAgICBcIm1hdXJpc1wiLCBcInJob25jdXNcIiwgXCJhZW5lYW5cIiwgXCJ2ZWxcIiwgXCJlbGl0XCIsIFwic2NlbGVyaXNxdWVcIiwgXCJtYXVyaXNcIixcbiAgICBcInBlbGxlbnRlc3F1ZVwiLCBcInB1bHZpbmFyXCIsIFwicGVsbGVudGVzcXVlXCIsIFwiaGFiaXRhbnRcIiwgXCJtb3JiaVwiLCBcInRyaXN0aXF1ZVwiLFxuICAgIFwic2VuZWN0dXNcIiwgXCJldFwiLCBcIm5ldHVzXCIsIFwiZXRcIiwgXCJtYWxlc3VhZGFcIiwgXCJmYW1lc1wiLCBcImFjXCIsIFwidHVycGlzXCIsXG4gICAgXCJlZ2VzdGFzXCIsIFwibWFlY2VuYXNcIiwgXCJwaGFyZXRyYVwiLCBcImNvbnZhbGxpc1wiLCBcInBvc3VlcmVcIiwgXCJtb3JiaVwiLCBcImxlb1wiLFxuICAgIFwidXJuYSxcIiwgXCJtb2xlc3RpZVwiLCBcImF0XCIsIFwiZWxlbWVudHVtXCIsIFwiZXUsXCIsIFwiZmFjaWxpc2lzXCIsIFwic2VkXCIsIFwib2Rpb1wiLFxuICAgIFwibW9yYmlcIiwgXCJxdWlzXCIsIFwiY29tbW9kb1wiLCBcIm9kaW9cIiwgXCJhZW5lYW5cIiwgXCJzZWRcIiwgXCJhZGlwaXNjaW5nXCIsIFwiZGlhbVwiLFxuICAgIFwiZG9uZWNcIiwgXCJhZGlwaXNjaW5nXCIsIFwidHJpc3RpcXVlXCIsIFwicmlzdXNcIiwgXCJuZWNcIiwgXCJmZXVnaWF0XCIsIFwiaW5cIixcbiAgICBcImZlcm1lbnR1bVwiLCBcInBvc3VlcmVcIiwgXCJ1cm5hXCIsIFwibmVjXCIsIFwidGluY2lkdW50XCIsIFwicHJhZXNlbnRcIiwgXCJzZW1wZXJcIixcbiAgICBcImZldWdpYXRcIiwgXCJuaWJoXCIsIFwic2VkXCIsIFwicHVsdmluYXJcIiwgXCJwcm9pblwiLCBcImdyYXZpZGFcIiwgXCJoZW5kcmVyaXRcIixcbiAgICBcImxlY3R1c1wiLCBcImFcIiwgXCJtb2xlc3RpZVwiLCBcImdyYXZpZGFcIiwgXCJkaWN0dW1cIlxuICBdXG59XG4iXX0=
