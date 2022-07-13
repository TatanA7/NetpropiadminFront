import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import { Box } from '@mui/system';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Step1BasicInformation from './Step1BasicInformation';
import Step2PropertyImages from './Step2PropertyImages';
import Step3PropertyPrices from './Step3PropertyPrices';
import { useCreateBuildsMutation, useUpdateBuildsMutation, useGetBuildByIdQuery } from '../../api';

const steps = ['Información básica', 'Imágenes de la propiedad', 'Precio'];

function PropertyForm() {
  const { id } = useParams();
  const [property, setProperty] = useState();
  const [performBuild, buildingResult] = useCreateBuildsMutation();
  const [performUpdateBuild, buildingUpdateResult] = useUpdateBuildsMutation();

  const [currentTab, setCurrentTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const buildResult = useGetBuildByIdQuery({
    id: Number(id)
  }, {
    skip: !id
  })

  useEffect(() => {
    if (buildResult.data) {
      setProperty(buildResult.data.BuildsById);
    }
  }, [buildResult.data])

  useEffect(() => {
    if (buildingResult.isUninitialized) return;
    if (buildingResult.status === 'pending') return;

    if (buildingResult.isSuccess) {

      setProperty(buildingResult.data.createBuilds);
      handleComplete()
      return;
    }

    if (buildingResult.isError) {
      // Reemplazar por un componente de notificacion
      // eslint-disable-next-line no-alert
      alert('Register Build failed');
    }
  }, [buildingResult]);

  useEffect(() => {
    if (buildingUpdateResult.isUninitialized) return;
    if (buildingUpdateResult.status === 'pending') return;

    if (buildingUpdateResult.isSuccess) {

      setProperty(buildingUpdateResult.data.updateBuilds);
      handleComplete()
      return;
    }

    if (buildingUpdateResult.isError) {
      // Reemplazar por un componente de notificacion
      // eslint-disable-next-line no-alert
      alert('Update Build failed');
    }
  }, [buildingUpdateResult]);

  const handleSubmitStep1 = async (data) => {
    if (!property?.id) {
      performBuild({
        variables: data
      });
    } else {
      performUpdateBuild({
        fields: data,
        updateBuildsId: property.id,
      });
    }
  }

  const handleUpdateStepProperty = (data) => {
    performUpdateBuild({
      fields: data,
      updateBuildsId: property.id,
    });
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const validateStepsCompleted = () => {
    let newCompleted = completed;

    if (property?.status === 'completed') {
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      return
    }

    switch (activeStep) {
      case 0:
        if (property?.status === 'draft') {
          newCompleted[activeStep] = true;
        }
        break;
      case 1:
        if (property && property.imgName && property.imgDescription) {
          newCompleted[activeStep] = true;
        }
        break;
      default:
        break;
    }
    
    setCompleted(newCompleted);
  }

  const handleNext = () => {
    validateStepsCompleted()
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const steppersPanelMap = {
    0: <Step1BasicInformation property={property} onSubmit={handleSubmitStep1} />,
    1: <Step2PropertyImages property={property} onSubmit={handleUpdateStepProperty} />,
    2: <Step3PropertyPrices property={property} onSubmit={handleUpdateStepProperty} />,
  };

  return (
    <div
      style={{ backgroundColor: '#FFFFFF' }}
      className="flex flex-col    items-center p-24 sm:p-40 rounded-2xl container"
    >
      <div
        style={{ backgroundColor: '#f1f5f9' }}
        className="flex flex-col items-center   p-24 sm:p-40 rounded-2xl container"
      >
        <div className="flex flex-col w-full max-w-4xl">
          <Box className="w-full">
            <Stepper nonLinear alternativeLabel activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" /* onClick={handleStep(index)} */>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            <div>
              {allStepsCompleted() ? (
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Todos los pasos han sido completados
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      className="text-blue-900"
                      component={Link}
                      to="/properties"
                      variant="outlined"
                    >
                      Volver a propiedades
                    </Button>
                    <Button onClick={handleReset}>Reiniciar</Button>
                  </Box>
                </>
              ) : (
                <>
                  {steppersPanelMap[activeStep]}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Anterior
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                      disabled={!property?.status}
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                    >
                      Siguiente
                    </Button>
                    {/* {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                      ))} */}
                  </Box>
                </>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default PropertyForm;
