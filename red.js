let x = 1
console.time('label')
for (let i = 1; i < 1000000000; i++) {
    x = i * i / x
}
console.timeEnd('label')
console.log(x)