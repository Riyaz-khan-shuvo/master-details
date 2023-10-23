import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePurchase } from '../../../services/productDetails.services';
import moment from 'moment/moment';
import Link from 'next/link';
import { Button, Table } from 'react-bootstrap';

const MasterDetails = () => {
    const router = useRouter()
    const id = router.query.details;

    const [data, setData] = useState({})
    useEffect(() => {
        const getData = async (paramsId) => {
            const getAllData = await getSinglePurchase(paramsId)
            setData(getAllData);
        };
        if (id) {
            getData(id);
        }
    }, [id]);


    return (
        <div>
            <div className='my-5'>

                {
                    data.data ? <div className="emp-bg">
                        <div className="container">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between">
                                        <h3 className="card-title">Master Details</h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <dl className="row">
                                                <dt className="col-md-6">
                                                    Purchase Id
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.id}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Purchase Date
                                                </dt>
                                                <dd className="col-md-6">
                                                    {moment(data.data.purchasesDate).format('DD-MM-YYYY')}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Purchase Code
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.purchasesCode}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Purchase Type
                                                </dt>

                                                <dd className="col-md-6">
                                                    {data.data.purchasesType}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Phone Number
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.poNumber}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Warranty
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.warrenty}
                                                </dd>
                                                <dt className="col-md-6">
                                                    LC Number
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.lcNumber}
                                                </dd>
                                                <dt className="col-md-6">
                                                    LC Date
                                                </dt>
                                                <dd className="col-md-6">
                                                    {moment(data.data.lcDate).format("MMMM Do YYYY")}
                                                </dd>
                                            </dl>
                                        </div>


                                        <div className="col-md-6">
                                            <dl className="row">
                                                <dt className="col-md-6">
                                                    Discount Amount
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.discountAmount}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Discount Percent
                                                </dt>
                                                <dd className="col-md-6">
                                                    {(data.data.discountPercent)}
                                                </dd>
                                                <dt className="col-md-6">
                                                    VAT Amount
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.vatAmount}
                                                </dd>
                                                <dt className="col-md-6">
                                                    VAT Percent
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.vatPercent}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Payment Amount
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.paymentAmount}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Payment Type
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.paymentType}
                                                </dd>

                                                <dt className="col-md-6">
                                                    Company Id
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.companyId}
                                                </dd>
                                                <dt className="col-md-6">
                                                    Remarks
                                                </dt>
                                                <dd className="col-md-6">
                                                    {data.data.remarks}
                                                </dd>
                                            </dl>
                                        </div>

                                        {
                                            data.data.purchaseItems.length > 0 ?
                                                <div className="col-md-12">
                                                    <Table>
                                                        <thead >
                                                            <tr className="table-dark">
                                                                <th>#</th>
                                                                <th>Item Id </th>
                                                                <th>Batch Number </th>
                                                                <th>Quantity </th>
                                                                <th>Purchase Price </th>
                                                                <th>Sell Price </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.data.purchaseItems != undefined && data.data.purchaseItems.map((da, index) =>

                                                                    <tr key={index}>
                                                                        <td> {index + 1} </td>
                                                                        <td> {da.itemId} </td>
                                                                        <td> {da.batchNumber} </td>
                                                                        <td> {da.quantity} </td>
                                                                        <td> {da.purchasesPrice} </td>
                                                                        <td> {da.sellPrice} </td>

                                                                    </tr>

                                                                )
                                                            }


                                                        </tbody>

                                                    </Table>
                                                </div>
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-end">

                                        <Link className="btn btn-outline-danger btn-sm me-3" href="/master-details">
                                            Master Details
                                        </Link>
                                        <Link className="btn btn-outline-primary btn-sm me-3" href={`/master-details/edit/${id}`}>
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""
                }

            </div>
        </div>
    );
};

export default MasterDetails;