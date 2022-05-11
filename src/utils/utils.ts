import * as fs from 'fs'

export function writeToFile(fileName: string, data: any) {
  let fileObject: any[] = []
  let fileString = ''

  if (fs.existsSync(fileName)) {
    fileString = fs.readFileSync(fileName, 'utf-8')
    fileObject = JSON.parse(fileString) as any[]
  }

  fileObject.push(data)
  fileString = JSON.stringify(fileObject)

  fs.writeFileSync(fileName, fileString, 'utf-8')

  console.log('JSON data is saved.')
}

export function calculateNewAverage(oldAverage: number, newValue: number, numberOfValues: number) {
  return (oldAverage * numberOfValues + newValue) / (numberOfValues + 1)
}
