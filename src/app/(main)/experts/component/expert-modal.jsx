'use client';
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import {
  LuUser,
  LuMapPin,
  LuClipboardList,
  LuGraduationCap,
  LuAward,
  LuFileText,
  LuEuro,
  LuPlus,
  LuX,
  LuInfo,
  LuTrendingUp,
  LuUpload,
  LuCalendar1,
  LuTrash2,
} from 'react-icons/lu';
import RatingModal from "./rating-modal";
import SimpleBar from "simplebar-react";
import { MdArrowRight, MdStar } from "react-icons/md";
import { IoArrowForwardOutline } from "react-icons/io5";

// --- Ratings Logic & Mock Data ---
const calculateAverages = (ratings) => {
  if (ratings.length === 0) {
    return { content: 0.0, collaboration: 0.0, presentation: 0.0, overall: 0.0, count: 0 };
  }

  const total = ratings.reduce(
    (acc, rating) => {
      acc.content += Number(rating.content_quality);
      acc.collaboration += Number(rating.collaboration);
      acc.presentation += Number(rating.presentation_skills);
      acc.overall += Number(rating.overall_rating);
      return acc;
    },
    { content: 0, collaboration: 0, presentation: 0, overall: 0 }
  );

  const count = ratings.length;
  const avg = (totalValue) => parseFloat((totalValue / count).toFixed(1));

  return {
    content: avg(total.content),
    collaboration: avg(total.collaboration),
    presentation: avg(total.presentation),
    overall: avg(total.overall),
    count: count
  };
};

// --- Utility and Options (DIPINDAHKAN DARI KODE ANDA) ---
// Basic Information
const employmentStatusOptions = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Freelancer', label: 'Freelancer' },
  { value: 'Contract', label: 'Contract' },
];
// ... (lanjutan options Anda)

const expertStatusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'On Hold', label: 'On Hold' },
];

const eisFormStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Submitted', label: 'Submitted' },
  { value: 'Approved', label: 'Approved' },
];

const documentStatusOptions = [
  { value: 'Not submitted', label: 'Not submitted' },
  { value: 'Submitted', label: 'Submitted' },
  { value: 'Approved', label: 'Approved' },
];

// Expertise & Skills
const expertiseAreasOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'HR', label: 'Human Resources' },
];

const industriesOptions = [
  { value: 'Banking', label: 'Banking' },
  { value: 'E-Commerce', label: 'E-Commerce' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Consulting', label: 'Consulting' },
];

// Additional Information
const socialEnergyOptions = [
  { value: 'Extrovert', label: 'Extrovert' },
  { value: 'Introvert', label: 'Introvert' },
  { value: 'Ambivert', label: 'Ambivert' },
];

// Fee Structure
const currencyOptions = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'IDR', label: 'IDR - Indonesian Rupiah' },
];

const preferredRateTypeOptions = [
  { value: 'Hourly', label: 'Hourly Rate' },
  { value: 'Daily', label: 'Daily Rate' },
  { value: 'Project', label: 'Project Rate' },
];

// Default values for the form (Disesuaikan dengan gambar)
const defaultExpertValues = {
  profile_photo_url: 'https://example.com/photo.jpg',
  full_name: '',
  location: '',
  employment_status: employmentStatusOptions[0].value,
  expert_status: expertStatusOptions[0].value,
  eis_form_status: eisFormStatusOptions[0].value,
  nda_status: documentStatusOptions[0].value,
  bio_status: documentStatusOptions[0].value,
  cv_status: documentStatusOptions[0].value,
  expertise_areas: expertiseAreasOptions[0].value,
  industries: industriesOptions[0].value,
  notes_bio: '',
  social_energy: socialEnergyOptions[0].value,
  nda_file_path: '',
  currency: currencyOptions.find(opt => opt.value === 'EUR')?.value || currencyOptions[0].value,
  preferred_rate_type: preferredRateTypeOptions[0].value,
  hourly_rate: 0.17,
  daily_rate: 0.00,
  project_rate: 0.00,
  topics: [],
  needs: [],
  facilitation_archetypes: [],
};

