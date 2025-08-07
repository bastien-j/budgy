export interface Category {
  id: number
  name: string
}

export interface List extends Category {
  operations: Operation[]
  total: number
}

export interface Operation {
  id: number
  amount: number
  categoryId: number
  name: string
}
