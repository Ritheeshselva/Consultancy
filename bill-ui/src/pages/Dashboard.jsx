function Dashboard({ invoices, products, customers }) {
  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0)
  const totalProducts = products.reduce((sum, p) => sum + (p.quantity || 0), 0)

  return (
    <div className="dashboard-page">
      <div className="header">
        <h1>Dashboard</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Welcome back to Selvam Motors Billing System</p>
      </div>

      <div className="stats">
        <div className="stat-box success">
          <h3>Total Invoices</h3>
          <div className="value">{invoices.length}</div>
        </div>
        <div className="stat-box warning">
          <h3>Total Revenue</h3>
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
        {invoices.length === 0 ? (
          <div className="empty-state">
            <h3>No invoices yet</h3>
            <p>Create your first invoice to get started</p>
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
              {invoices.slice(0, 5).map(invoice => (
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
