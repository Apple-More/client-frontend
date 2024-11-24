import React from "react";

const BillingAddress = () => {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-5">
        <div className="first-name">
          <label htmlFor="billingFirstName" className="caption1 capitalize">
            First Name <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingFirstName"
            type="text"
            required
          />
        </div>
        <div className="last-name">
          <label htmlFor="billingLastName" className="caption1 capitalize">
            Last Name <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingLastName"
            type="text"
            required
          />
        </div>
        <div className="company">
          <label htmlFor="billingCompany" className="caption1 capitalize">
            Company name (optional)
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingCompany"
            type="text"
            required
          />
        </div>
        <div className="country">
          <label htmlFor="billingCountry" className="caption1 capitalize">
            Country / Region <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingCountry"
            type="text"
            required
          />
        </div>
        <div className="street">
          <label htmlFor="billingStreet" className="caption1 capitalize">
            street address <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingStreet"
            type="text"
            required
          />
        </div>
        <div className="city">
          <label htmlFor="billingCity" className="caption1 capitalize">
            Town / city <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingCity"
            type="text"
            required
          />
        </div>
        <div className="state">
          <label htmlFor="billingState" className="caption1 capitalize">
            state <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingState"
            type="text"
            required
          />
        </div>
        <div className="zip">
          <label htmlFor="billingZip" className="caption1 capitalize">
            ZIP <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingZip"
            type="text"
            required
          />
        </div>
        <div className="phone">
          <label htmlFor="billingPhone" className="caption1 capitalize">
            Phone <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingPhone"
            type="text"
            required
          />
        </div>
        <div className="email">
          <label htmlFor="billingEmail" className="caption1 capitalize">
            Email <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="billingEmail"
            type="email"
            required
          />
        </div>
      </div>
    </>
  );
};

export default BillingAddress;
