import * as qs from 'qs'

console.log(qs.parse('a[b]=5'))
console.log(qs.stringify({a: 5}))