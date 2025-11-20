// AddExpertModal.jsx
import { selectStyle } from '@/app/utilities/select';
import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

// Data options (Sama dengan ProjectModal untuk konsistensi)
const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'IDR', label: 'IDR' },
];

const rateTypeOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'fixed', label: 'Fixed' },
];

const ExpertModal = ({ show, onHide, expertsData, onAddExpert, existingExpertIds = [] }) => {

  const expertSelectOptions = expertsData.map(expert => ({
    value: expert.id,
    label: expert.name,
    ...expert
  }));

  const defaultAddExpertValues = {
    expert: null,
    fee_amount: 0,
    currency: currencyOptions[0],
    rate_type: rateTypeOptions[0],
    estimated_days: 1,
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultAddExpertValues,
  });

  // Filter expert yang sudah ditugaskan agar tidak bisa ditambahkan lagi
  const availableExperts = expertSelectOptions.filter(opt => !existingExpertIds.includes(opt.value));

  // Handler Submit
  const handleFormSubmit = (data) => {
    if (!data.expert) return; // Pastikan expert terpilih

    const newExpert = {
      id: data.expert.value,
      name: data.expert.label,
      image: data.expert.image,
      initial: data.expert.initial,
      fee_amount: data.fee_amount || 0,
      currency: data.currency.value,
      rate_type: data.rate_type.value,
      estimated_days: data.estimated_days || 1,
    };

    onAddExpert(newExpert);
    reset(defaultAddExpertValues);
    onHide();
  };

  // Reset form saat modal dibuka/ditutup
  React.useEffect(() => {
    if (show) {
      reset(defaultAddExpertValues);
    }
  }, [show, reset]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div>
            <p className="fw-bolder fs-5 mb-1">Add Expert with Fee</p>
            <p className="text-muted fs-2 mb-0">
              Select an expert and set their fee for this project
            </p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
            {/* Select Expert */}
            <Form.Group className="mb-3">
              <Form.Label>Select Expert</Form.Label>
              <Controller
                name="expert"
                control={control}
                rules={{ required: "Expert is required" }}
                render={({ field, error }) => (
                  <Select
                    {...field}
                    styles={selectStyle(!!error)}
                    options={availableExperts}
                    placeholder="Choose an expert"
                    classNamePrefix="react-select"
                    isInvalid={!!errors.expert}
                  />
                )}
              />
              {errors.expert && <div className="invalid-feedback d-block">{errors.expert.message}</div>}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fee Amount</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    {...register("fee_amount", { valueAsNumber: true, min: { value: 0, message: "Amount must be positive" } })}
                    isInvalid={!!errors.fee_amount}
                    placeholder="0"
                  />
                  <Form.Control.Feedback type="invalid">{errors.fee_amount?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Currency</Form.Label>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field, error }) => (
                      <Select
                        {...field}
                        styles={selectStyle(!!error)}
                        options={currencyOptions}
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rate Type</Form.Label>
                  <Controller
                    name="rate_type"
                    control={control}
                    render={({ field, error }) => (
                      <Select
                        {...field}
                        styles={selectStyle(!!error)}
                        options={rateTypeOptions}
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estimated Days</Form.Label>
                  <Form.Control
                    type="number"
                    {...register("estimated_days", { valueAsNumber: true, min: { value: 1, message: "Days must be at least 1" } })}
                    isInvalid={!!errors.estimated_days}
                    placeholder="0"
                  />
                  <Form.Control.Feedback type="invalid">{errors.estimated_days?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Expert
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ExpertModal;