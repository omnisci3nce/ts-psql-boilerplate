import t from 'tap'

const add = (x: number, y: number) => x + y

t.equal(add(5, 10), 15, '5 + 10 = 15')