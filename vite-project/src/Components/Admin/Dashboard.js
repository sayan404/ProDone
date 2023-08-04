import React, { useEffect } from "react"
import Sidebar from "./Sidebar.js"
import "./Dashboard.css"
import { Link } from "react-router-dom"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer , PieChart, Pie, Cell } from 'recharts'
import { useSelector, useDispatch } from "react-redux"
import { getAdminProduct } from "../../Actions/ProductAction"
import MetaData from "../Layout/MetaData"
import { getAllOrders } from "../../Actions/orederAction.js"
import { getAllUsers } from "../../Actions/userAction.js"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
const Dashboard = () => {
  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.product)
  const { orders } = useSelector((state) => state.allOrders)
  const { users } = useSelector((state) => state.allUsers)

  let outOfStock = 0
  const productTracker = () => {
    products &&
    products.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1
        }
      })
  }


  let totalAmount = 0
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice
    })


  let i = 0

  const lineState = []
  const donutState = []
  const lineChart = () => {
    orders &&
      orders.forEach((item) => {
        totalAmount += item.totalPrice
        lineState.push({
          name: i,
          uv: i,
          pv: totalAmount,
          amt: totalAmount
        })
        i++
      })
  }
  const doughnutState = () => {
    products &&
      products.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1
        }
      })
    donutState.push({
      name: 'OutOfStock',
      value: outOfStock
    })
    donutState.push({
      name: 'InStock',
      value: (products.length - outOfStock)
    })
    console.log(products)
  }

  const COLORS = ['#0088FE', '#FFBB28']
  // '#FFBB28', '#FF8042'
  useEffect(() => {
    dispatch(getAdminProduct())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
    console.log(products)
  }, [dispatch])

  doughnutState()
  lineChart()
  productTracker()
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar className='sideBarFromDashboard' />
      <div className="dashboardContainer">
        <div className="dashtext">Dashboard</div>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Sell Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <ShoppingCartIcon sx={{ fontSize: '40' }} />
              <p style={{ padding: '2vh 0vh 0vh 0vh' }}>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <ListAltIcon sx={{ fontSize: '40' }} />
              <p style={{ padding: '2vh 0vh 0vh 0vh' }}>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <SupervisedUserCircleIcon sx={{ fontSize: '40' }} />
              <p style={{ padding: '2vh 0vh 0vh 0vh' }}> Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={800} height={400} data={lineState}>
              <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
              <CartesianGrid stroke="#ccata={lineState} c" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="doughnutChart">
          <PieChart width={1000} height={500} >
            <Pie
              dataKey="value"
              data={donutState}
              cx='150px'
              cy='150px'
              innerRadius={80}
              outerRadius={150}
              fill="#8884d8"
              isAnimationActive={false}
              label
            Tooltip
            >
              {donutState.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  )
}

export default Dashboard