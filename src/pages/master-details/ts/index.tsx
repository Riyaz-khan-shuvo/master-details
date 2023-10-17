import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

interface TableRow {
    [key: string]: string | number;
    itemName: string;
    batchNumber: string;
    quantity: number;
    purchasePrice: number;
    sellPrice: number;
    expireDate: string;
    amount: number;
}

const MasterDetails: React.FC = () => {
    const [tableRows, setTableRows] = useState<TableRow[]>([
        {
            itemName: '',
            batchNumber: '',
            quantity: 0,
            purchasePrice: 0,
            sellPrice: 0,
            expireDate: '',
            amount: 0,
        },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, field: string) => {
        const updatedRows = [...tableRows];
        updatedRows[rowIndex][field] = e.target.value;
        setTableRows(updatedRows);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    }

    const handleAddRow = () => {
        const newRow: TableRow = {
            itemName: '',
            batchNumber: '',
            quantity: 0,
            purchasePrice: 0,
            sellPrice: 0,
            expireDate: '',
            amount: 0,
        };

        setTableRows([...tableRows, newRow]);
    }

    const handleRemoveRow = (rowIndex: number) => {
        console.log(rowIndex);

        if (tableRows.length > 1) {
            const updatedRows = [...tableRows];
            updatedRows.splice(rowIndex, 1);
            setTableRows(updatedRows);
        }
        else{
            alert("At least one table will show")
        }
    }

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
                                                    <label className="col-form-label" htmlFor="firstName">
                                                        Purchase Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e, 0, 'itemName')}
                                                            className="form-control"
                                                            type="date"
                                                            value={tableRows[0].itemName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="firstName">
                                                        Purchase Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e, 0, 'itemName')}
                                                            className="form-control"
                                                            type="date"
                                                            value={tableRows[0].itemName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="firstName">
                                                        Purchase Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e, 0, 'itemName')}
                                                            className="form-control"
                                                            type="date"
                                                            value={tableRows[0].itemName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="firstName">
                                                        Purchase Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e, 0, 'itemName')}
                                                            className="form-control"
                                                            type="date"
                                                            value={tableRows[0].itemName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="firstName">
                                                        Purchase Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e, 0, 'itemName')}
                                                            className="form-control"
                                                            type="date"
                                                            value={tableRows[0].itemName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="firstName">
                                                        Purchase Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e, 0, 'itemName')}
                                                            className="form-control"
                                                            type="date"
                                                            value={tableRows[0].itemName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row mb-2">
                                                    <label className="col-form-label" htmlFor="firstName">
                                                        Purchase Date
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            onChange={(e) => handleChange(e, 0, 'itemName')}
                                                            className="form-control"
                                                            type="date"
                                                            value={tableRows[0].itemName}
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
                                                    <td>Expire Date</td>
                                                    <td>Amount</td>
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
                                                                    <input
                                                                        onChange={(e) => handleChange(e, rowIndex, 'itemName')}
                                                                        className="form-control"
                                                                        type="text"
                                                                        value={row.itemName}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleChange(e, rowIndex, 'itemName')}
                                                                        className="form-control"
                                                                        type="text"
                                                                        value={row.itemName}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleChange(e, rowIndex, 'itemName')}
                                                                        className="form-control"
                                                                        type="text"
                                                                        value={row.itemName}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleChange(e, rowIndex, 'itemName')}
                                                                        className="form-control"
                                                                        type="text"
                                                                        value={row.itemName}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleChange(e, rowIndex, 'itemName')}
                                                                        className="form-control"
                                                                        type="text"
                                                                        value={row.itemName}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleChange(e, rowIndex, 'itemName')}
                                                                        className="form-control"
                                                                        type="date"
                                                                        value={row.itemName}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row mb-2">
                                                                <div className="col">
                                                                    <input
                                                                        onChange={(e) => handleChange(e, rowIndex, 'itemName')}
                                                                        className="form-control"
                                                                        type="text"
                                                                        value={row.itemName}
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

export default MasterDetails;
