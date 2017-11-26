import expect from 'expect'
import { matchPattern } from '../PatternUtils'

describe('matchPattern', function () {

  function assertMatch(pattern, pathname, sensitive, remainingPathname, paramNames, paramValues) {
    expect(matchPattern(pattern, pathname, sensitive)).toEqual({
      remainingPathname,
      paramNames,
      paramValues
    })
  }

  it('works without params', function () {
    assertMatch('/', '/path', false, '/path', [], [])
  })

  it('works with named params', function () {
    assertMatch('/:id', '/path', false, '', [ 'id' ], [ 'path' ])
    assertMatch('/:id.:ext', '/path.jpg', false, '', [ 'id', 'ext' ], [ 'path', 'jpg' ])
  })

  it('works with named params that contain spaces', function () {
    assertMatch('/:id', '/path+more', false, '', [ 'id' ], [ 'path+more' ])
    assertMatch('/:id', '/path%20more', false, '', [ 'id' ], [ 'path more' ])
  })

  it('works with splat params', function () {
    assertMatch('/files/*.*', '/files/path.jpg', false, '', [ 'splat', 'splat' ], [ 'path', 'jpg' ])
  })

  it('ignores trailing slashes', function () {
    assertMatch('/:id', '/path/', false, '', [ 'id' ], [ 'path' ])
  })

  it('works with greedy splat (**)', function () {
    assertMatch('/**/g', '/greedy/is/good/g', false, '', [ 'splat' ], [ 'greedy/is/good' ])
  })

  it('works with greedy and non-greedy splat', function () {
    assertMatch('/**/*.jpg', '/files/path/to/file.jpg', false, '', [ 'splat', 'splat' ], [ 'files/path/to', 'file' ])
  })

  it('works with patterns that match built-in names', function () {
    assertMatch('toString', '/toString', false, '', [], [])
  })

  it('works with sensitive patterns', function () {
    expect(matchPattern('/Path', '/path', true)).toEqual(null)
  })
})
