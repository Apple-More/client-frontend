import React from "react";

interface FormData {
  addressId: string;
  addressNo: string;
  addressLine1: string;
  addressLine2: string;
  street: string;
  city: string;
  province: string;
  country: string;
  zipCode: string;
  phone: string;
}

interface EditAddressPopupProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditAddressPopup: React.FC<EditAddressPopupProps> = ({
  formData,
  onChange,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup-content bg-white p-8 rounded-lg shadow-lg relative">
        <button
          className="close-btn absolute top-2 right-2 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <form onSubmit={onSubmit}>
          <div className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-5">
            {/* <div className="first-name">
              <label htmlFor="firstName" className="caption1 capitalize">
                First Name <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={onChange}
              />
            </div>
            <div className="last-name">
              <label htmlFor="lastName" className="caption1 capitalize">
                Last Name <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={onChange}
              />
            </div> */}
            <div className="company">
              <label htmlFor="company" className="caption1 capitalize">
                Address No <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="company"
                type="text"
                value={formData.addressNo}
                onChange={onChange}
              />
            </div>
            <div className="addressLine1">
              <label htmlFor="addressLine1" className="caption1 capitalize">
                Address Line 1 <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="addressLine1"
                type="text"
                required
                value={formData.addressLine1}
                onChange={onChange}
              />
            </div>
            <div className="addressLine2">
              <label htmlFor="addressLine2" className="caption1 capitalize">
                Address Line 2 <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="addressLine2"
                type="text"
                required
                value={formData.addressLine2}
                onChange={onChange}
              />
            </div>
            <div className="street">
              <label htmlFor="shippingStreet" className="caption1 capitalize">
                street address <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingStreet"
                type="text"
                required
                value={formData.street}
                onChange={onChange}
              />
            </div>
            <div className="city">
              <label htmlFor="shippingCity" className="caption1 capitalize">
                Town / city <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingCity"
                type="text"
                required
                value={formData.city}
                onChange={onChange}
              />
            </div>
            <div className="state">
              <label htmlFor="shippingState" className="caption1 capitalize">
                Province <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingState"
                type="text"
                required
                value={formData.province}
                onChange={onChange}
              />
            </div>
            <div className="country">
              <label htmlFor="country" className="caption1 capitalize">
                Country / Region <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="country"
                type="text"
                required
                value={formData.country}
                onChange={onChange}
              />
            </div>
            <div className="zip">
              <label htmlFor="shippingZip" className="caption1 capitalize">
                Postal Code / ZIP Code <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingZip"
                type="text"
                required
                value={formData.zipCode}
                onChange={onChange}
              />
            </div>
            <div className="phone">
              <label htmlFor="shippingPhone" className="caption1 capitalize">
                Phone <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingPhone"
                type="text"
                required
                value={formData.phone}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="block-button lg:mt-10 mt-6">
            <button className="button-main" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressPopup;
