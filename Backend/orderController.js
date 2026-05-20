const checkout = async (req, res, InvoiceModel, InvoiceDetailModel, CartModel, CartDetailModel) => {
    try {
        const { CustomerID, TotalAmount } = req.body;

        // 1. Tìm giỏ hàng hiện tại
        const cart = await CartModel.findOne({ where: { CustomerID } });
        if (!cart) {
            return res.status(400).json({ message: "Giỏ hàng rỗng, không thể đặt hàng!" });
        }

        const cartItems = await CartDetailModel.findAll({ where: { CartID: cart.CartID } });
        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Giỏ hàng không có sản phẩm nào!" });
        }

        // 2. Tạo hóa đơn chính
        const newInvoice = await InvoiceModel.create({
            CustomerID,
            TotalAmount,
            Status: 'Pending'
        });

        // 3. Chuyển dữ liệu sang bảng chi tiết hóa đơn
        for (let item of cartItems) {
            const fakeUnitPrice = 1000; 
            await InvoiceDetailModel.create({
                InvoiceID: newInvoice.InvoiceID,
                ProductID: item.ProductID,
                Quantity: item.Quantity,
                UnitPrice: fakeUnitPrice, 
                Discount: 0.00
            });
        }

        // 4. Xóa sạch giỏ hàng tạm thời sau khi đặt thành công
        await CartDetailModel.destroy({ where: { CartID: cart.CartID } });

        return res.status(200).json({ 
            message: "Đặt mua hàng thành công! Đơn hàng đang chờ duyệt.", 
            InvoiceID: newInvoice.InvoiceID 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { checkout };