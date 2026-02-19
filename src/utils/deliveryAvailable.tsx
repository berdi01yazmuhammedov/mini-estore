
const deliveryAvailable = ({address, setAddress}: any) => {
    return (
        <div>
            <input
                required
                className="w-full mt-4 py-2 px-4 border rounded-sm"
                type="text"
                placeholder="Введите адрес доставки"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            />
        </div>
    );
};

export default deliveryAvailable;
