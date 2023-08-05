import React, { useEffect } from "react"
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrders.css"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../Layout/Loader/Loader"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import MetaData from "../Layout/MetaData"
import LaunchIcon from '@mui/icons-material/Launch';
import { myOrders , clearErrors } from "../../Actions/orederAction"
const MyOrders = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { loading, orders , error  } = useSelector((state) => state.myOrder)
  const { user } = useSelector((state) => state.user)

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ]
  const rows = []

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      })
    })

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(myOrders())
  }, [dispatch, alert, error])

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <div id="myOrdersHeading">{user.name}'s Orders</div>
        </div>
      )}
    </>
  )
}

export default MyOrders