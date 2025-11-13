import { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { LuStar } from 'react-icons/lu';
import { useForm, Controller } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { selectStyle } from '@/app/utilities/select';
import Select from 'react-select';

const mockProjectReferences = [
  { value: 1, label: 'P001 - Change Management Workshop' },
  { value: 2, label: 'P002 - Digital Innovation Summit' },
  { value: 3, label: 'P003 - Leadership Training' },
];

const calculateOverall = (content, collaboration, presentation) => {
  const c = Number(content) || 0;
  const l = Number(collaboration) || 0;
  const p = Number(presentation) || 0;

  if (c + l + p === 0) return 0.0;

  const overall = (c + l + p) / 3;
  return parseFloat(overall.toFixed(1));
};

const RatingModal = ({ show, onHide, onSubmit, existingProjectIds = [] }) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors } // Ambil errors untuk menampilkan pesan validasi
  } = useForm({
    defaultValues: {
      // Menggunakan project pertama sebagai default
      project_reference: mockProjectReferences[0].value,
      project_name: mockProjectReferences[0].label,
      content_quality: 0.0,
      collaboration: 0.0,
      presentation_skills: 0.0,
      overall_rating: 0.0,
    },
  });

  // Watch slider values
  const contentQuality = watch('content_quality');
  const collaboration = watch('collaboration');
  const presentationSkills = watch('presentation_skills');
  const overallRating = calculateOverall(contentQuality, collaboration, presentationSkills);

  useEffect(() => {
    setValue('overall_rating', overallRating);
  }, [overallRating, setValue]);

  const handleFormSubmit = (data) => {
    // console.log("Data submitted:", data); 
    const submittedData = {
      ...data,
      project_name: mockProjectReferences.find(pr => pr.value === Number(data.project_reference))?.label || '',
      date: new Date().toISOString().split('T')[0],
      content_quality: Number(data.content_quality),
      collaboration: Number(data.collaboration),
      presentation_skills: Number(data.presentation_skills),
      overall_rating: overallRating,
    };
    onSubmit(submittedData);
    onHide();
    reset();
  };

  useEffect(() => {
    if (!show) {
      reset({
        project_reference: mockProjectReferences[0].value,
        content_quality: 0.0,
        collaboration: 0.0,
        presentation_skills: 0.0,
        overall_rating: 0.0,
      });
    }
  }, [show, reset]);

  // Definisi Style untuk Slider (dipakai berulang)
  const sliderStyles = {
    trackStyle: {
      backgroundColor: '#6f42c1',
      height: 8,
      borderRadius: 5
    },
    handleStyle: {
      borderColor: '#6f42c1',
      backgroundColor: '#6f42c1',
      height: 16,
      width: 16,
      marginTop: -4, // Menyelaraskan handle di tengah track 8px
      opacity: 1,
      boxShadow: '0 0 0 2px #ffffff' // Border putih di luar handle
    },
    railStyle: {
      backgroundColor: '#ddd',
      height: 8,
      borderRadius: 5
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      size="md"
      className="custom-modal">
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bolder fs-5 d-flex align-items-center">
            <LuStar className="me-2 text-warning" size={20} /> Add New Rating
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Project Reference</Form.Label>
            <Controller
              name="project_reference"
              control={control}
              rules={{
                required: "Proyek harus dipilih.",
                validate: value => {
                  // Karena react-select memberikan object atau value, sesuaikan validasi
                  // Misal value adalah objek option, kita cek value.value
                  const val = value?.value || value;
                  if (existingProjectIds.includes(Number(val))) {
                    return "This project already has a rating.";
                  }
                  return true;
                }
              }}
              render={({ field, fieldState, error }) => (
                <>
                  <Select
                    {...field}
                    styles={selectStyle(!!error)}
                    options={mockProjectReferences}
                    getOptionLabel={e => e.label}
                    getOptionValue={e => e.value}
                    value={mockProjectReferences.find(opt => opt.value === field.value) || null}
                    onChange={(selectedOption) => field.onChange(selectedOption?.value || null)}
                  />
                  {fieldState.error && (
                    <p className="text-danger mt-1 mb-0 small">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </Form.Group>

          {/* Content Quality Slider */}
          <Controller
            name="content_quality"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Group className="mb-4">
                <Form.Label className="d-flex justify-content-between align-items-center">
                  <div>Content Quality</div>
                  <span className="fw-bold">({field.value.toFixed(1)}/5)</span>
                </Form.Label>
                <Slider
                  min={0}
                  max={5}
                  step={0.1}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  {...sliderStyles}
                />
              </Form.Group>
            )}
          />

          {/* Collaboration Slider */}
          <Controller
            name="collaboration"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Group className="mb-4">
                <Form.Label className="d-flex justify-content-between align-items-center">
                  <div>Collaboration</div>
                  <span className="fw-bold">({field.value.toFixed(1)}/5)</span>
                </Form.Label>
                <Slider
                  min={0}
                  max={5}
                  step={0.1}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  {...sliderStyles}
                />
              </Form.Group>
            )}
          />

          {/* Presentation Skills Slider */}
          <Controller
            name="presentation_skills"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Group className="mb-4">
                <Form.Label className="d-flex justify-content-between align-items-center">
                  <div>Presentation Skills</div>
                  <span className="fw-bold">({field.value.toFixed(1)}/5)</span>
                </Form.Label>
                <Slider
                  min={0}
                  max={5}
                  step={0.1}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  {...sliderStyles}
                />
              </Form.Group>
            )}
          />

          <div className="bg-light p-3 rounded-3 mt-4 text-center border">
            <p className="mb-1 text-muted">Overall Rating</p>
            <p className="display-4 fw-bold text-dark mb-0">
              {overallRating.toFixed(1)}<span className="fs-5 text-muted">/5</span>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Rating
          </Button>
        </Modal.Footer>
      </Form>
    </Modal >
  );
};

export default RatingModal;