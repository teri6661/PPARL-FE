'use client';
import { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu"; // ikon untuk show/hide password
import Select from "react-select";
import { selectStyle } from "@/app/utilities/select";

const AccountModal = ({ show, onHide, mode = "add", initialData = {}, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "Admin",
      password: "",
      status: "Active",
    },
  });

  // daftar role
  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
    { value: "Manager", label: "Manager" },
    { value: "Viewer", label: "Viewer" },
  ];

  // daftar status
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  // Saat mode edit → isi form dengan data awal
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        fullname: initialData.fullname || "",
        email: initialData.email || "",
        role: initialData.role || "Admin",
        password: "",
        status: initialData.status || "Active",
      });
    } else {
      reset({ fullname: "", email: "", role: "Admin", password: "", status: "Active" });
    }
  }, [mode, initialData, show, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    // onHide(); // tutup modal
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg" className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "add" ? (
            <div>
              <p className="fw-bolder fs-5 mb-1">Add New Account</p>
              <p className="text-muted fs-2 mb-0">
                Create new user account with role and permissions
              </p>
            </div>
          ) : (
            <div>
              <p className="fw-bolder fs-5 mb-0">Edit Account</p>
              <p className="text-muted fs-2 mb-0">
                Edit existing user account information
              </p>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          {/* Name */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                  {...register("fullname", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Fullname must be at least 3 characters" },
                  })}
                  placeholder="Fullname"
                  isInvalid={!!errors.name}
                />
                {errors.name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.name.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      styles={selectStyle(!!error)}
                      options={roleOptions}
                      classNamePrefix={errors.role ? "react-select-invalid" : "react-select"}
                      onChange={(val) => field.onChange(val.value)} // Simpan hanya value
                      value={roleOptions.find((c) => c.value === field.value)}
                      placeholder="Select role..."
                    />
                  )}
                />
                {errors.role && (
                  <div className="invalid-feedback d-block">{errors.role.message}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {mode === "add" ? (
            <>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      placeholder="Email"
                      isInvalid={!!errors.email}
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: mode === "add" ? "Password is required" : false,
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        placeholder={mode === "add" ? "Password" : "Leave blank to keep current password"}
                        isInvalid={!!errors.password}
                      />
                      <Button
                        variant="dark"
                        className="rounded-end"
                        onClick={() => setShowPassword((prev) => !prev)}
                        type="button"
                      >
                        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                      </Button>
                      {errors.password && (
                        <Form.Control.Feedback type="invalid">
                          {errors.password.message}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Controller
                      name="status"
                      control={control}
                      rules={{ required: "Status is required" }}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          styles={selectStyle(!!error)}
                          options={statusOptions}
                          classNamePrefix={errors.status ? "react-select-invalid" : "react-select"}
                          onChange={(val) => field.onChange(val.value)} // simpan hanya value
                          value={statusOptions.find((c) => c.value === field.value)}
                          placeholder="Select status..."
                        />
                      )}
                    />
                    {errors.status && (
                      <div className="invalid-feedback d-block">{errors.status.message}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </>
          ) : (
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", {
                      required: "Email wajib diisi",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Format email tidak valid",
                      },
                    })}
                    placeholder="Email"
                    isInvalid={!!errors.email}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: "Status is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <Select
                        {...field}
                        styles={selectStyle(!!error)}
                        options={statusOptions}
                        classNamePrefix={errors.status ? "react-select-invalid" : "react-select"}
                        onChange={(val) => field.onChange(val.value)} // simpan hanya value
                        value={statusOptions.find((c) => c.value === field.value)}
                        placeholder="Select status..."
                      />
                    )}
                  />
                  {errors.status && (
                    <div className="invalid-feedback d-block">{errors.status.message}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          )}
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

export default AccountModal;