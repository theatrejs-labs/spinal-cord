interface ISpinalJSONAPI {
  status: number
  message?: string
  data: any
}

export const json = (res: Express.Response, data: ISpinalJSONAPI) => {
  ;(res as any).json(data)
}
