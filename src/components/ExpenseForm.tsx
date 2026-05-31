import { CATEGORIES } from '../constants'
import type { Expense } from '../types/expense'

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const expense: Expense = {
      id: crypto.randomUUID(),
      description: String(formData.get('description')),
      amount: Number(formData.get('amount')),
      category: String(formData.get('category')),
      date: new Date().toISOString().slice(0, 10),
    }

    onAddExpense(expense)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <label>
        Name
        <input
          name="description"
          placeholder="e.g. Lunch"
          required
        />
      </label>
      <label>
        Amount ($)
        <input
          name="amount"
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          required
        />
      </label>
      <label>
        Category
        <select name="category" required>
          <option value="">Select category</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm
