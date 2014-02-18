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
