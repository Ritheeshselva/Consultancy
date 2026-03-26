import { useMemo, useState } from 'react'
import './Dashboard.css'

const getDateText = (value) => {
  if (!value) {
    return ''
  }

  const date = new Date(`${value}T00:00:00`)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function Dashboard({ invoices, products, customers }) {
  const today = new Date().toISOString().split('T')[0]
  const currentMonth = today.slice(0, 7)

  const [filterType, setFilterType] = useState('month')
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const invoiceDate = (invoice.date || '').split('T')[0]

      if (!invoiceDate) {
        return false
      }

      if (filterType === 'today') {
        return invoiceDate === today
      }

      if (filterType === 'month') {
        return invoiceDate.startsWith(selectedMonth)
      }

      if (filterType === 'day') {
        return invoiceDate === selectedDate
      }

      if (filterType === 'range') {
        return invoiceDate >= startDate && invoiceDate <= endDate
      }

      return true
    })
  }, [invoices, filterType, today, selectedMonth, selectedDate, startDate, endDate])

  const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0)
  const totalProducts = products.reduce((sum, p) => sum + (p.quantity || 0), 0)

  const filterDescription =
    filterType === 'today'
      ? `Today (${getDateText(today)})`
      : filterType === 'month'
      ? `Month (${selectedMonth})`
      : filterType === 'day'
      ? `Particular Day (${getDateText(selectedDate)})`
      : filterType === 'range'
      ? `Date Range (${getDateText(startDate)} to ${getDateText(endDate)})`
      : 'All'

  return (
    <div className="dashboard-page">
      <div className="header">
        <h1>Dashboard</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Welcome back to Selvam Motors Billing System</p>
      </div>

      <div className="card dashboard-filter-card">
        <div className="dashboard-filter-top">
          <h2>Invoice Filters</h2>
          <p>{filterDescription}</p>
        </div>

        <div className="dashboard-filter-grid">
          <div className="form-group">
            <label htmlFor="filterType">Filter Type</label>
            <select
              id="filterType"
              value={filterType}
              onChange={(event) => setFilterType(event.target.value)}
            >
              <option value="today">Today</option>
              <option value="month">Month Wise</option>
              <option value="day">Particular Day</option>
              <option value="range">Date Range</option>
            </select>
          </div>

          {filterType === 'month' && (
            <div className="form-group">
              <label htmlFor="selectedMonth">Select Month</label>
              <input
                id="selectedMonth"
                type="month"
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
              />
            </div>
          )}

          {filterType === 'day' && (
            <div className="form-group">
              <label htmlFor="selectedDay">Select Day</label>
              <input
                id="selectedDay"
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
              />
            </div>
          )}

          {filterType === 'range' && (
            <>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  max={endDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="stats">
        <div className="stat-box success">
          <h3>Invoices (Filtered)</h3>
          <div className="value">{filteredInvoices.length}</div>
        </div>
        <div className="stat-box warning">
          <h3>Revenue (Filtered)</h3>
          <div className="value">₹{totalRevenue.toLocaleString()}</div>
        </div>
        <div className="stat-box">
          <h3>Active Products</h3>
          <div className="value">{products.length}</div>
        </div>
        <div className="stat-box danger">
          <h3>Stock Items</h3>
          <div className="value">{totalProducts}</div>
        </div>
      </div>

      <div className="card">
        <h2>📊 Recent Invoices</h2>
        {filteredInvoices.length === 0 ? (
          <div className="empty-state">
            <h3>No invoices for selected filter</h3>
            <p>Try changing day, month, or date range</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.slice(0, 10).map(invoice => (
                <tr key={invoice.id}>
                  <td><strong>{invoice.invoiceNo}</strong></td>
                  <td>{invoice.customerName}</td>
                  <td>{invoice.date}</td>
                  <td>₹{invoice.total?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>🛠️ Top Products</h2>
        {products.length === 0 ? (
          <div className="empty-state">
            <h3>No products</h3>
            <p>Add products to your inventory</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map(product => (
                <tr key={product.id}>
                  <td><strong>{product.name}</strong></td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Dashboard
