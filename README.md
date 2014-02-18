
# vue-placeholders

A simple [Vue](http://vuejs.org) directive for placeholder images and lorem-ipsum text.

## Usage 

 For a placeholder image:

```Html
  <img v-phimg="200x200">
```

For lorem-ipsum text:

```Html
  <div v-phtxt="4p6s"></div>
```

### You can check out a demo [here](http://lithiumjake.github.io/vue-placeholders/) 

## API

The **v-phimg** directive expects a string describing the dimensions in  pixels, seperated by an 'x', ie "200x200" 

The **v-phtxt** directive expects a string describing a number of paragraphs, ie "4p", the number of sentences, ie "5s",
or the number of paragraphs and sentences per paragraph, ie "3p8s". 

## Attribution

Based entirely on the work of Josh David Miller https://github.com/joshdmiller/angular-placeholders
which is itself based, in part, on https://github.com/fkadeveloper/loremjs

Ported with love from AngularJS to [Vue.js](http://vuejs.org/)


## License

  The MIT License (MIT)

  Copyright (c) 2014 Jeremy Suntheimer

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
