'use client';
import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import {
  LuClipboardList, // Icon untuk Project Details
  LuPlus,
  LuCalendar, // Icon untuk Project Leader
} from 'react-icons/lu';
import SimpleBar from "simplebar-react";
import CategoryModal from "./category-modal";
import moment from "moment";

const getMinEndDate = (startDate) => {
  if (!startDate) return null;
  const nextDay = new Date(startDate);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
};

const calculateDuration = (start, end) => {
  if (!start || !end) return "TBD";

  const startDate = new Date(start);
  const endDate = new Date(end);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return `${diffDays} days`;
};

// --- Options untuk Select Inputs ---
const categoryOptions = [
  { value: 'Research & Development', label: 'Research & Development' },
  { value: 'Process Improvement', label: 'Process Improvement' },
  { value: 'Infrastructure Upgrade', label: 'Infrastructure Upgrade' },
  { value: 'Marketing Campaign', label: 'Marketing Campaign' },
  { value: 'Other', label: 'Other' },
];

const statusOptions = [
  { value: 'Planning', label: 'Planning' },
  { value: 'Active', label: 'Active' },
  { value: 'On Hold', label: 'On Hold' },
  { value: 'Completed', label: 'Completed' },
];

// Default values for the form 
const defaultProjectValues = {
  project_title: '',
  category: categoryOptions[0].value,
  project_leader: '',
  status: statusOptions[0].value,
  start_date: new Date(), // Tanggal hari ini
  end_date: null,
  notes: '',
};

// --- Main Modal Component ---
const ProjectModal = ({ show, onHide, mode = "add", initialData = {}, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue, // <-- TAMBAHKAN setValue DI SINI
    formState: { errors },
  } = useForm({
    defaultValues: defaultProjectValues,
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // State untuk menyimpan daftar kategori yang dapat diubah
  const [currentCategoryOptions, setCurrentCategoryOptions] = useState(categoryOptions);

  // Handlers untuk Modal
  const handleShowCategoryModal = () => setShowCategoryModal(true);
  const handleHideCategoryModal = () => setShowCategoryModal(false);

  // Handler saat kategori baru disubmit
  const handleAddCategory = (newCategory) => {
    // 1. Tambahkan kategori baru ke daftar
    setCurrentCategoryOptions((prevOptions) => [...prevOptions, newCategory]);
    // 2. Set nilai form 'category' ke kategori baru yang dibuat
    setValue('category', newCategory.value, { shouldValidate: true, shouldDirty: true });
  };

  // Watch fields for dynamic timeline summary
  const watchedStartDate = watch("start_date");
  const watchedEndDate = watch("end_date");

  // Hitung Minimal End Date secara dinamis (Start Date + 1 Hari)
  const minEndDate = useMemo(() => getMinEndDate(watchedStartDate), [watchedStartDate]);

  // Hitung Duration secara dinamis
  const duration = useMemo(() => {
    return calculateDuration(watchedStartDate, watchedEndDate);
  }, [watchedStartDate, watchedEndDate]);


  // Effect to load initial data for edit mode or reset for add mode
  useEffect(() => {
    if (show) {
      if (mode === "edit" && initialData && Object.keys(initialData).length > 0) {
        reset({
          ...defaultProjectValues,
          ...initialData,
          // Pastikan tanggal dimuat sebagai objek Date
          start_date: initialData.start_date ? new Date(initialData.start_date) : null,
          end_date: initialData.end_date ? new Date(initialData.end_date) : null,
        });
      } else {
        // Reset form to default values for 'add' mode, set Start Date to today
        reset({ ...defaultProjectValues, start_date: new Date(), end_date: null });
      }
    }
  }, [mode, initialData, show, reset]);

  const handleFormSubmit = (data) => {
    // Format tanggal ke ISO string
    const finalData = {
      ...data,
      start_date: data.start_date ? moment(data.start_date).format("YYYY-MM-DD") : null,
      end_date: data.end_date ? moment(data.end_date).format("YYYY-MM-DD") : null,
    };
    onSubmit(finalData);
  };

  // --- Fungsi yang dipanggil saat Start Date berubah ---
  const handleStartDateChange = (date, fieldOnChange) => {
    // 1. Update nilai Start Date di RHF
    fieldOnChange(date);

    // 2. Jika tanggal dipilih, set End Date menjadi Start Date + 1 hari
    if (date) {
      const newEndDate = getMinEndDate(date);
      // Menggunakan setValue untuk memperbarui End Date
      setValue('end_date', newEndDate, { shouldValidate: true, shouldDirty: true });
    } else {
      // Jika Start Date dihapus, End Date juga dihapus
      setValue('end_date', null, { shouldValidate: true, shouldDirty: true });
    }
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
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <p className="fw-bolder fs-5 mb-1">Add New Internal Project</p>
              <p className="text-muted fs-2 mb-0">
                Create a new internal project with timeline and details
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <SimpleBar className="modal-body" style={{ maxHeight: '70vh' }}>
            <div className="d-flex flex-column gap-4">

              {/* 1. Project Details */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 fw-bold fs-4" style={{ color: '#8a40c9' }}>
                  <LuClipboardList className="me-2" size={20} /> Project Details
                </h5>

                {/* ... (Bagian Title, Category, Leader, Status tetap sama) ... */}

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Project Title</Form.Label>
                      <Form.Control
                        {...register("project_title", {
                          required: "Project Title is required",
                          minLength: { value: 5, message: "Minimum 5 characters" },
                        })}
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
                      <Form.Label className="fs-3 text-dark d-flex justify-content-between">
                        <span>Category</span>
                        {/* MODIFIKASI: Panggil handler untuk menampilkan modal */}
                        <span
                          className="text-primary fw-bold cursor-pointer fs-3"
                          onClick={handleShowCategoryModal}
                        >
                          <LuPlus size={14} className="me-1" />Add
                        </span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        {...register("category", { required: "Category is required" })}
                        isInvalid={!!errors.category}
                      >
                        {/* MODIFIKASI: Gunakan currentCategoryOptions */}
                        {currentCategoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.category?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Project Leader</Form.Label>
                      <Form.Control
                        {...register("project_leader", { required: "Project Leader is required" })}
                        placeholder="Enter project leader name"
                        isInvalid={!!errors.project_leader}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.project_leader?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-3 text-dark">Status</Form.Label>
                      <Form.Control
                        as="select"
                        {...register("status", { required: "Status is required" })}
                        isInvalid={!!errors.status}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.status?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  {/* Start Date - MODIFIKASI ONCHANGE */}
                  <Col md={6}>
                    <Form.Group className="mb-3 d-flex flex-column">
                      <Form.Label className="fs-3 text-dark">Start Date</Form.Label>
                      <Controller
                        name="start_date"
                        control={control}
                        rules={{ required: "Start Date is required" }}
                        render={({ field }) => (
                          <DatePicker
                            className={`form-control ${errors.start_date ? "is-invalid" : ""}`}
                            selected={field.value}
                            // PANGGIL handleStartDateChange yang akan meng-update End Date
                            onChange={(date) => handleStartDateChange(date, field.onChange)}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="mm/dd/yyyy"
                          />
                        )}
                      />
                      {errors.start_date && (
                        <div className="invalid-feedback d-block">
                          {errors.start_date.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  {/* End Date - HILANGKAN VALIDASI CUSTOM KARENA SUDAH DISET OTOMATIS */}
                  <Col md={6}>
                    <Form.Group className="mb-3 d-flex flex-column">
                      <Form.Label className="fs-3 text-dark">End Date</Form.Label>
                      <Controller
                        name="end_date"
                        control={control}
                        rules={{
                          // Cukup pastikan End Date ada jika Start Date ada.
                          required: watchedStartDate ? 'End Date is required' : false
                        }}
                        render={({ field }) => (
                          <DatePicker
                            className={`form-control ${errors.end_date ? "is-invalid" : ""}`}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="mm/dd/yyyy"
                            minDate={minEndDate} // Tetap gunakan minDate untuk mencegah user memilih mundur
                            disabled={!watchedStartDate} // End Date disable jika Start Date kosong
                          />
                        )}
                      />
                      {errors.end_date && (
                        <div className="invalid-feedback d-block">
                          {errors.end_date.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Notes */}
                <Form.Group className="mb-3">
                  <Form.Label className="fs-3 text-dark">Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("notes")}
                    placeholder="Enter project notes or description..."
                  />
                </Form.Group>

              </div>

              {/* 2. Timeline Summary */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 fw-bold fs-4" style={{ color: '#8a40c9' }}>
                  <LuCalendar className="me-2" size={20} /> Timeline Summary
                </h5>
                <Row>
                  <Col md={4} className="mb-3 mb-md-0">
                    <div className="p-3 text-center rounded-3" style={{ backgroundColor: '#e0f7fa', border: '1px solid #b2ebf2' }}>
                      <p className="mb-1 fw-bold fs-2 text-primary">Start Date</p>
                      <p className="mb-0 fw-bolder fs-5 text-primary">
                        {watchedStartDate ? new Date(watchedStartDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'Not set'}
                      </p>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3 mb-md-0">
                    <div className="p-3 text-center rounded-3" style={{ backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9' }}>
                      <p className="mb-1 fw-bold fs-2 text-success">End Date</p>
                      <p className="mb-0 fw-bolder fs-5 text-success">
                        {watchedEndDate ? new Date(watchedEndDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'Not set'}
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3 text-center rounded-3" style={{ backgroundColor: '#f3e5f5', border: '1px solid #e1bee7' }}>
                      <p className="mb-1 fw-bold fs-2 text-purple" style={{ color: '#8a40c9' }}>Duration</p>
                      <p className="mb-0 fw-bolder fs-5 text-purple" style={{ color: '#8a40c9' }}>
                        {watchedStartDate && watchedEndDate ? duration : 'TBD'}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </SimpleBar>
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

      <CategoryModal
        show={showCategoryModal}
        onHide={handleHideCategoryModal}
        onSubmit={handleAddCategory}
      />
    </>
  );
};

export default ProjectModal;