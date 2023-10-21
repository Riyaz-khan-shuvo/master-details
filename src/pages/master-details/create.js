import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { addPurchaseInfo, getCompanyDropdown, getItemDropdown, getSupplierDropdown } from '../../services/productDetails.services';
import { useRouter } from 'next/router';



const Master = () => {
    const [purchaseData, setPurchaseData] = useState({
        purchasesDate: "",
        purchasesCode: "",
        purchasesType: "",
        supplierId: 1,
        warrenty: "",
        attn: "",
        lcNumber: 0,
        lcDate: "",
        poNumber: "",
        remarks: "",
        companyId: 1,
        discountAmount: 0,
        discountPercent: 0,
        vatAmount: 0,
        vatPercent: 0,
        paymentAmount: 0,
        paymentType: "",
        cancle: false,
        purchaseItems: []
    });
    const [tableRows, setTableRows] = useState([
        {
            itemId: 0,
            batchNumber: '',
            quantity: 0,
            purchasesPrice: 0,
            sellPrice: 0
        },
    ]);

    const [supplier, setSupplier] = useState({
        data: {
            data: []
        }
    })
    const [company, setCompany] = useState({
        data: {
            data: []
        }
    })
    const [item, setItem] = useState({
        data: {
            data: []
        }
    })
    useEffect(() => {
        const getSupplier = async () => {
            const supplier = await getSupplierDropdown()
            setSupplier(supplier)
        }
        const getCompany = async () => {
            const company = await getCompanyDropdown()
            setCompany(company)
        }
        const getItem = async () => {
            const item = await getItemDropdown()
            setItem(item)
        }
        getSupplier()
        getCompany()
        getItem()
    }, [])

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPurchaseData({
            ...purchaseData,
            [name]: value
        })
    }

    const handleRowElementChange = (e, rowIndex, field) => {
        let { type, value } = e.target;
        if (type == 'select-one' && tableRows.find(a => a.itemId == value)) {
            alert("Please Choose another value this value has already selected !")
            e.target.value = "";
            tableRows[rowIndex].itemId = 0
        }
        else {
            const updatedRows = [...tableRows];
            updatedRows[rowIndex][field] = value;
            setTableRows(updatedRows);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const allInfo = {
                ...purchaseData,
                purchaseItems: [...tableRows]
            }
            const addPurchase = await addPurchaseInfo(allInfo);
            console.log(addPurchase);
            e.target.reset()
            router.push("/master-details")
        } catch (error) {
            console.error('Error adding:', error);
        }
    }


    const handleAddRow = () => {
        const newRow = {
            itemId: 0,
            batchNumber: '',
            quantity: 0,
            purchasesPrice: 0,
            sellPrice: 0
        };

        if (item.data.data.length > tableRows.length) {
            setTableRows([...tableRows, newRow]);
        }
    };

    const handleRemoveRow = (rowIndex) => {

        if (tableRows.length > 1) {
            const updatedRows = [...tableRows];
            updatedRows.splice(rowIndex, 1);
            setTableRows(updatedRows);
        } else {
            alert("At least one table will show");
        }
    };


    return (
        <div>
            <div className="my-5">
                <div>
                    <section className="container-fluid">
                        <div className="">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Purchase</h3>
                                </div>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="card-body">
                                        <div className="row mt-2">
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="purchasesDate">
                                                        Purchase Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="date"
                                                            name='purchasesDate'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="purchasesCode">
                                                        Purchase Code
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="text"
                                                            name='purchasesCode'
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="purchasesType">
                                                        Purchase Type
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="text"
                                                            name='purchasesType'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="firstName">
                                                        Supplier
                                                    </label>
                                                    <div className="col">
                                                        <select onChange={(e) => handleChange(e)} className="form-select" name="supplierId" id="">
                                                            <option value=" ">Select Supplier </option>
                                                            {
                                                                supplier.data.data.map((data, index) => <option value={data.id} key={index}> {data.supplierName} </option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="companyId">
                                                        Company
                                                    </label>
                                                    <div className="col">
                                                        <select onChange={(e) => handleChange(e)} className="form-select" name="companyId" id="">
                                                            <option value=" ">Select Company </option>
                                                            {
                                                                company.data.data.map((data, index) => <option value={data.id} key={index}> {data.companyName} </option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="purchasesType">
                                                        Warranty
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="text"
                                                            name='warrenty'
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="purchasesType">
                                                        attn
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="text"
                                                            name='attn'
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="purchasesType">
                                                        LC Number
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="number"
                                                            name='lcNumber'
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="purchasesType">
                                                        LC Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="date"
                                                            name='lcDate'
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="purchasesType">
                                                        Phone Number
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="text"
                                                            name='poNumber'
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <Table>
                                            <thead>
                                                <tr>
                                                    <td>Item Name</td>
                                                    <td>Batch Number</td>
                                                    <td>Quantity</td>
                                                    <td>Purchase Price</td>
                                                    <td>Sell Price</td>
                                                    <td>
                                                        <Button onClick={handleAddRow} className="btn btn-success">
                                                            +
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {tableRows.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        <td>
                                                            <div className="row mb-2">

                                                                <div className="col">
                                                                    <select onChange={(e) => handleRowElementChange(e, rowIndex, 'itemId')} className="form-select" name="itemId" id="">
                                                                        <option value="">Select Items </option>
                                                                        {
                                                                            item.data.data.map((data, index) => <option value={data.id} key={index}> {data.itemName} </option>)
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleRowElementChange(e, rowIndex, 'batchNumber')}
                                                                        className="form-control"
                                                                        type="text"
                                                                        name='batchNumber'
                                                                        value={row.batchNumber}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleRowElementChange(e, rowIndex, 'quantity')}
                                                                        className="form-control"
                                                                        type="number"
                                                                        value={row.quantity}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleRowElementChange(e, rowIndex, 'purchasesPrice')}
                                                                        className="form-control"
                                                                        type="number"
                                                                        value={row.purchasesPrice}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleRowElementChange(e, rowIndex, 'sellPrice')}
                                                                        className="form-control"
                                                                        type="number"
                                                                        value={row.sellPrice}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <Button
                                                                onClick={() => handleRemoveRow(rowIndex)}
                                                                className="btn btn-danger"
                                                            >
                                                                -
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </Table>


                                        <div className="row mt-2">
                                            <div className="col-md-4">
                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="remarks">Remarks </label>
                                                    <div className="col-md-9">
                                                        <textarea onChange={(e) => handleChange(e)} rows="2" className="form-control" name="remarks"></textarea>
                                                        <span className="text-danger field-validation-valid" ></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                {/* <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="zipCode">Company </label>
                                                    <div className="col">
                                                        <select className="form-select" name="companyId" id="">
                                                            <option value=" ">Select Company </option>
                                                        </select>
                                                    </div>
                                                </div> */}
                                                <div className="row mb-2">
                                                    <label className="col-md-6 col-form-label" htmlFor="discountPercent">Discount Percent (%) </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="number"
                                                            name='discountPercent'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <label className="col-md-6 col-form-label" htmlFor="vatPercent">Vat Percent (%) </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="number"
                                                            name='vatPercent'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <label className="col-md-6 col-form-label" htmlFor="paymentType"> Payment Type  </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="text"
                                                            name='paymentType'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row mb-2">
                                                    <label className="col-md-6 col-form-label" htmlFor="discountAmount">Discount Amount </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="number"
                                                            name='discountAmount'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <label className="col-md-6 col-form-label" htmlFor="vatAmount">Vat Amount </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="number"
                                                            name='vatAmount'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <label className="col-md-6 col-form-label" htmlFor="paymentAmount"> Payment Amount  </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            type="number"
                                                            name='paymentAmount'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="card-footer">
                                        <div className="text-end">
                                            <button type="submit" className="btn btn-outline-primary btn-sm">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Master;
