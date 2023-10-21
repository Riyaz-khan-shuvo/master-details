import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getAllPurchaseInfo } from '../../services/productDetails.services';

const MasterDetailsIndex = () => {

    const [data, setData] = useState({
        data: [],
        total: 0
    });
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        const getData = async () => {
            const getAllData = await getAllPurchaseInfo()
            setData(getAllData);
        };
        getData();
    }, []);
    console.log(data);

    return (
        <div>
            <div className="emp-bg">
                <div className="my-3">
                    <div className="container">
                        <div className="card">
                            <div className="card-header">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h1 className='display-6 mb-3'> Purchase Information </h1>
                                    </div>
                                    <div>
                                        <Link className='btn btn-outline-primary btn-sm' href={"/master-details/create"}>   Add  </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className='d-flex justify-content-between my-3'>
                                    <div>
                                        <div>
                                            <span className='me-3'> Show</span>
                                            <select onChange={(e) => handleShowItem(e)} className="form-control-sm">
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='me-3'> Search  </label>
                                        <input type="text" onChange={(e) => handleSearch(e)} name="search" id="" />
                                    </div>
                                </div>
                                <div className='emp-table' >
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Purchases Code </th>
                                                <th>Purchases Type </th>
                                                <th>LC Number </th>
                                                <th>Phone </th>

                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.data.data != undefined && data.data.data.map((da, index) =>

                                                    <tr key={index}>
                                                        <td> {index + 1} </td>
                                                        <td> {da.purchasesCode} </td>
                                                        <td> {da.purchasesType} </td>
                                                        <td> {da.lcNumber} </td>
                                                        <td> {da.poNumber} </td>
                                                        <td>
                                                        <td>
                                                                <Link href={`master-details/edit/${da.id}`} className='btn btn-sm me-3 btn-success'> Edit </Link>
                                                                <Link href={`master-details/details/${da.id}`} className='btn btn-sm me-3 btn-primary'> Details</Link>
                                                                <Button
                                                                    className='btn btn-sm btn-danger'
                                                                    // onClick={() => handleDelete(da.id)}
                                                                >
                                                                    Delete 
                                                                </Button>
                                                            </td>
                                                        </td>
                                                    </tr>

                                                )
                                            }


                                        </tbody>

                                    </Table>
                                    {/* <div className="text-end">
                                        <ReactPaginate
                                            previousLabel={"previous"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination justify-content-end"}
                                            pageClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            previousClassName={"page-item"}
                                            previousLinkClassName={"page-link"}
                                            nextClassName={"page-item"}
                                            nextLinkClassName={"page-link"}
                                            breakClassName={"page-item"}
                                            breakLinkClassName={"page-link"}
                                            activeClassName={"active"}
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasterDetailsIndex;