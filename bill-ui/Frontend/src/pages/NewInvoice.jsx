import { useState } from 'react'
import './NewInvoice.css'

function NewInvoice({ products, onAddInvoice }) {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [items, setItems] = useState([])
  const [productSearch, setProductSearch] = useState('')
  const [gst, setGst] = useState('18')

  const handleAddItem = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => String(item.productId) === String(product.id))

      if (existingItem) {
        return prevItems.map((item) => {
          if (String(item.productId) !== String(product.id)) {
            return item
          }

          const updatedQuantity = item.quantity + 1
          return {
            ...item,
            quantity: updatedQuantity,
            total: item.price * updatedQuantity,
          }
        })
      }

      return [
        ...prevItems,
        {
          id: Math.random(),
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
          total: product.price,
        },
      ]
    })
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  )

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleDecreaseItemQuantity = (id) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id !== id) {
            return item
          }

          const updatedQuantity = item.quantity - 1
          if (updatedQuantity <= 0) {
            return null
          }

          return {
            ...item,
            quantity: updatedQuantity,
            total: item.price * updatedQuantity,
          }
        })
        .filter(Boolean)
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const gstValue = Number(gst) || 0
  const gstAmount = (subtotal * gstValue) / 100
  const total = subtotal + gstAmount

  const handleSubmit = () => {
    if (!customerName || !customerPhone || items.length === 0) {
      alert('Please enter customer name, phone, and add items')
      return
    }
    onAddInvoice({
      customerName,
      customerPhone,
      items,
      subtotal,
      gst: gstValue,
      gstAmount,
      total,
    })
  }

  return (
    <div className="new-invoice">
      <h1 className="page-title">Create New Invoice</h1>

      <div className="invoice-form">
        <div className="form-section">
          <h2>Customer Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Customer Name</label>
              <input 
                type="text" 
                value={customerName} 
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                value={customerPhone} 
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Add Items</h2>
          <div className="form-group">
            <label>Search Product</label>
            <input
              type="text"
              placeholder="Search by product name..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
          </div>

          <div className="product-list">
            {filteredProducts.length === 0 ? (
              <p className="no-products">No matching products found</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-row">
                  <div className="product-info">
                    <strong>{product.name}</strong>
                    <span>₹{product.price}</span>
                  </div>
                  <button
                    type="button"
                    className="add-product-btn"
                    onClick={() => handleAddItem(product)}
                  >
                    +
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <table className="items-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.productName}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="qty-control">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => handleDecreaseItemQuantity(item.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                      </div>
                    </td>
                    <td>₹{item.total}</td>
                    <td>
                      <button 
                        className="danger" 
                        onClick={() => handleRemoveItem(item.id)}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="form-section">
          <h2>Additional Information</h2>
          <div className="form-group">
            <label>GST %</label>
            <input
              type="number"
              min="0"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
              placeholder="Enter GST percentage"
            />
          </div>
        </div>

        {items.length > 0 && (
          <div className="invoice-summary">
            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>GST ({gst}%):</span>
                <span>₹{gstAmount.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button 
            className="success"
            onClick={handleSubmit}
            disabled={items.length === 0}
            style={{ opacity: items.length === 0 ? 0.5 : 1, cursor: items.length === 0 ? 'not-allowed' : 'pointer' }}
          >
            ✓ Create Invoice
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewInvoice
