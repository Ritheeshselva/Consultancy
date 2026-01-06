import { useState } from 'react'
import './InvoiceHistory.css'

function InvoiceHistory({ invoices }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePrint = (invoice) => {
    window.print()
  }

  return (
    <div className="invoice-history">
      <div className="header">
        <h1>📋 Invoice History</h1>
        <input
          type="text"
          placeholder="Search by Invoice No or Customer Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="empty-state" style={{ marginTop: '50px' }}>
          <h3>No invoices found</h3>
          <p>Create your first invoice to see it here</p>
        </div>
      ) : (
        <>
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td><strong>{invoice.invoiceNo}</strong></td>
                    <td>{invoice.customerName}</td>
                    <td>{invoice.customerPhone}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.items.length}</td>
                    <td className="amount">₹{invoice.total?.toLocaleString()}</td>
                    <td>
                      <button
                        className="secondary"
                        onClick={() => setSelectedInvoice(invoice)}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedInvoice && (
            <div className="modal" onClick={() => setSelectedInvoice(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Invoice Details</h2>
                  <button className="close-btn" onClick={() => setSelectedInvoice(null)}>×</button>
                </div>

                <div className="invoice-preview">
                  <div className="invoice-header">
                    <div className="company-info">
                      <h1>SELVAM MOTORS</h1>
                      <p>Electrical Motor Shop</p>
                      <p>Phone: 98765-43210</p>
                      <p>Email: contact@selvammotors.com</p>
                    </div>
                    <div className="invoice-meta">
                      <p><strong>Invoice No:</strong> {selectedInvoice.invoiceNo}</p>
                      <p><strong>Date:</strong> {selectedInvoice.date}</p>
                    </div>
                  </div>

                  <div className="invoice-details">
                    <h3>Bill To:</h3>
                    <p><strong>{selectedInvoice.customerName}</strong></p>
                    <p>Phone: {selectedInvoice.customerPhone}</p>
                  </div>

                  <table className="invoice-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map(item => (
                        <tr key={item.id}>
                          <td>{item.productName}</td>
                          <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                          <td style={{ textAlign: 'right' }}>₹{item.price}</td>
                          <td style={{ textAlign: 'right' }}>₹{item.total?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="invoice-summary">
                    <div className="summary-box">
                      <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>₹{selectedInvoice.subtotal?.toLocaleString()}</span>
                      </div>
                      <div className="summary-row">
                        <span>GST ({selectedInvoice.gst}%):</span>
                        <span>₹{selectedInvoice.gstAmount?.toLocaleString()}</span>
                      </div>
                      <div className="summary-row total">
                        <span>Total Amount:</span>
                        <span>₹{selectedInvoice.total?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {selectedInvoice.notes && (
                    <div className="notes">
                      <strong>Notes:</strong>
                      <p>{selectedInvoice.notes}</p>
                    </div>
                  )}

                  <div style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-light)', fontSize: '12px' }}>
                    <p>Thank you for your business!</p>
                    <p>This is a computer generated document.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button onClick={() => handlePrint(selectedInvoice)}>🖨️ Print</button>
                  <button className="secondary" onClick={() => setSelectedInvoice(null)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default InvoiceHistory
