'use client';
import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import {
  LuClipboardList,
  LuPlus,
  LuCalendar,
  LuUser,
  LuStar,
  LuDollarSign,
  LuArrowRight,
  LuX,
  LuCheck, // Import icon X untuk hapus
} from 'react-icons/lu';
import SimpleBar from "simplebar-react";
import moment from "moment";
import Select from "react-select";
import ExpertModal from './expert-modal'; // Import modal baru
import { selectStyle } from "@/app/utilities/select";

// --- Options dan Data (Disimpan untuk konsistensi) ---
// ... (categoryOptions, statusOptions, clientOptions)
const categoryOptions = [
  { value: 'Research & Development', label: 'Research & Development' },
  { value: 'Process Improvement', label: 'Process Improvement' },
  { value: 'Infrastructure Upgrade', label: 'Infrastructure Upgrade' },
  { value: 'Marketing Campaign', label: 'Marketing Campaign' },
  { value: 'Other', label: 'Other' },
];

const statusOptions = [
  { value: 'Expert sourcing', label: 'Expert sourcing' },
  { value: 'Planning', label: 'Planning' },
  { value: 'Active', label: 'Active' },
  { value: 'Completed', label: 'Completed' },
];

const clientOptions = [
  { value: 'Client A', label: 'Client A' },
  { value: 'Client B', label: 'Client B' },
  { value: 'Client C', label: 'Client C' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'IDR', label: 'IDR' },
];

const feeStructureOptions = [
  { value: 'Fixed Fee', label: 'Fixed Fee' },
  { value: 'Hourly Rate', label: 'Hourly Rate' },
];

const expertsData = [
  { id: 1, name: "Sarah Martinez", location: "Manila, Philippines", initial: "SM", image: null },
  { id: 2, name: "Amanda Lee", location: "Sydney, Australia", initial: "AL", image: "https://randomuser.me/api/portraits/women/32.jpg", },
  { id: 3, name: "Jennifer Wong", location: "Hong Kong", initial: "JW", image: null },
  { id: 4, name: "Michael Chen", location: "Singapore", initial: "MC", image: "https://randomuser.me/api/portraits/men/22.jpg", },
  { id: 5, name: "David Thompson", location: "Austin, TX", initial: "DT", image: null },
];

// Default values for the form (Dihapus fields expert assignment dari default values)
const defaultProjectValues = {
  project_title: '',
  client: null,
  status: statusOptions[0].value,
  category: categoryOptions[0].value,
  sub_category: '',
  location: '',
  country_code: '',
  project_leader: '',
  project_support: '',
  case_study_link: '',
  thank_you_link: '',
  remarks: '',

  total_amount: 0,
  currency: 'USD',
  fee_structure: 'Fixed Fee',

  start_date: null,
  end_date: null,
  project_execution_date: null,

  sa_date: null,
  sa_file: null,

  client_billed_date: null,
  client_paid_date: null,
  billing_file: null,
  payment_file: null,

  expert_invoice_date: null,
  expert_paid_date: null,
  invoice_file: null,
  expert_payment_file: null,

  experts_forwarded: [],
};

// --- Helper Components (FileUploadField, DateField - tidak berubah) ---
// ... (Kode FileUploadField dan DateField)
const FileUploadField = ({ name, label, control, errors, placeholder = "Upload file" }) => {
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Form.Group className="mb-3">
          <Form.Label className="fs-3 text-dark">{label}</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="text"
              value={value ? value.name || 'File selected' : ''}
              placeholder={placeholder}
              readOnly
              className={`me-2 ${error ? "is-invalid" : ""}`}
            />
            <Button
              variant="light"
              className={`btn-icon ${error ? "border-danger text-danger" : "border"}`}
              onClick={() => document.getElementById(name).click()}
            >
              <LuPlus size={20} />
            </Button>
            <input
              type="file"
              id={name}
              hidden
              onChange={(e) => onChange(e.target.files[0])}
              aria-invalid={!!error}
            />
          </div>
          {error && (
            <div className="invalid-feedback d-block">
              {error.message}
            </div>
          )}
        </Form.Group>
      )}
    />
  );
};

const DateField = ({ name, label, control, errors, rules, minDate = null }) => {
  const error = errors[name];
  return (
    <Form.Group className="mb-3 d-flex flex-column">
      <Form.Label className="fs-3 text-dark">{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <DatePicker
            className={`form-control ${error ? "is-invalid" : ""}`}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="mm/dd/yyyy"
            minDate={minDate}
          />
        )}
      />
      {error && (
        <div className="invalid-feedback d-block">
          {error.message}
        </div>
      )}
    </Form.Group>
  );
};


// --- Main Modal Component ---
const ProjectModal = ({ show, onHide, mode = "add", initialData = {}, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultProjectValues,
  });

  // State untuk Expert Assignment
  const [assignedExperts, setAssignedExperts] = useState([]);
  const [showExpertModal, setShowExpertModal] = useState(false);

  const selectedExperts = watch('experts_forwarded');
  const totalAmount = watch('total_amount');
  const currency = watch('currency');
  const selectedExpertCount = selectedExperts.length;

  // --- Expert Assignment Handlers ---

  // Menambahkan expert dari modal ExpertModal
  const handleAddExpert = (newExpert) => {
    setAssignedExperts(prev => {
      // Pastikan tidak ada duplikat (meskipun modal ExpertModal sudah memfilternya)
      if (prev.some(e => e.id === newExpert.id)) return prev;
      return [...prev, newExpert];
    });
    // Pastikan expert yang ditugaskan juga otomatis diforward (sesuai logika bisnis yang umum)
    if (!selectedExperts.includes(newExpert.id)) {
      setValue('experts_forwarded', [...selectedExperts, newExpert.id], { shouldValidate: true });
    }
  };

  // Menghapus expert dari daftar tugas
  const handleRemoveExpert = (expertId) => {
    setAssignedExperts(prev => prev.filter(e => e.id !== expertId));
    // Secara opsional, jika expert dihapus dari assignment, ia juga dihapus dari forwarded list
    setValue('experts_forwarded', selectedExperts.filter(id => id !== expertId), { shouldValidate: true });
  };

  // Array ID expert yang sudah ditugaskan
  const assignedExpertIds = useMemo(() => assignedExperts.map(e => e.id), [assignedExperts]);

  // --- Project Fee Logic (Tidak Berubah) ---

  const formattedProjectFee = useMemo(() => {
    const amount = parseFloat(String(totalAmount).replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) {
      return `${currency || 'USD'} 0.00`;
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
    });

    const formatted = formatter.format(amount);
    return `${currency || 'USD'} ${formatted.replace(/[^\d.,]/g, '')}`;

  }, [totalAmount, currency]);

  // --- Expert Forwarded Handler (Tidak Berubah) ---
  const toggleExpertSelection = (expertId) => {
    const currentExperts = watch('experts_forwarded') || [];
    const isSelected = currentExperts.includes(expertId);

    if (isSelected) {
      setValue('experts_forwarded', currentExperts.filter(id => id !== expertId), { shouldValidate: true });
    } else {
      setValue('experts_forwarded', [...currentExperts, expertId], { shouldValidate: true });
    }
  };


  // Effect for reset/initial data load
  useEffect(() => {
    if (show) {
      if (mode === "edit" && initialData && Object.keys(initialData).length > 0) {
        // ... (Logic reset form)
        reset({ ...defaultProjectValues, ...initialData });
        // Asumsi: initialData.assignedExperts berisi data assignedExperts
        setAssignedExperts(initialData.assignedExperts || []);
      } else {
        reset(defaultProjectValues);
        setAssignedExperts([]); // Reset assigned experts saat mode 'add'
      }
    }
  }, [mode, initialData, show, reset]);

  const handleFormSubmit = (data) => {
    const finalData = {
      ...data,
      // ... (Logic formatting tanggal)
      start_date: data.start_date ? moment(data.start_date).format("YYYY-MM-DD") : null,
      end_date: data.end_date ? moment(data.end_date).format("YYYY-MM-DD") : null,
      project_execution_date: data.project_execution_date ? moment(data.project_execution_date).format("YYYY-MM-DD") : null,
      sa_date: data.sa_date ? moment(data.sa_date).format("YYYY-MM-DD") : null,
      client_billed_date: data.client_billed_date ? moment(data.client_billed_date).format("YYYY-MM-DD") : null,
      client_paid_date: data.client_paid_date ? moment(data.client_paid_date).format("YYYY-MM-DD") : null,
      expert_invoice_date: data.expert_invoice_date ? moment(data.expert_invoice_date).format("YYYY-MM-DD") : null,
      expert_paid_date: data.expert_paid_date ? moment(data.expert_paid_date).format("YYYY-MM-DD") : null,
      client: data.client ? data.client.value : null,
      total_amount: parseFloat(String(data.total_amount).replace(/,/g, '')) || 0,

      // Sertakan assigned experts dalam data submit
      assigned_experts: assignedExperts,
    };

    console.log("Submitting:", finalData);
    // onSubmit(finalData);
    onHide();
  };


  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop="static"
        size="lg"
        className="custom-modal"
      >
        {/* Header Modal */}
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <p className="fw-bolder fs-5 mb-1">Create New Project</p>
              <p className="text-muted fs-2 mb-0">
                Create a new project with client details and expert assignments
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <SimpleBar className="modal-body" style={{ maxHeight: '70vh' }}>
            <div className="d-flex flex-column gap-4">

              {/* ---------------------------------------------------- */}
              {/* 1. Project Details (Tidak Berubah) */}
              {/* ---------------------------------------------------- */}
              {/* ... (Kode Project Details) */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 fw-bold fs-4" style={{ color: '#8a40c9' }}>
                  <LuClipboardList className="me-2" size={20} /> Project Details
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Project Title</Form.Label>
                      <Form.Control
                        {...register("project_title", { required: "Project Title is required" })}
                        placeholder="Enter project title"
                        isInvalid={!!errors.project_title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.project_title?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Client</Form.Label>
                      <Controller
                        name="client"
                        control={control}
                        rules={{ required: "Client is required" }}
                        render={({ field, error }) => (
                          <Select
                            {...field}
                            styles={selectStyle(!!error)}
                            options={clientOptions}
                            placeholder="Select client"
                            classNamePrefix="react-select"
                            className={errors.client ? "is-invalid" : ""}
                          />
                        )}
                      />
                      {errors.client && (
                        <div className="invalid-feedback d-block">
                          {errors.client.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Status</Form.Label>
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: "Status is required" }}
                        render={({ field, error }) => (
                          <Select
                            {...field}
                            styles={selectStyle(!!error)}
                            value={statusOptions.find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option ? option.value : null)}
                            options={statusOptions}
                            placeholder="Select status"
                            classNamePrefix="react-select"
                            className={errors.status ? "is-invalid" : ""}
                          />
                        )}
                      />
                      {errors.status && (
                        <div className="invalid-feedback d-block">
                          {errors.status.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Category</Form.Label>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field, error }) => (
                          <Select
                            {...field}
                            styles={selectStyle(!!error)}
                            value={categoryOptions.find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option ? option.value : null)}
                            options={categoryOptions}
                            placeholder="Select category"
                            classNamePrefix="react-select"
                            className={errors.category ? "is-invalid" : ""}
                          />
                        )}
                      />
                      {errors.category && (
                        <div className="invalid-feedback d-block">
                          {errors.category.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Sub Category</Form.Label>
                      <Form.Control {...register("sub_category")} placeholder="Project sub category" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Location</Form.Label>
                      <Form.Control {...register("location")} placeholder="Project location" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Country Code</Form.Label>
                      <Form.Control {...register("country_code")} placeholder="e.g., PH, US, SG" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Project Leader</Form.Label>
                      <Form.Control {...register("project_leader")} placeholder="Enter project leader name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Project Support</Form.Label>
                      <Form.Control {...register("project_support")} placeholder="Enter project support name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Case Study Link</Form.Label>
                      <Form.Control {...register("case_study_link")} placeholder="https://..." />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Thank You Link</Form.Label>
                      <Form.Control {...register("thank_you_link")} placeholder="https://..." />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label className="fs-3 text-dark">Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("remarks")}
                    placeholder="Add any additional notes or remarks..."
                  />
                </Form.Group>

              </div>
              {/* ---------------------------------------------------- */}


              {/* ---------------------------------------------------- */}
              {/* 2. Experts Forwarded (Tidak Berubah) */}
              {/* ---------------------------------------------------- */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center fw-bold fs-4 text-primary">
                  <LuArrowRight className="me-2" size={20} /> Experts Forwarded ({selectedExpertCount})
                </h5>
                <p className="text-muted fs-2 mb-2">Select experts to forward to the client</p>

                <div className="border rounded p-3 bg-white" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {expertsData.map((expert) => {
                    const isSelected = selectedExperts.includes(expert.id);
                    return (
                      <div
                        key={expert.id}
                        className={`d-flex align-items-center py-2 px-2 rounded mb-2 border ${isSelected ? 'border-primary bg-primary-subtle shadow-sm' : 'border-grey'}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleExpertSelection(expert.id)}
                      >

                        <div className="form-check me-3">
                          <input
                            className="form-check-input cursor-pointer"
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => e.stopPropagation()}
                            style={{ marginTop: '0.2rem', minWidth: '1rem', minHeight: '1rem' }}
                            id={`expert-checkbox-${expert.id}`}
                          // Disable checkbox jika expert sudah ditugaskan
                          // disabled={assignedExpertIds.includes(expert.id)} 
                          />
                          <label className="form-check-label" htmlFor={`expert-checkbox-${expert.id}`}></label>
                        </div>

                        <div className={`avatar-sm rounded-circle me-3 ${!expert.image ? 'bg-secondary text-white d-flex align-items-center justify-content-center' : ''}`} style={{ width: '40px', height: '40px' }}>
                          {expert.image ? (
                            <img src={expert.image} alt={expert.initial} className="rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span className="fw-bold">{expert.initial}</span>
                          )}
                        </div>

                        <div>
                          <p className="mb-0 fw-bold">{expert.name}</p>
                          <p className="mb-0 text-muted fs-2">{expert.location}</p>
                        </div>
                        {/* Tambahkan tag jika expert sudah ditugaskan */}
                        {assignedExpertIds.includes(expert.id) && (
                          <span className="badge bg-purple-subtle text-purple ms-auto fw-normal">Assigned</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <Form.Control.Feedback type="invalid" className={errors.experts_forwarded ? 'd-block' : 'd-none'}>
                  {errors.experts_forwarded?.message}
                </Form.Control.Feedback>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 3. Project Fee (Tidak Berubah) */}
              {/* ---------------------------------------------------- */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 fw-bold fs-4 text-success">
                  <LuDollarSign className="me-2" size={20} /> Project Fee
                </h5>
                <Row className="align-items-center">
                  <Col md={4} className="mb-3 mb-md-0">
                    <label className="fs-3 text-dark">Total Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0.00"
                      {...register("total_amount", { valueAsNumber: true })}
                    />
                  </Col>
                  <Col md={4} className="mb-3 mb-md-0">
                    <label className="fs-3 text-dark">Currency</label>
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field, error }) => (
                        <Select
                          {...field}
                          styles={selectStyle(!!error)}
                          value={currencyOptions.find(option => option.value === field.value)}
                          onChange={(option) => field.onChange(option ? option.value : null)}
                          options={currencyOptions}
                          placeholder="Select currency"
                          classNamePrefix="react-select"
                        />
                      )}
                    />
                  </Col>
                  <Col md={4}>
                    <label className="fs-3 text-dark">Fee Structure</label>
                    <Controller
                      name="fee_structure"
                      control={control}
                      render={({ field, error }) => (
                        <Select
                          {...field}
                          styles={selectStyle(!!error)}
                          value={feeStructureOptions.find(option => option.value === field.value)}
                          onChange={(option) => field.onChange(option ? option.value : null)}
                          options={feeStructureOptions}
                          placeholder="Select fee structure"
                          classNamePrefix="react-select"
                        />
                      )}
                    />
                  </Col>
                </Row>
                <div className="mt-3 p-3 rounded-3 bg-white border border-success">
                  <p className="mb-0 fw-bolder fs-4 text-success">{formattedProjectFee}</p>
                  <p className="mb-0 fs-2 text-muted">Total Project Fee</p>
                </div>
              </div>


              {/* ---------------------------------------------------- */}
              {/* 4. Expert Assignment (REVISI BERAT) */}
              {/* ---------------------------------------------------- */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center justify-content-between mb-3 fw-bold fs-4 text-purple" style={{ color: '#8a40c9' }}>
                  <div className="d-flex align-items-center">
                    <LuUser className="me-2" size={20} /> Expert Assignment ({assignedExperts.length})
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="d-flex align-items-center fw-bold"
                    onClick={() => setShowExpertModal(true)}
                  >
                    <LuPlus size={16} className="me-1" /> Add Expert
                  </Button>
                </h5>

                {assignedExperts.length === 0 ? (
                  <div className="text-center p-4 border rounded bg-white">
                    <p className="text-muted mb-0">No experts assigned yet. Click "Add Expert" to get started.</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {assignedExperts.map(expert => (
                      <div
                        key={expert.id}
                        className="d-flex align-items-center py-2 px-3 rounded border border-primary bg-white shadow-sm"
                      >

                        {/* Icon Ungu (Check/Assigned) */}
                        {/* <LuCheck className="text-purple me-3" size={24} /> */}

                        {/* Avatar/Photo/Initial */}
                        <div className={`avatar-sm rounded-circle me-3 ${!expert.image ? 'bg-secondary text-white d-flex align-items-center justify-content-center' : ''}`} style={{ width: '40px', height: '40px' }}>
                          {expert.image ? (
                            <img src={expert.image} alt={expert.initial} className="rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span className="fw-bold">{expert.initial}</span>
                          )}
                        </div>

                        {/* Details */}
                        <div>
                          <p className="mb-0 fw-bold">{expert.name}</p>
                          <p className="mb-0 text-muted fs-2">
                            {expert.currency} {expert.fee_amount} / {expert.rate_type} ({expert.estimated_days} days)
                          </p>
                        </div>

                        {/* Status Tag dan Tombol Hapus */}
                        <div className="ms-auto d-flex align-items-center">
                          <span className="badge bg-success-subtle text-success me-2 fw-normal fs-2">Assigned & Selected</span>
                          <Button variant="link" className="p-0 text-danger" onClick={() => handleRemoveExpert(expert.id)}>
                            <LuX size={20} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ---------------------------------------------------- */}
              {/* 5. Expert Ratings (Tidak Berubah) */}
              {/* ---------------------------------------------------- */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 fw-bold fs-4 text-warning">
                  <LuStar className="me-2" size={20} /> Expert Ratings ({assignedExperts.length})
                </h5>
                <div className="text-center p-4 border rounded bg-white">
                  {assignedExperts.length > 0 ? (
                    <p className="text-muted mb-0">Ratings will be enabled after project completion.</p>
                  ) : (
                    <p className="text-muted mb-0">Assign experts first to enable rating functionality. Only assigned experts can be rated.</p>
                  )}
                </div>
              </div>


              {/* ---------------------------------------------------- */}
              {/* 6. Project Dates & Documentation (Tidak Berubah) */}
              {/* ---------------------------------------------------- */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 fw-bold fs-4" style={{ color: '#8a40c9' }}>
                  <LuCalendar className="me-2" size={20} /> Project Dates & Documentation
                </h5>

                <Row>
                  <Col md={6}>
                    <DateField name="start_date" label="Assignment Start Date" control={control} errors={errors} />
                  </Col>
                  <Col md={6}>
                    <DateField name="end_date" label="Assignment End Date" control={control} errors={errors} />
                  </Col>
                </Row>

                <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: '#e3f2fd', border: '1px solid #90caf9' }}>
                  <h6 className="fw-bold mb-3 text-primary">Service Agreement (SA)</h6>
                  <Row>
                    <Col md={6}>
                      <DateField name="sa_date" label="Date SA Signed" control={control} errors={errors} />
                    </Col>
                    <Col md={6}>
                      <FileUploadField name="sa_file" label="SA File" control={control} errors={errors} placeholder="Upload SA file..." />
                    </Col>
                  </Row>
                </div>

                <Row>
                  <Col md={12}>
                    <DateField name="project_execution_date" label="Project Execution Date" control={control} errors={errors} />
                  </Col>
                </Row>

                <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7' }}>
                  <h6 className="fw-bold mb-3 text-success">Client Billing & Payment</h6>
                  <Row>
                    <Col md={6}>
                      <DateField name="client_billed_date" label="Date Client Billed" control={control} errors={errors} />
                    </Col>
                    <Col md={6}>
                      <FileUploadField name="billing_file" label="Billing File" control={control} errors={errors} placeholder="Upload billing fi" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <DateField name="client_paid_date" label="Date Client Paid" control={control} errors={errors} />
                    </Col>
                    <Col md={6}>
                      <FileUploadField name="payment_file" label="Payment File" control={control} errors={errors} placeholder="Upload paymen" />
                    </Col>
                  </Row>
                </div>

                <div className="p-3 rounded-3" style={{ backgroundColor: '#f3e5f5', border: '1px solid #e1bee7' }}>
                  <h6 className="fw-bold mb-3" style={{ color: '#8a40c9' }}>Expert Invoice & Payment</h6>
                  <Row>
                    <Col md={6}>
                      <DateField name="expert_invoice_date" label="Date Expert Invoice" control={control} errors={errors} />
                    </Col>
                    <Col md={6}>
                      <FileUploadField name="invoice_file" label="Invoice File" control={control} errors={errors} placeholder="Upload invoice t" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <DateField name="expert_paid_date" label="Date Expert Paid" control={control} errors={errors} />
                    </Col>
                    <Col md={6}>
                      <FileUploadField name="expert_payment_file" label="Payment File" control={control} errors={errors} placeholder="Upload paymen" />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </SimpleBar>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Project
            </Button>
          </Modal.Footer>
        </Form>
      </Modal >

      {/* Modal Tambah Expert */}
      <ExpertModal
        show={showExpertModal}
        onHide={() => setShowExpertModal(false)}
        expertsData={expertsData}
        onAddExpert={handleAddExpert}
        existingExpertIds={assignedExpertIds}
      />
    </>
  );
};

export default ProjectModal;