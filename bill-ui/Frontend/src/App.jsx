import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import NewInvoice from './pages/NewInvoice'
import InvoiceHistory from './pages/InvoiceHistory'
import ProductManagement from './pages/ProductManagement'
import CustomerManagement from './pages/CustomerManagement'
import Login from './pages/Login'
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
  const storedUser = api.auth.getUser()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [invoices, setInvoices] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [userName, setUserName] = useState(storedUser?.name || '')
  const [userRole, setUserRole] = useState(storedUser?.role || '')
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const isAuthenticated = Boolean(api.auth.getToken())
  const isAdmin = userRole === 'admin'

  const handleLogout = () => {
    api.auth.logout()
    setUserName('')
    setUserRole('')
    setInvoices([])
    setProducts([])
    setCustomers([])
    setCurrentPage('dashboard')
  }

  const handleLogin = async (name, password) => {
    setIsAuthLoading(true)

    try {
      const response = await api.auth.login(name, password)
      setUserName(response.user.name)
      setUserRole(response.user.role)
      setCurrentPage(response.user.role === 'admin' ? 'dashboard' : 'invoice')
      return { ok: true }
    } catch (error) {
      return { ok: false, message: error.message || 'Login failed' }
    } finally {
      setIsAuthLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

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
        if (error.message === 'Unauthorized' || error.message === 'Invalid or expired token') {
          handleLogout()
          return
        }

        console.error('Failed to load data from backend:', error.message)
      }
    }

    loadInitialData()
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAdmin && currentPage === 'dashboard') {
      setCurrentPage('invoice')
    }
  }, [isAdmin, currentPage])

  const handleAddInvoice = async (invoice) => {
    try {
      const createdInvoice = await api.post('/invoices', invoice)

      const normalizedPhone = (invoice.customerPhone || '').trim()
      const normalizedName = (invoice.customerName || '').trim()

      if (isAdmin && normalizedPhone && normalizedName) {
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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} loading={isAuthLoading} />
  }

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userName={userName}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {currentPage === 'dashboard' && isAdmin && (
          <Dashboard invoices={invoices} products={products} customers={customers} />
        )}
        {currentPage === 'invoice' && <NewInvoice products={products} onAddInvoice={handleAddInvoice} />}
        {currentPage === 'history' && <InvoiceHistory invoices={invoices} />}
        {currentPage === 'products' && (
          <ProductManagement 
            products={products} 
            isAdmin={isAdmin}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
        {currentPage === 'customers' && (
          <CustomerManagement 
            customers={customers}
            invoices={invoices}
            isAdmin={isAdmin}
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
