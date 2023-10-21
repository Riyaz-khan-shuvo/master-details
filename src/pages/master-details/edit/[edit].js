import React, { useEffect, useState } from 'react';
import { getCompanyDropdown, getItemDropdown, getSinglePurchase, getSupplierDropdown } from '../../../services/productDetails.services';
import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';

const MasterDetailsEdit = () => {

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
    const router = useRouter()
    const id = router.query.edit;
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
        const singlePurchase = async (id) => {
            const item = await getSinglePurchase(id)
            setPurchaseData(item.data)
        }
        getSupplier()
        getCompany()
        getItem()
        if (id != undefined) {
            singlePurchase(id)
        }
    }, [id])

    console.log(purchaseData);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setPurchaseData({
            ...purchaseData,
            [name]: value
        })
    }

    const handleRowElementChange = (e, rowIndex, field) => {
        let { type, value } = e.target;
        if (type == 'select-one' && purchaseData.purchaseItems.find(a => a.itemId == value)) {
            alert("Please Choose another value this value has already selected !")
            e.target.value = "";
            purchaseData.purchaseItems[rowIndex].itemId = 0
        }
        else {
            const updatedRows = [...purchaseData.purchaseItems];
            updatedRows[rowIndex][field] = value;

            setPurchaseData({ ...purchaseData, updatedRows });
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
            purchaseId: Number(id),
            itemId: 0,
            batchNumber: '',
            quantity: 0,
            purchasesPrice: 0,
            sellPrice: 0
        };

        if (item.data.data.length > purchaseData.purchaseItems.length) {
            setPurchaseData({ ...purchaseData, purchaseItems: [...purchaseData.purchaseItems, newRow] });
        }
    };

    const handleRemoveRow = (rowIndex) => {

        if (purchaseData.purchaseItems.length > 1) {
            const updatedRows = [...purchaseData.purchaseItems];
            updatedRows.splice(rowIndex, 1);
            const newPurchaseItems = purchaseData.purchaseItems = updatedRows
            setPurchaseData({ ...purchaseData, newPurchaseItems });
        } else {
            alert("At least one table will show");
        }
    };

    return (
        <div>
            <div>
                <div className="my-5">
                    {
                        purchaseData.purchaseItems ? <div>
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
                                                                    value={purchaseData.purchasesDate.split('T')[0]}
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
                                                                    value={purchaseData.purchasesCode}
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
                                                                    value={purchaseData.purchasesType}
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
                                                                <select value={purchaseData.supplierId} onChange={(e) => handleChange(e)} className="form-select" name="supplierId" id="">
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
                                                                <select value={purchaseData.companyId} onChange={(e) => handleChange(e)} className="form-select" name="companyId" id="">
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
                                                                    value={purchaseData.warrenty}
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
                                                                    value={purchaseData.attn}
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
                                                                    value={purchaseData.lcNumber}
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
                                                                    value={purchaseData.lcDate.split('T')[0]}
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
                                                                    value={purchaseData.poNumber}
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

                                                        {purchaseData.purchaseItems.map((row, rowIndex) => (
                                                            <tr key={rowIndex}>
                                                                <td>
                                                                    <div className="row mb-2">
                                                                        <div className="col">
                                                                            <select value={row.itemId} onChange={(e) => handleRowElementChange(e, rowIndex, 'itemId')} className="form-select" name="itemId" id="">
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
                                                                <textarea onChange={(e) => handleChange(e)} rows="2" className="form-control" name="remarks"
                                                                    value={purchaseData.remarks}

                                                                ></textarea>
                                                                <span className="text-danger field-validation-valid" ></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">

                                                        <div className="row mb-2">
                                                            <label className="col-md-6 col-form-label" htmlFor="discountPercent">Discount Percent (%) </label>
                                                            <div className="col">
                                                                <input
                                                                    onChange={(e) => handleChange(e)}
                                                                    className="form-control"
                                                                    type="number"
                                                                    name='discountPercent'
                                                                    value={purchaseData.discountPercent}
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
                                                                    value={purchaseData.vatPercent}
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
                                                                    value={purchaseData.paymentType}
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
                                                                    value={purchaseData.discountAmount}
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
                                                                    value={purchaseData.vatAmount}
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
                                                                    value={purchaseData.paymentAmount}
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
                        </div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default MasterDetailsEdit;