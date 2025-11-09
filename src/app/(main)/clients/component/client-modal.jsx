"use client";
import { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

const ClientModal = ({ show, onHide, mode = "add", initialData = {}, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      company_name: "",
      industry: "",
      locations: [{ city: "", country: "", address: "", primary: true }],
      contact_person: "",
      email: "",
      phone: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  // watch untuk pantau lokasi
  const locations = watch("locations");

  // isi data ketika mode edit
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        company_name: initialData.company_name || null,
        industry: initialData.industry || null,
        locations:
          initialData.locations?.length > 0
            ? initialData.locations
            : [{ uuid: null, city: null, country: null, address: null, primary: true }],
        contact_person: initialData.contact_person || null,
        email: initialData.email || null,
        phone: initialData.phone || null,
      });
    } else {
      reset({
        company_name: null,
        industry: null,
        locations: [{ uuid: null, city: null, country: null, address: null, primary: true }],
        contact_person: null,
        email: null,
        phone: null,
      });
    }
  }, [mode, initialData, show, reset]);

  const handleFormSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
    onSubmit(data);
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
              <p className="fw-bolder fs-5 mb-1">Add New Client</p>
              <p className="text-muted fs-2 mb-0">
                Create a new client profile with company details and contact information.
              </p>
            </div>
          ) : (
            <div>
              <p className="fw-bolder fs-5 mb-1">Edit Client</p>
              <p className="text-muted fs-2 mb-0">Edit existing client information.</p>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          {/* Company Information */}
          <div className="mb-4 border rounded-3 p-3">
            <p className="fw-bolder text-dark mb-3">Company Information</p>
            <div className="border bg-light p-3 rounded-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      {...register("company_name", {
                        required: "Company name is required",
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
                    <Form.Label>Industry</Form.Label>
                    <Form.Control
                      {...register("industry")}
                      placeholder="e.g., Banking, Technology, Healthcare"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>

          {/* Locations Section */}
          <div className="mb-4 border rounded-3 p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">Locations ({fields.length})</h6>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  append({
                    city: "",
                    country: "",
                    address: "",
                    primary: fields.length === 0, // lokasi pertama otomatis primary
                  })
                }
              >
                + Add Location
              </Button>
            </div>

            {fields.map((item, index) => (
              <div key={item.id} className="border rounded-3 p-3 mb-3 bg-light">
                <Col xs={12} className="mb-3">
                  <div
                    className="d-flex align-items-center cursor-pointer"
                    onClick={() => {
                      // klik seluruh area label/checkbox juga bisa trigger
                      fields.forEach((_, i) => setValue(`locations.${i}.primary`, i === index));
                    }}
                  >
                    <Form.Check
                      type="checkbox"
                      id={`primary-${index}`}
                      checked={locations?.[index]?.primary || false}
                      onChange={() => {
                        // hanya satu yang boleh aktif
                        fields.forEach((_, i) => setValue(`locations.${i}.primary`, i === index));
                      }}
                      className="me-2"
                    />
                    <Form.Label
                      htmlFor={`primary-${index}`}
                      className="fw-semibold text-dark mb-0 cursor-pointer"
                    >
                      Primary Location
                    </Form.Label>
                  </div>
                </Col>

                <Row>
                  {/* City */}
                  <Col md={4}>
                    <Form.Group
                      className="mb-3 position-relative"
                    >
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        {...register(`locations.${index}.city`, { required: "City is required" })}
                        placeholder="e.g., Manila"
                        isInvalid={!!errors.locations?.[index]?.city}
                      />
                      {errors.locations?.[index]?.city && (
                        <Form.Control.Feedback
                          type="invalid"
                        >
                          {errors.locations[index].city.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Country */}
                  <Col md={4}>
                    <Form.Group
                      className="mb-3 position-relative"
                    >
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        {...register(`locations.${index}.country`, {
                          required: "Country is required",
                        })}
                        placeholder="e.g., Philippines"
                        isInvalid={!!errors.locations?.[index]?.country}
                      />
                      {errors.locations?.[index]?.country && (
                        <Form.Control.Feedback
                          type="invalid"
                        >
                          {errors.locations[index].country.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Address */}
                  <Col md={4}>
                    <Form.Group
                      className="mb-3 position-relative"
                    >
                      <Form.Label>Address (Optional)</Form.Label>
                      <Form.Control
                        {...register(`locations.${index}.address`)}
                        placeholder="Full address"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {fields.length > 1 && (
                  <Row>
                    <Col xs={12} className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          if (locations?.[index]?.primary) {
                            toast.error("Cannot remove primary location.\nPlease set another as primary first.", {
                              theme: "colored",
                              position: "top-right",
                              autoClose: false,
                              hideProgressBar: true,
                            });
                            return;
                          }
                          remove(index);
                        }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                )
                }
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mb-4 border rounded-3 p-3">
            <p className="fw-bolder text-dark mb-3">Contact Information</p>
            <div className="border bg-light p-3 rounded-3">
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                      {...register("contact_person", {
                        required: "Contact person is required",
                      })}
                      placeholder="Full name"
                      isInvalid={!!errors.contact_person}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contact_person?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      placeholder="contact@company.com"
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      {...register("phone")}
                      placeholder="+1 234 567 8900"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="purple">
            {mode === "add" ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal >
  );
};

export default ClientModal;
