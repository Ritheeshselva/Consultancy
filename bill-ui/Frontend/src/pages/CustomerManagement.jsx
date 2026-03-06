import { useState } from 'react'
import './CustomerManagement.css'

function CustomerManagement({ customers, invoices, onAddCustomer, onUpdateCustomer, onDeleteCustomer }) {
  const [showModal, setShowModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const latestInvoiceByPhone = invoices.reduce((acc, invoice) => {
    const phone = (invoice.customerPhone || '').trim()
    if (!phone) {
      return acc
    }

    const existing = acc[phone]
    const invoiceDate = new Date(invoice.date || 0).getTime()
    const existingDate = existing ? new Date(existing.date || 0).getTime() : 0

    if (!existing || invoiceDate >= existingDate) {
      acc[phone] = invoice
    }

    return acc
  }, {})

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  )

  const handleOpenModal = (customer = null) => {
    if (customer) {
      setEditingCustomer(customer)
      setFormData({
        name: customer.name || '',
        phone: customer.phone || '',
      })
    } else {
      setEditingCustomer(null)
      setFormData({ name: '', phone: '' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingCustomer(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) {
      alert('Please fill in name and phone fields')
      return
    }

    if (editingCustomer) {
      onUpdateCustomer(editingCustomer.id, formData)
    } else {
      onAddCustomer(formData)
    }
    handleCloseModal()
  }

  return (
    <div className="customer-management">
      <div className="header">
        <h1>👥 Customer Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={() => handleOpenModal()}>+ Add Customer</button>
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="empty-state" style={{ marginTop: '50px' }}>
          <h3>No customers found</h3>
          <p>Add your first customer to get started</p>
        </div>
      ) : (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Invoice ID</th>
                <th>Date of Purchase</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => {
                const latestInvoice = latestInvoiceByPhone[(customer.phone || '').trim()]

                return (
                <tr key={customer.id}>
                  <td><strong>{customer.name}</strong></td>
                  <td>{customer.phone}</td>
                  <td>{latestInvoice?.invoiceNo || '-'}</td>
                  <td>{latestInvoice?.date || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="secondary"
                        onClick={() => handleOpenModal(customer)}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        Edit
                      </button>
                      <button
                        className="danger"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this customer?')) {
                            onDeleteCustomer(customer.id)
                          }
                        }}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., ABC Manufacturing"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., 9876543210"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={handleSubmit} className="success">
                {editingCustomer ? 'Update' : 'Add'} Customer
              </button>
              <button className="secondary" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerManagement
