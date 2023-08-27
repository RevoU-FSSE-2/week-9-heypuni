interface Transaction {
    id: number,
    type: string,
    name: string,
    detail: string,
    amount: string
  }
  
export let transactions: Transaction[] = [
    {
        "id": 1,
        "type": "cash in",
        "name": "jajan",
        "detail": "jajan sore",
        "amount": "10000"
    },
    {
        "id": 2,
        "type": "cash in",
        "name": "jajan",
        "detail": "jajan sore",
        "amount": "10000"
    },
    {
        "id": 3,
        "type": "cash in",
        "name": "jajan",
        "detail": "jajan sore",
        "amount": "10000"
    }
]