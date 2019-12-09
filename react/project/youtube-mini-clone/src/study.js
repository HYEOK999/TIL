const after1 = new Promise(resolve => setTimeout(() => resolve(1),1000))
const after2 = new Promise(resolve => setTimeout(() => resolve(2),2000))
const after3 = new Promise(resolve => setTimeout(() => resolve(3),3000))

const main = async () => {
  const tasks = [after3, after2, after1];

  // 올바른 예제
  for (const t of tasks) {
    console.log(await (t))
  }

  // 잘못된 예제
  // tasks.forEach(async task => console.log(await (task)))
}

main()