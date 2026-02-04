import { useState } from 'react'
import './NewInvoice.css'

function NewInvoice({ products, customers, onAddInvoice }) {
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [items, setItems] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState('')
  const [gst, setGst] = useState('18')
  const [notes, setNotes] = useState('')

  const handleCustomerSelect = (e) => {
    const customerId = e.target.value
    setSelectedCustomer(customerId)
    if (customerId) {
      const customer = customers.find(c => c.id === parseInt(customerId))
      setCustomerName(customer.name)
      setCustomerPhone(customer.phone)
    }
  }

  const handleAddItem = () => {
    if (!selectedProduct || !quantity) {
      alert('Please select a product and enter quantity')
      return
    }
    const product = products.find(p => p.id === parseInt(selectedProduct))
    const newItem = {
      id: Math.random(),
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: parseInt(quantity),
      total: product.price * parseInt(quantity),
    }
    setItems([...items, newItem])
    setSelectedProduct('')
    setQuantity('')
  }

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const gstAmount = (subtotal * parseInt(gst)) / 100
  const total = subtotal + gstAmount

  const handleSubmit = () => {
    if (!customerName || items.length === 0) {
      alert('Please select a customer and add items')
      return
    }
    onAddInvoice({
      customerName,
      customerPhone,
      items,
      subtotal,
      gst: parseInt(gst),
      gstAmount,
      total,
      notes,
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
              <label>Select Customer</label>
              <select value={selectedCustomer} onChange={handleCustomerSelect}>
                <option value="">-- Select Customer --</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </div>
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
          <div className="form-row">
            <div className="form-group">
              <label>Product</label>
              <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                <option value="">-- Select Product --</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ₹{product.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                placeholder="Enter quantity"
              />
            </div>
            <div className="form-group">
              <label>&nbsp;</label>
              <button onClick={handleAddItem} style={{ width: '100%' }}>+ Add Item</button>
            </div>
          </div>

          {items.length > 0 && (
            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
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
            <select value={gst} onChange={(e) => setGst(e.target.value)}>
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes or terms"
              rows="4"
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
