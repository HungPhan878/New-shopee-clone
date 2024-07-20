export type SuccessfulApiRes<Data> = {
  message: string
  data: Data
}


export type ErrorApiRes<Data> = {
  message: string
  data?: Data
}
