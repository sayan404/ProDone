import React, { useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import Button from '@mui/material/Button'
import MetaData from "../Layout/MetaData"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SideBar from "./Sidebar"
import { useNavigate } from "react-router-dom"
import {
    deleteOrder,
    getAllOrders,
    clearErrors,
} from "../../Actions/orederAction"
import { DELETE_ORDER_RESET } from "../../Constants/OrderConstants"

const OrderList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const { error, orders } = useSelector((state) => state.allOrders)

    const { error: deleteError, isDeleted } = useSelector((state) => state.order)

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success("Order Deleted Successfully")
            navigate("/admin/orders")
            dispatch({ type: DELETE_ORDER_RESET })
        }

        dispatch(getAllOrders())
    }, [dispatch, alert, error, deleteError, navigate, isDeleted])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
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
              console.log(params);
              console.log(params.row);
                return (
                    <>
                        <Link to={`/admin/order/${params.row.id}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(params.row.id, "id")
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                )
            },
        },
    ]

    const rows = []

    orders &&
        orders.forEach((item) => {
            console.log(item);
                rows.push({
                    id: item._id,
                    itemsQty: item.orderItems.length,
                    amount: item.totalPrice,
                    status: item.orderStatus,
                })
        })

    return (
        <>
            <MetaData title={`ALL ORDERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default OrderList