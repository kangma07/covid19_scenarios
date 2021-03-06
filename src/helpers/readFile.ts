export class FileReaderError extends Error {
  public readonly file?: File
  constructor(file?: File) {
    super(`Error: file "${file?.name}" cannot be read.`)
    this.file = file
  }
}

export function readFile(file: File): Promise<string> {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.addEventListener('error', () => {
      reader.abort()
      reject(new FileReaderError(file))
    })

    reader.addEventListener('load', () => {
      resolve(reader.result as string) // HACK
    })

    reader.readAsText(file)
  })
}
