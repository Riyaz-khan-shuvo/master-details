import { apiUrl } from "../environments/environment";

async function getAllPurchaseInfo() {

    try {
        const response = await fetch(`${apiUrl}/Purchase/search?pageSize=35`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}





async function addPurchaseInfo(data) {
    const newData = { ...data, userId: 1 }
    console.log(newData);
    try {
        const response = await fetch(`${apiUrl}/Purchase`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding Employee:', error);
        throw error;
    }
}

async function getSupplierDropdown() {

    try {
        const response = await fetch(`${apiUrl}/Supplier/dropdown`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getCompanyDropdown() {

    try {
        const response = await fetch(`${apiUrl}/Company/dropdown`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getItemDropdown() {

    try {
        const response = await fetch(`${apiUrl}/Item/dropdown`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getSinglePurchase(id) {

    try {
        const response = await fetch(`${apiUrl}/Purchase/${id}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


async function editPurchasesInfo(id, purchaseInfo) {

    try {
        const response = await fetch(`${apiUrl}/Purchase/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(purchaseInfo),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding Employee:', error);
        throw error;
    }
}


async function deletePurchaseDetails(id) {
    try {
        const response = await fetch(`${apiUrl}/PurchaseItem/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting purchase info:', error);
        throw error;
    }
}





export {
    addPurchaseInfo,
    getSupplierDropdown,
    getCompanyDropdown,
    getItemDropdown,
    getAllPurchaseInfo,
    getSinglePurchase,
    editPurchasesInfo,
    deletePurchaseDetails
}