// Utility function to format rate for display
const formatRate = (rate, currency) => {
  if (rate === 0 || rate === null || rate === undefined || isNaN(rate)) {
    return { display: 'Not set', className: 'text-danger' };
  }
  const formattedRate = Number(rate).toFixed(2);
  const currencySymbol = currency === 'EUR' ? '€' : currency;
  return { display: `${currency.toUpperCase()} ${formattedRate}`, className: 'text-dark fw-bold' };
};
// --- End Utility and Options ---


// --- Main Modal Component ---
const ExpertModal = ({ show, onHide, mode = "add", initialData = {}, onSubmit }) => {
  const [topics, setTopics] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [facilitationArchetypes, setFacilitationArchetypes] = useState([]);

  // --- NEW STATE & HANDLERS FOR RATINGS ---
  const [ratings, setRatings] = useState([]);
  const [showAddRatingModal, setShowAddRatingModal] = useState(false);
  const existingProjectIds = ratings.map(r => r.project_reference);

  // Calculate Averages dynamically whenever ratings state changes
  const averages = useMemo(() => calculateAverages(ratings), [ratings]);

  // Handler to add a new rating from the child modal
  const handleAddRating = useCallback((newRating) => {
    // Add new rating to the list (prepend to show latest first)
    setRatings(prevRatings => [newRating, ...prevRatings]);
  }, []);

  const handleDeleteRating = useCallback((ratingId) => {
    setRatings(prevRatings => prevRatings.filter(r => r.project_reference !== ratingId));
  }, []);

  const RatingHistoryItem = ({ rating, onDelete }) => {
    const projectRef = rating.project_reference;
    const projectName = rating.project_name;
    const content = rating.content_quality.toFixed(1);
    const col = rating.collaboration.toFixed(1);
    const pres = rating.presentation_skills.toFixed(1);
    const overall = rating.overall_rating.toFixed(1);

    const dateObj = new Date(rating.date);
    const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateObj.getDate()).padStart(2, "0")}`;

    return (
      <div className="border-bottom py-2 d-flex flex-column gap-1">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="fw-bold text-dark mb-1">{projectName}</p>
            <p className="fw-bold text-dark fs-2 mb-1">{formattedDate}</p>
            <div className="d-inline-flex align-items-center fw-bold fs-5">
              <span className="me-2">C: {content}</span>
              <span className="me-2">Col: {col}</span>
              <span className="me-2">P: {pres}</span>

              <span
                className="me-2 d-inline-flex align-items-center" // <-- TAMBAH CLASS INI
                style={{ color: "#6f42c1" }}
              >
                <IoArrowForwardOutline className="me-1" />
                {overall}
                <MdStar size={18} className="ms-1 text-warning" />
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* <p className="fw-bolder fs-5 mb-0 text-dark-emphasis" style={{ color: "#6f42c1" }}>
              <MdStar size={18} className="me-1 text-warning" />
              {overall}
            </p> */}
            {onDelete && (
              <button
                className="btn btn-sm btn-danger p-1"
                onClick={() => onDelete(projectRef)}
                title="Delete rating"
              >
                <LuTrash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- END NEW STATE & HANDLERS FOR RATINGS ---

  const topicInputRef = useRef(null);
  const needInputRef = useRef(null);
  const archetypeInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultExpertValues,
  });

  // Watch necessary fields for the Rate Summary
  const watchedCurrency = watch("currency");
  const watchedHourlyRate = watch("hourly_rate");
  const watchedDailyRate = watch("daily_rate");
  const watchedProjectRate = watch("project_rate");


  // Effect to load initial data or reset
  useEffect(() => {
    if (show) {
      if (mode === "edit" && initialData && Object.keys(initialData).length > 0) {
        reset({ ...defaultExpertValues, ...initialData });
        setTopics(initialData.topics || []);
        setNeeds(initialData.needs || []);
        setFacilitationArchetypes(initialData.facilitation_archetypes || []);
        // Load ratings from initialData if available
        setRatings(initialData.ratings || []);
      } else {
        const defaultWithImageRates = {
          ...defaultExpertValues,
          currency: 'EUR',
          hourly_rate: 0.17
        };
        reset(defaultWithImageRates);
        setTopics([]);
        setNeeds([]);
        setFacilitationArchetypes([]);
        // Reset ratings to an empty array for new expert
        setRatings([]);
      }
    }
  }, [mode, initialData, show, reset]);

  // Handlers for tags (unchanged)
  const handleAddTopic = (e) => {
    e.preventDefault();
    const input = topicInputRef.current;
    const newTopic = input.value.trim();

    if (newTopic && !topics.includes(newTopic) && topics.length < 5) {
      setTopics([...topics, newTopic]);
      input.value = '';
    }
    input.focus();
  };
  const handleRemoveTopic = (topicToRemove) => {
    setTopics(topics.filter((topic) => topic !== topicToRemove));
  };
  const handleAddNeed = (e) => {
    e.preventDefault();
    const input = needInputRef.current;
    const newNeed = input.value.trim();

    if (newNeed && !needs.includes(newNeed)) {
      setNeeds([...needs, newNeed]);
      input.value = '';
    }
    input.focus();
  };
  const handleRemoveNeed = (needToRemove) => {
    setNeeds(needs.filter((need) => need !== needToRemove));
  };
  const handleAddArchetype = (e) => {
    e.preventDefault();
    const input = archetypeInputRef.current;
    const newArchetype = input.value.trim();

    if (newArchetype && !facilitationArchetypes.includes(newArchetype) && facilitationArchetypes.length < 5) {
      setFacilitationArchetypes([...facilitationArchetypes, newArchetype]);
      input.value = '';
    }
    input.focus();
  };
  const handleRemoveArchetype = (archetypeToRemove) => {
    setFacilitationArchetypes(facilitationArchetypes.filter((archetype) => archetype !== archetypeToRemove));
  };
  // End Handlers for tags


  const handleFormSubmit = (data) => {
    const finalData = {
      ...data,
      topics: topics,
      needs: needs,
      facilitation_archetypes: facilitationArchetypes,
      ratings: ratings, // INCLUDE RATINGS DATA
    };
    delete finalData.facilitation_archetype;

    onSubmit(finalData);
  };

  // Get formatted rate objects for display
  const hourlyRateDisplay = formatRate(watchedHourlyRate, watchedCurrency);
  const dailyRateDisplay = formatRate(watchedDailyRate, watchedCurrency);
  const projectRateDisplay = formatRate(watchedProjectRate, watchedCurrency);


  return (
    <>
      {/* 1. Add Rating Modal (Child) */}
      <RatingModal
        show={showAddRatingModal}
        onHide={() => setShowAddRatingModal(false)}
        onSubmit={handleAddRating}
        existingProjectIds={existingProjectIds}
      />

      {/* 2. Expert Modal (Parent) */}
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
                <p className="fw-bolder fs-5 mb-1">Add New Expert</p>
                <p className="text-muted fs-2 mb-0">
                  Create a new expert with personal information, expertise, and ratings.
                </p>
              </div>
            ) : (
              <div>
                <p className="fw-bolder fs-5 mb-1">Edit Expert</p>
                <p className="text-muted fs-2 mb-0">
                  Modify existing expert personal information, expertise, and ratings.
                </p>
              </div>
            )}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <SimpleBar className="modal-body" style={{ maxHeight: '70vh' }}>
            <div className="d-flex flex-column gap-4">
              {/* 1. Basic Information */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                  <LuUser className="me-2" size={20} /> Basic Information
                </h5>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Profile Photo URL</Form.Label>
                      <Form.Control
                        {...register("profile_photo_url", {
                          pattern: {
                            value: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i,
                            message: "Invalid URL format or file type (.jpg, .png, .gif)",
                          },
                        })}
                        placeholder="https://example.com/photo.jpg"
                        isInvalid={!!errors.profile_photo_url}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.profile_photo_url?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        {...register("full_name", { required: "Full Name is required" })}
                        placeholder="Enter expert's full name"
                        isInvalid={!!errors.full_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.full_name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text><LuMapPin size={16} /></InputGroup.Text>
                        <Form.Control
                          {...register("location")}
                          placeholder="Enter location"
                          isInvalid={!!errors.location}
                        />
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        {errors.location?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Employment Status</Form.Label>
                      <Form.Control
                        as="select"
                        {...register("employment_status", { required: "Status is required" })}
                        isInvalid={!!errors.employment_status}
                      >
                        {employmentStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expert Status</Form.Label>
                      <Form.Control
                        as="select"
                        {...register("expert_status", { required: "Expert Status is required" })}
                        isInvalid={!!errors.expert_status}
                      >
                        {expertStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>EIS Form Status</Form.Label>
                      <Form.Control
                        as="select"
                        {...register("eis_form_status", { required: "EIS Status is required" })}
                        isInvalid={!!errors.eis_form_status}
                      >
                        {eisFormStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* 2. Document Status */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                  <LuFileText className="me-2" size={20} /> Document Status
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">NDA Status</Form.Label>
                      <Form.Control as="select" {...register("nda_status")}>
                        {documentStatusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Bio Status</Form.Label>
                      <Form.Control as="select" {...register("bio_status")}>
                        {documentStatusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">CV Status</Form.Label>
                      <Form.Control as="select" {...register("cv_status")}>
                        {documentStatusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">NDA File</Form.Label>
                      <InputGroup>
                        <Form.Control
                          {...register("nda_file_path")}
                          placeholder="File path or URL"
                        />
                        <Button variant="outline-secondary" type="button"><LuUpload size={16} /></Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* 3. Expertise & Skills */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                  <LuGraduationCap className="me-2" size={20} /> Expertise & Skills
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expertise Areas</Form.Label>
                      <Form.Control as="select" {...register("expertise_areas")}>
                        {expertiseAreasOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Industries</Form.Label>
                      <Form.Control as="select" {...register("industries")}>
                        {industriesOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                {/* Topics (Tag Input) */}
                <Form.Group className="mb-3">
                  <Form.Label>Topics (max 5)</Form.Label>
                  <InputGroup>
                    <Form.Control
                      ref={topicInputRef}
                      placeholder="Add topic"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddTopic(e);
                      }}
                    />
                    <Button variant="secondary" onClick={handleAddTopic} type="button">
                      <LuPlus size={16} /> Add
                    </Button>
                  </InputGroup>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {topics.map((topic) => (
                      <span key={topic} className="badge bg-info text-dark d-flex align-items-center p-2 rounded-pill">
                        {topic}
                        <Button
                          variant="light"
                          onClick={() => handleRemoveTopic(topic)}
                          className="p-0 ms-1 text-dark d-flex align-items-center justify-content-center rounded-circle"
                          style={{ width: '18px', height: '18px' }}
                        >
                          <LuX size={12} className="m-0" />
                        </Button>
                      </span>
                    ))}
                  </div>
                </Form.Group>
              </div>

              {/* 4. Additional Information */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                  <LuInfo className="me-2" size={20} /> Additional Information
                </h5>
                <Form.Group className="mb-3">
                  <Form.Label>Notes / Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    {...register("notes_bio")}
                    placeholder="Write down any additional notes or bio..."
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Social Energy</Form.Label>
                      <Form.Control as="select" {...register("social_energy")}>
                        {socialEnergyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Facilitation Archetypes (max 5)</Form.Label>
                      <InputGroup>
                        <Form.Control
                          ref={archetypeInputRef}
                          placeholder="Add archetype"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddArchetype(e);
                          }}
                        />
                        <Button variant="secondary" onClick={handleAddArchetype} type="button">
                          <LuPlus size={16} /> Add
                        </Button>
                      </InputGroup>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {facilitationArchetypes.map((archetype) => (
                          <span key={archetype} className="badge bg-secondary d-flex align-items-center p-2 rounded-pill">
                            {archetype}
                            <Button
                              variant="light"
                              onClick={() => handleRemoveArchetype(archetype)}
                              className="p-0 ms-1 text-dark d-flex align-items-center justify-content-center rounded-circle"
                              style={{ width: '18px', height: '18px' }}
                            >
                              <LuX size={12} className="m-0" />
                            </Button>
                          </span>
                        ))}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* 5. Needs (Tag Input) */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                  <LuClipboardList className="me-2" size={20} /> Needs
                </h5>
                <Form.Group className="mb-3">
                  <Form.Label>Needs</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      ref={needInputRef}
                      placeholder="Add need"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddNeed(e);
                      }}
                    />
                    <Button variant="secondary" onClick={handleAddNeed} type="button">
                      <LuPlus size={16} /> Add
                    </Button>
                  </InputGroup>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {needs.map((need) => (
                      <span key={need} className="badge bg-warning text-dark d-flex align-items-center p-2 rounded-pill">
                        {need}
                        <Button
                          variant="light"
                          onClick={() => handleRemoveNeed(need)}
                          className="p-0 ms-1 text-dark d-flex align-items-center justify-content-center rounded-circle"
                          style={{ width: '18px', height: '18px' }}
                        >
                          <LuX size={12} className="m-0" />
                        </Button>
                      </span>
                    ))}
                  </div>
                </Form.Group>
              </div>


              {/* 6. Ratings & Performance (DYNAMIC DISPLAY) */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <h5 className="d-flex align-items-center text-primary fw-bold fs-4 mb-0">
                    <LuAward className="me-2" size={20} /> Ratings & Performance
                  </h5>
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowAddRatingModal(true)} // Tampilkan modal AddRating
                  >
                    <LuPlus size={18} /> Add Rating
                  </Button>
                </div>
                <div className="card border rounded-3 bg-light-purple p-4 mb-3">
                  <div className="d-flex justify-content-around">
                    <div className="text-center">
                      <p className="display-6 fw-bolder text-purple mb-1">{averages.content.toFixed(1)}</p>
                      <p className="text-dark mb-0">Content</p>
                    </div>
                    <div className="text-center">
                      <p className="display-6 fw-bolder text-purple mb-1">{averages.collaboration.toFixed(1)}</p>
                      <p className="text-dark mb-0">Collaboration</p>
                    </div>
                    <div className="text-center">
                      <p className="display-6 fw-bolder text-purple mb-1">{averages.presentation.toFixed(1)}</p>
                      <p className="text-dark mb-0">Presentation</p>
                    </div>
                    <div className="text-center">
                      <p className="display-6 fw-bolder text-purple mb-1">{averages.overall.toFixed(1)}</p>
                      <p className="text-dark mb-0">Overall ({averages.count} ratings)</p>
                    </div>
                  </div>
                </div>

                {/* Rating History Section */}
                {ratings.length > 0 ? (
                  <div className="p-3 border rounded-3 bg-white" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <h6 className="fw-bold border-bottom pb-2 mb-2 text-dark d-flex align-items-center">
                      <LuCalendar1 className="me-2" />
                      Rating History {ratings.length > 0 && `(${ratings.length} ratings)`}
                    </h6>

                    {ratings.map((rating, index) => (
                      <RatingHistoryItem key={index} rating={rating} onDelete={handleDeleteRating} />
                    ))}
                  </div>
                ) : (
                  <div className="p-3 border rounded-3 text-center text-muted">
                    <LuTrendingUp size={24} className="mb-2" />
                    <p className="mb-0">No ratings yet. Add a rating to track performance.</p>
                  </div>
                )}
              </div>

              {/* 7. Fee Structure (Kode Anda sebelumnya) */}
              <div className="p-4 rounded-3 border bg-light-subtle shadow-sm">
                <h5 className="d-flex align-items-center mb-3 text-primary fw-bold fs-4">
                  <LuEuro className="me-2" size={20} /> Fee Structure
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Currency</Form.Label>
                      <Form.Control as="select" {...register("currency")}>
                        {currencyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Preferred Rate Type</Form.Label>
                      <Form.Control as="select" {...register("preferred_rate_type")}>
                        {preferredRateTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hourly Rate</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        {...register("hourly_rate", { valueAsNumber: true })}
                        placeholder="0.00"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Daily Rate</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        {...register("daily_rate", { valueAsNumber: true })}
                        placeholder="0.00"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Project Rate</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        {...register("project_rate", { valueAsNumber: true })}
                        placeholder="0.00"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-3 p-3 border rounded-3 bg-white text-center">
                  <p className="fw-bold mb-3">Rate Summary:</p>
                  <div className="d-flex justify-content-around">

                    {/* HOURLY RATE */}
                    <div className="text-center">
                      <span className={hourlyRateDisplay.className}>
                        {hourlyRateDisplay.display}
                      </span>
                      <p className="text-muted mb-0">Per Hour</p>
                    </div>

                    {/* DAILY RATE */}
                    <div className="text-center">
                      <span className={dailyRateDisplay.className}>
                        {dailyRateDisplay.display}
                      </span>
                      <p className="text-muted mb-0">Per Day</p>
                    </div>

                    {/* PROJECT RATE */}
                    <div className="text-center">
                      <span className={projectRateDisplay.className}>
                        {projectRateDisplay.display}
                      </span>
                      <p className="text-muted mb-0">Per Project</p>
                    </div>

                  </div>
                </div>
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
    </>
  );
};

export default ExpertModal;