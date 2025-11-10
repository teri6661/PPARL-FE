'use client';
import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import {
  LuBuilding,
  LuUsers,
  LuCalendar,
  LuClipboardPen,
  LuX,
  LuPlus,
  LuGlobe,
  LuHandshake,
} from 'react-icons/lu';

const partnerTypeOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Strategic', label: 'Strategic' },
  { value: 'Vendor', label: 'Vendor' },
  { value: 'Reseller', label: 'Reseller' },
  { value: 'Consultant', label: 'Consultant' },
  { value: 'Other', label: 'Other' },
];

const partnershipStatusOptions = [
  { value: 'Prospect', label: 'Prospect' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Former', label: 'Former' },
];

// Default values for the form
const defaultPartnerValues = {
  company_name: '',
  partner_type: partnerTypeOptions[0].value,
  industry: '',
  location: '',
  website: '',
  partnership_status: partnershipStatusOptions[0].value,
  contactPerson: '',
  email: '',
  phone: '',
  partnership_date: '',
  contract_enddate: '',
  notes: '',
};

// --- Main Modal Component ---
const PartnerModal = ({ show, onHide, mode = "add", initialData = {}, onSubmit }) => {
  const [services, setServices] = useState([]); // State for Offered Services tag input
  const serviceInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultPartnerValues,
  });

  // Effect to load initial data for edit mode or reset for add mode
  useEffect(() => {
    if (show) {
      if (mode === "edit" && initialData && Object.keys(initialData).length > 0) {
        // Reset form with initial data, ensuring dates are formatted YYYY-MM-DD
        reset({
          ...defaultPartnerValues,
          ...initialData,
          company_name: initialData.company_name || "",
          partnerType: initialData.partnerType || partnerTypeOptions[0].value,
          partnershipStatus: initialData.partnershipStatus || partnershipStatusOptions[0].value,
          partnership_date: initialData.partnership_date ? new Date(initialData.partnership_date).toISOString().substring(0, 10) : '',
          contract_enddate: initialData.contract_enddate ? new Date(initialData.contract_enddate).toISOString().substring(0, 10) : '',
        });
        setServices(initialData.services || []);
      } else {
        // Reset form to default values for 'add' mode
        reset(defaultPartnerValues);
        setServices([]);
      }
    }
  }, [mode, initialData, show, reset]);

  // Handler to add a service tag
  const handleAddService = (e) => {
    e.preventDefault();
    const input = serviceInputRef.current;
    const newService = input.value.trim();

    if (newService && !services.includes(newService)) {
      setServices([...services, newService]);
      input.value = '';
    }
    input.focus();
  };

  // Handler to remove a service tag
  const handleRemoveService = (serviceToRemove) => {
    setServices(services.filter((service) => service !== serviceToRemove));
  };

  const handleFormSubmit = (data) => {
    const finalData = {
      ...data,
      services: services, // Add the services array to the final data
    };
    onSubmit(finalData);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      size="lg"
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "add" ? (
            <div>
              <p className="fw-bolder fs-5 mb-1">Add New Partner</p>
              <p className="text-muted fs-2 mb-0">
                Create a new partner with company and contact information.
              </p>
            </div>
          ) : (
            <div>
              <p className="fw-bolder fs-5 mb-1">Edit Partner</p>
              <p className="text-muted fs-2 mb-0">
                Modify existing partner information.
              </p>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="d-flex flex-column gap-4">

            {/* 1. Company Information */}
            <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
              <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                <LuBuilding className="me-2" size={20} /> Company Information
              </h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      {...register("company_name", {
                        required: "Company Name is required",
                        minLength: { value: 3, message: "Minimum 3 characters" },
                      })}
                      placeholder="Enter company name"
                      isInvalid={!!errors.company_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.company_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Partner Type</Form.Label>
                    <Form.Control
                      as="select"
                      {...register("partnerType", { required: "Partner Type is required" })}
                      isInvalid={!!errors.partnerType}
                    >
                      {partnerTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.partnerType?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Industry</Form.Label>
                    <Form.Control
                      {...register("industry", { required: "Industry is required" })}
                      placeholder="Enter industry"
                      isInvalid={!!errors.industry}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.industry?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      {...register("location")}
                      placeholder="Enter location"
                      isInvalid={!!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Website</Form.Label>
                    <InputGroup hasValidation>
                      {/* Using LuGlobe for visual consistency, but the original text was `https://` */}
                      <InputGroup.Text>
                        <LuGlobe className="me-1" size={16} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        {...register("website", {
                          pattern: {
                            value: /^(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                            message: "Invalid website format",
                          },
                        })}
                        placeholder="example.com"
                        isInvalid={!!errors.website}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.website?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Partnership Status</Form.Label>
                    <Form.Control
                      as="select"
                      {...register("partnershipStatus", { required: "Partnership Status is required" })}
                      isInvalid={!!errors.partnershipStatus}
                    >
                      {partnershipStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.partnershipStatus?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* 2. Contact Information */}
            <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
              <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                <LuUsers className="me-2" size={20} /> Contact Information
              </h5>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Person</Form.Label>
                    <InputGroup hasValidation>
                      {/* Using LuUsers for consistent icon theme, or a specific user icon if available */}
                      <Form.Control
                        {...register("contactPerson", { required: "Contact Person is required" })}
                        placeholder="Enter contact person name"
                        isInvalid={!!errors.contactPerson}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactPerson?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })}
                        placeholder="Enter email address"
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="tel"
                        {...register("phone")}
                        placeholder="Enter phone number"
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* 3. Services Offered (Tag Input) */}
            <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
              <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                <LuHandshake className="me-2" size={20} /> Services Offered
              </h5>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <InputGroup>
                  <Form.Control
                    ref={serviceInputRef}
                    placeholder="Enter a service and press Enter or the Add button..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddService(e);
                    }}
                  />
                  <Button variant="secondary" onClick={handleAddService} type="button">
                    <LuPlus size={18} /> Add
                  </Button>
                </InputGroup>
                {services.map((service) => (
                  // 1. Pastikan d-flex dan align-items-center di sini (sudah ada)
                  <div key={service} className="badge bg-primary d-flex align-items-center p-2 rounded-pill">
                    {service}
                    <Button
                      // 2. Gunakan variant yang sesuai atau style kustom
                      variant="light" // Menggunakan light agar mudah terlihat di bg-primary
                      onClick={() => handleRemoveService(service)}
                      // Mengubah class untuk memastikan alignment dan margin yang tepat
                      className="p-0 ms-1 text-dark d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        // width: '18px',  // Lebar dan tinggi kecil untuk tombol
                        // height: '18px',
                        // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparan putih
                        // border: 'none',
                        // Penting: Hilangkan lineHeight yang aneh, biarkan flexbox yang bekerja
                      }}
                    >
                      <LuX size={12} className="m-0" /> {/* Ukuran ikon lebih kecil, margin 0 */}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Partnership Timeline */}
            <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
              <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                <LuCalendar className="me-2" size={20} /> Partnership Timeline
              </h5>
              <Row>
                {/* Partnership Date */}
                <Col md={6}>
                  <Form.Group className="mb-3 d-flex flex-column">
                    <Form.Label className="mb-2">Partnership Date</Form.Label>
                    <Controller
                      name="partnership_date"
                      control={control}
                      rules={{ required: "Partnership Date is required" }}
                      render={({ field }) => (
                        <DatePicker
                          className={`form-control ${errors.partnership_date ? "is-invalid" : ""}`}
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                        />
                      )}
                    />
                    {errors.partnership_date && (
                      <div className="invalid-feedback d-block">
                        {errors.partnership_date.message}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                {/* Contract End Date */}
                <Col md={6}>
                  <Form.Group className="mb-3 d-flex flex-column">
                    <Form.Label className="mb-2">Contract End Date</Form.Label>
                    <Controller
                      name="contract_enddate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          className={`form-control ${errors.contract_enddate ? "is-invalid" : ""}`}
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                        />
                      )}
                    />
                    {errors.contract_enddate && (
                      <div className="invalid-feedback d-block">
                        {errors.contract_enddate.message}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* 5. Additional Notes */}
            <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
              <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                <LuClipboardPen className="me-2" size={20} /> Additional Notes
              </h5>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  {...register("notes")}
                  placeholder="Write down any additional notes or details..."
                />
              </Form.Group>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {mode === "add" ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal >
  );
};

export default PartnerModal;