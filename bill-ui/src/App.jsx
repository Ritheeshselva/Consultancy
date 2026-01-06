import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import NewInvoice from './pages/NewInvoice'
import InvoiceHistory from './pages/InvoiceHistory'
import ProductManagement from './pages/ProductManagement'
import CustomerManagement from './pages/CustomerManagement'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [invoices, setInvoices] = useState([])
  const [products, setProducts] = useState([
    { id: 1, name: 'AC Induction Motor 1HP', category: 'Motor', price: 3500, quantity: 5 },
    { id: 2, name: 'AC Induction Motor 2HP', category: 'Motor', price: 5500, quantity: 3 },
    { id: 3, name: 'DC Motor 5HP', category: 'Motor', price: 8000, quantity: 2 },
    { id: 4, name: 'Capacitor 10μF', category: 'Parts', price: 250, quantity: 50 },
    { id: 5, name: 'Motor Bearing', category: 'Parts', price: 450, quantity: 25 },
    { id: 6, name: 'Winding Wire', category: 'Parts', price: 80, quantity: 100 },
  ])
  const [customers, setCustomers] = useState([
    { id: 1, name: 'ABC Manufacturing', email: 'contact@abc.com', phone: '9876543210', address: '123 Industrial St' },
    { id: 2, name: 'XYZ Industries', email: 'info@xyz.com', phone: '9123456780', address: '456 Factory Road' },
  ])

  const handleAddInvoice = (invoice) => {
    const newInvoice = {
      ...invoice,
      id: Math.max(...invoices.map(i => i.id), 0) + 1,
      invoiceNo: `INV-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    }
    setInvoices([newInvoice, ...invoices])
    setCurrentPage('history')
  }

  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1,
    }
    setProducts([...products, newProduct])
  }

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p))
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleAddCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Math.max(...customers.map(c => c.id), 0) + 1,
    }
    setCustomers([...customers, newCustomer])
  }

  const handleUpdateCustomer = (id, updatedCustomer) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...updatedCustomer } : c))
  }

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard invoices={invoices} products={products} customers={customers} />}
        {currentPage === 'invoice' && <NewInvoice products={products} customers={customers} onAddInvoice={handleAddInvoice} />}
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
