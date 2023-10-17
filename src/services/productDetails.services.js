async function getAllPurchaseInfo() {

    try {
        const response = await fetch(`http://localhost:5283/api/Purchase/search?pageSize=35`);

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
        const response = await fetch(`http://localhost:5283/api/Purchase`, {
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
        const response = await fetch(`http://localhost:5283/api/Supplier/dropdown`);

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
        const response = await fetch(`http://localhost:5283/api/Company/dropdown`);

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
        const response = await fetch(`http://localhost:5283/api/Item/dropdown`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export {
    addPurchaseInfo,
    getSupplierDropdown,
    getCompanyDropdown,
    getItemDropdown,
    getAllPurchaseInfo
}