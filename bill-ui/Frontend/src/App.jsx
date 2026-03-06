import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import NewInvoice from './pages/NewInvoice'
import InvoiceHistory from './pages/InvoiceHistory'
import ProductManagement from './pages/ProductManagement'
import CustomerManagement from './pages/CustomerManagement'
import api from './services/api'

const mapProduct = (product) => ({
  ...product,
  id: product._id || product.id,
})

const mapCustomer = (customer) => ({
  ...customer,
  id: customer._id || customer.id,
})

const mapInvoice = (invoice) => ({
  ...invoice,
  id: invoice._id || invoice.id,
  date: invoice.date
    ? new Date(invoice.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0],
  items: (invoice.items || []).map((item, index) => ({
    ...item,
    id: item.id || `${invoice._id || invoice.id}-${index}`,
  })),
})

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [invoices, setInvoices] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [productData, customerData, invoiceData] = await Promise.all([
          api.get('/products'),
          api.get('/customers'),
          api.get('/invoices'),
        ])

        setProducts(productData.map(mapProduct))
        setCustomers(customerData.map(mapCustomer))
        setInvoices(invoiceData.map(mapInvoice))
      } catch (error) {
        console.error('Failed to load data from backend:', error.message)
      }
    }

    loadInitialData()
  }, [])

  const handleAddInvoice = async (invoice) => {
    try {
      const createdInvoice = await api.post('/invoices', invoice)

      const normalizedPhone = (invoice.customerPhone || '').trim()
      const normalizedName = (invoice.customerName || '').trim()

      if (normalizedPhone && normalizedName) {
        const customerExists = customers.some(
          (customer) => (customer.phone || '').trim() === normalizedPhone
        )

        if (!customerExists) {
          const createdCustomer = await api.post('/customers', {
            name: normalizedName,
            phone: normalizedPhone,
            email: '',
            address: '',
          })

          setCustomers((prev) => [mapCustomer(createdCustomer), ...prev])
        }
      }

      setInvoices((prev) => [mapInvoice(createdInvoice), ...prev])
      setCurrentPage('history')
    } catch (error) {
      alert(error.message || 'Failed to create invoice')
    }
  }

  const handleAddProduct = async (product) => {
    try {
      const createdProduct = await api.post('/products', product)
      setProducts((prev) => [mapProduct(createdProduct), ...prev])
    } catch (error) {
      alert(error.message || 'Failed to add product')
    }
  }

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const savedProduct = await api.put(`/products/${id}`, updatedProduct)
      setProducts((prev) => prev.map((p) => (p.id === id ? mapProduct(savedProduct) : p)))
    } catch (error) {
      alert(error.message || 'Failed to update product')
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      alert(error.message || 'Failed to delete product')
    }
  }

  const handleAddCustomer = async (customer) => {
    try {
      const createdCustomer = await api.post('/customers', {
        name: customer.name,
        phone: customer.phone,
      })
      setCustomers((prev) => [mapCustomer(createdCustomer), ...prev])
    } catch (error) {
      alert(error.message || 'Failed to add customer')
    }
  }

  const handleUpdateCustomer = async (id, updatedCustomer) => {
    try {
      const savedCustomer = await api.put(`/customers/${id}`, {
        name: updatedCustomer.name,
        phone: updatedCustomer.phone,
      })
      setCustomers((prev) => prev.map((c) => (c.id === id ? mapCustomer(savedCustomer) : c)))
    } catch (error) {
      alert(error.message || 'Failed to update customer')
    }
  }

  const handleDeleteCustomer = async (id) => {
    try {
      await api.delete(`/customers/${id}`)
      setCustomers((prev) => prev.filter((c) => c.id !== id))
    } catch (error) {
      alert(error.message || 'Failed to delete customer')
    }
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard invoices={invoices} products={products} customers={customers} />}
        {currentPage === 'invoice' && <NewInvoice products={products} onAddInvoice={handleAddInvoice} />}
        {currentPage === 'history' && <InvoiceHistory invoices={invoices} />}
        {currentPage === 'products' && (
          <ProductManagement 
            products={products} 
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
        {currentPage === 'customers' && (
          <CustomerManagement 
            customers={customers}
            invoices={invoices}
            onAddCustomer={handleAddCustomer}
            onUpdateCustomer={handleUpdateCustomer}
            onDeleteCustomer={handleDeleteCustomer}
          />
        )}
      </main>
    </div>
  )
}

export default App
