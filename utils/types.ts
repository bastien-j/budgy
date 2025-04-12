export interface Category {
  id: string
  name: string
}

export interface List extends Category {
  operations: Operation[]
  total: number
}

export interface Operation {
  id: string
  amount: number
  categoryId: string
  name: string
}
